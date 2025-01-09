// app/api/properties/route.ts
import { NextResponse } from 'next/server'
import { PropertySearchParams } from '@/types/property'

interface Property {
  id: string
  title: string
  price: number
  location: string
  specs: {
    beds: number
    baths: number
    area: number
  }
  images: string[]
  status: 'available' | 'sold' | 'pending'
}

// Mock data with the new structure
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 500000,
    location: 'New York',
    specs: {
      beds: 2,
      baths: 2,
      area: 1200
    },
    images: ['/images/apartment1.jpg', '/images/apartment1-2.jpg'],
    status: 'available'
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    price: 750000,
    location: 'Los Angeles',
    specs: {
      beds: 4,
      baths: 3,
      area: 2500
    },
    images: ['/images/house1.jpg', '/images/house1-2.jpg'],
    status: 'pending'
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract filter parameters
    const filters: PropertySearchParams = {
      location: searchParams.get('location'),
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      beds: searchParams.get('beds') ? Number(searchParams.get('beds')) : undefined,
      baths: searchParams.get('baths') ? Number(searchParams.get('baths')) : undefined,
      status: searchParams.get('status') as Property['status'] || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 10,
    }

    // Filter properties based on search parameters
    const filteredProperties = mockProperties.filter(property => {
      const locationMatch = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      const minPriceMatch = !filters.minPrice || property.price >= filters.minPrice
      const maxPriceMatch = !filters.maxPrice || property.price <= filters.maxPrice
      const bedsMatch = !filters.beds || property.specs.beds === filters.beds
      const bathsMatch = !filters.baths || property.specs.baths === filters.baths
      const statusMatch = !filters.status || property.status === filters.status

      return locationMatch && minPriceMatch && maxPriceMatch && 
             bedsMatch && bathsMatch && statusMatch
    })

    // Calculate pagination
    const total = filteredProperties.length
    const totalPages = Math.ceil(total / filters.limit)
    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit

    // Slice array for pagination
    const paginatedProperties = filteredProperties.slice(start, end)

    return NextResponse.json({
      properties: paginatedProperties,
      pagination: {
        total,
        totalPages,
        currentPage: filters.page,
        limit: filters.limit
      }
    })

  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields and structure
    if (!body.title || !body.price || !body.location || !body.specs) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new property
    const newProperty: Property = {
      id: `${mockProperties.length + 1}`,
      title: body.title,
      price: body.price,
      location: body.location,
      specs: {
        beds: body.specs.beds,
        baths: body.specs.baths,
        area: body.specs.area
      },
      images: body.images || [],
      status: body.status || 'available'
    }

    // Add to mock database
    mockProperties.push(newProperty)

    return NextResponse.json(newProperty)
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

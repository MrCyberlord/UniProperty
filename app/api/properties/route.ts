import { NextResponse } from 'next/server'
import { Property, PropertySearchParams } from '@/types/property'

// Mock data
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 500000,
    location: 'Mumbai',
    specs: {
      beds: 2,
      baths: 2,
      area: 1200
    },
    images: ['/images/apartment1.jpg'],
    status: 'available'
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    price: 750000,
    location: 'Mumbai',
    specs: {
      beds: 4,
      baths: 3,
      area: 2500
    },
    images: ['/images/apartment2.jpg'],
    status: 'pending'
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    price: 300000,
    location: 'Delhi',
    specs: {
      beds: 3,
      baths: 2,
      area: 1800
    },
    images: ['/images/apartment2.jpg'],
    status: 'sold'
  },
  {
    id: '4',
    title: 'Luxury Beachfront Villa',
    price: 1200000,
    location: 'Delhi',
    specs: {
      beds: 5,
      baths: 4,
      area: 4000
    },
    images: ['/images/apartment4.jpg'],
    status: 'available'
  },
  {
    id: '5',
    title: 'Urban Studio Apartment',
    price: 200000,
    location: 'Chennai',
    specs: {
      beds: 1,
      baths: 1,
      area: 600
    },
    images: ['/images/apartment5.jpg'],
    status: 'pending'
  },
  {
    id: '6',
    title: 'Rustic Country House',
    price: 450000,
    location: 'Chennai',
    specs: {
      beds: 3,
      baths: 2,
      area: 2200
    },
    images: ['/images/apartment6.jpg'],
    status: 'available'
  },
  {
    id: '7',
    title: 'Modern Penthouse Suite',
    price: 1500000,
    location: 'Banglore',
    specs: {
      beds: 4,
      baths: 4,
      area: 3500
    },
    images: ['/images/apartment7.jpg'],
    status: 'sold'
  },
  {
    id: '8',
    title: 'Charming Historic Cottage',
    price: 275000,
    location: 'Banglore',
    specs: {
      beds: 2,
      baths: 1,
      area: 1200
    },
    images: ['/images/apartment8.jpg'],
    status: 'available'
  },
  {
    id: '9',
    title: 'Spacious Suburban Ranch',
    price: 600000,
    location: 'Pune',
    specs: {
      beds: 4,
      baths: 3,
      area: 2800
    },
    images: ['/images/apartment9.jpg'],
    status: 'pending'
  },
  {
    id: '10',
    title: 'Coastal Townhouse',
    price: 850000,
    location: 'Pune',
    specs: {
      beds: 3,
      baths: 3,
      area: 2000
    },
    images: ['/images/apartment9.jpg'],
    status: 'sold'
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

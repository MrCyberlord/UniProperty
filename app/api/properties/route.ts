import { NextRequest, NextResponse } from 'next/server'
import { Property, PropertySearchParams } from '@/types/property'
import { mockProperties } from '@/types/mockData'


export async function GET(request: NextRequest) {
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

    return new Response(
      JSON.stringify({
        properties: paginatedProperties,
        pagination: {
          total,
          totalPages,
          currentPage: filters.page,
          limit: filters.limit
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ Error: error }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
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

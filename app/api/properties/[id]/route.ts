import { NextResponse } from 'next/server'
import { mockProperties } from '../route'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = mockProperties.find(p => p.id === params.id)
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
} 
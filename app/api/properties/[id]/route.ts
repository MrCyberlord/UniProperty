import { NextRequest } from 'next/server'
import { mockProperties } from '@/types/mockData'
import { Property } from '@/types/property'


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const property = mockProperties.find((p: Property) => p.id === id)

    if (!property) {
      return new Response(
        JSON.stringify({ error: 'Property not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify(property), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error fetching property:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch property' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

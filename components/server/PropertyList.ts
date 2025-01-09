import { Property } from '@/types/property'

export async function getPropertyList(searchParams: URLSearchParams): Promise<Property[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/properties?${searchParams}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch properties')
    const data = await response.json()
    return data.properties
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

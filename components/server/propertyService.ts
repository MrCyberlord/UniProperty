import { Property } from '@/types/property'

interface PropertyResponse {
  properties: Property[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export async function getPropertyList(searchParams: URLSearchParams): Promise<PropertyResponse> {
  try {
    const queryString = searchParams.toString()
    
    const response = await fetch(`/api/properties${queryString ? `?${queryString}` : ''}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export async function searchProperties(searchParams: URLSearchParams): Promise<PropertyResponse> {
  try {
    const response = await fetch(`http://localhost:3000/api/properties?${searchParams}`)
    if (!response.ok) throw new Error('Failed to fetch properties')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Search error:', error)
    throw error
  }
} 
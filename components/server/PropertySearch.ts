// Server-side property search logic
import { PropertySearchParams } from '@/types/property'

export async function searchProperties(params: PropertySearchParams) {
  try {
    const queryString = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryString.append(key, String(value))
    })

    const response = await fetch(`https://uni-property.vercel.app/api/properties?${queryString}`)
    if (!response.ok) throw new Error('Failed to fetch properties')
    
    return response.json()
  } catch (error) {
    console.error('Search error:', error)
    throw error
  }
}

export interface Property {
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

export interface PropertySearchParams {
  location?: string | null
  minPrice?: number
  maxPrice?: number
  beds?: number
  baths?: number
  status?: Property['status']
  page: number
  limit: number
}

export type RouteContext = {
  params: {
    id: string
  }
} 
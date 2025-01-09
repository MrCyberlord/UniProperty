export interface PropertySearchParams {
  location?: string | null
  minPrice?: number
  maxPrice?: number
  beds?: number
  baths?: number
  status?: 'available' | 'sold' | 'pending'
  page: number
  limit: number
} 
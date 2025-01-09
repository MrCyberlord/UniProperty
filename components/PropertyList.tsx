'use client'

import { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import { useSearchParams } from 'next/navigation'

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

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const queryString = searchParams.toString()
        const response = await fetch(`/api/properties${queryString ? `?${queryString}` : ''}`)
        if (!response.ok) throw new Error('Failed to fetch properties')
        const data = await response.json()
        setProperties(data.properties)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (properties.length === 0) {
    return <div className="text-center py-8">No properties found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
} 
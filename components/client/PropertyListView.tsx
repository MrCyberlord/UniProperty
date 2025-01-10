'use client'

import { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import { Property } from '@/types/property'
import { getPropertyList } from '../server/propertyService'
import { useSearchParams } from 'next/navigation'


export default function PropertyListView() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true)
        
        // Use URLSearchParams for the API call
        const params = new URLSearchParams(searchParams.toString() || '')
        
        const response = await getPropertyList(params)
        
        if (response && Array.isArray(response.properties)) {
          setProperties(response.properties)
        } else {
          setProperties([])
        }
      } catch (err) {
        console.error('Error loading properties:', err)
        setError(err instanceof Error ? err.message : 'Failed to load properties')
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [searchParams])

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (!properties.length) {
    return <div className="text-center py-8">No properties found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-500">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

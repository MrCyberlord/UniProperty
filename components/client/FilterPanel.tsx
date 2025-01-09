'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function FilterPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    status: ''
  })

  useEffect(() => {
    setFilters({
      location: searchParams.get('location') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      beds: searchParams.get('beds') || '',
      baths: searchParams.get('baths') || '',
      status: searchParams.get('status') || ''
    })
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new URLSearchParams
    const params = new URLSearchParams()
    
    // Add non-empty values
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        if (key === 'status' && value === '') return
        params.append(key, value.trim())
      }
    })
    
    // Update URL with new params
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1 text-blue-500">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full p-2 border rounded font-bold text-gray-500"
          placeholder="Enter location"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-blue-500 mb-1">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded font-bold text-gray-500"
            placeholder="Min"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded font-bold text-gray-500"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-bold text-blue-500 mb-1">Beds</label>
          <input
            type="number"
            name="beds"
            value={filters.beds}
            onChange={handleChange}
            className="w-full p-2 border rounded font-bold text-gray-500"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-blue-500 mb-1">Baths</label>
          <input
            type="number"
            name="baths"
            value={filters.baths}
            onChange={handleChange}
            className="w-full p-2 border rounded font-bold text-gray-500"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-blue-500 mb-1">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full p-2 border rounded font-bold text-gray-500"
        >
          <option value="">Any</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  )
}

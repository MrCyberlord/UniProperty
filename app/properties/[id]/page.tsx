import { notFound } from 'next/navigation'
import { Property } from '@/types/property'
import Image from 'next/image'

async function getProperty(id: string): Promise<Property | null> {
  try {
    const response = await fetch(`https://uni-property.vercel.app/api/properties/${id}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch property')
    }
    
    const data = await response.json()
    return data as Property
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}


export default async function PropertyPage({ params }: { params: Promise<{ id: string }>}) {
  const {id} = await params;
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <Image
            src={property.images[0] || '/placeholder-property.jpg'}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`
              px-3 py-1 rounded-full text-sm font-semibold
              ${property.status === 'available' ? 'bg-green-500 text-white' : ''}
              ${property.status === 'pending' ? 'bg-yellow-500 text-white' : ''}
              ${property.status === 'sold' ? 'bg-red-500 text-white' : ''}
            `}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">{property.title}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${property.price.toLocaleString()}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600 font-bold">Bedrooms</p>
              <p className="text-xl font-bold text-gray-700">{property.specs.beds}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600 font-bold">Bathrooms</p>
              <p className="text-xl font-bold text-gray-700">{property.specs.baths}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-gray-600 font-bold">Area</p>
              <p className="text-xl font-bold text-gray-700">{property.specs.area} sq ft</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Location</h2>
            <p className="text-gray-600">{property.location}</p>
          </div>

          <div className="flex justify-between items-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Contact Agent
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
              Share
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

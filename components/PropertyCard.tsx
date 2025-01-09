import Image from 'next/image'
import Link from 'next/link'

interface PropertyCardProps {
  property: {
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
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { id, title, price, location, specs, images, status } = property

  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={images[0] || '/placeholder-property.jpg'}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`
              px-2 py-1 rounded-full text-sm font-semibold
              ${status === 'available' ? 'bg-green-500 text-white' : ''}
              ${status === 'pending' ? 'bg-yellow-500 text-white' : ''}
              ${status === 'sold' ? 'bg-red-500 text-white' : ''}
            `}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{location}</p>
          <p className="text-xl font-bold text-blue-600 mb-3">
            ${price.toLocaleString()}
          </p>
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>{specs.beds} beds</span>
            <span>{specs.baths} baths</span>
            <span>{specs.area.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 
import PropertyList from '@/components/PropertyList'
import PropertyFilters from '@/components/PropertyFilters'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Featured Properties</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <PropertyFilters />
        </aside>
        <div className="lg:col-span-3">
          <PropertyList />
        </div>
      </div>
    </main>
  )
}

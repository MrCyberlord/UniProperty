import PropertyListView from '@/components/client/PropertyListView';
import FilterPanel from '@/components/client/FilterPanel';

export default async function HomePage(
//   {
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
//   }
) {
  // const cleanParams: { [key: string]: string } = {};

  // for (const [key, value] of Object.entries(searchParams)) {
  //   if (typeof value === 'string' && value.trim() !== '') {
  //     cleanParams[key] = value.trim();
  //   }
  // }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 text-center">Featured Properties</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterPanel />
        </aside>
        <div className="lg:col-span-3">
          {/* <PropertyListView initialParams={cleanParams} /> */}
          <PropertyListView  />
        </div>
      </div>
    </main>
  );
}

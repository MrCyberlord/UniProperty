import { searchProperties } from "@/lib/actions";


export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }> ;
}) {
  console.log(await searchParams);

  const properties = await searchProperties(await searchParams);

  return (
    <div>
      <h1>Properties</h1>
      {properties.map((property) => (
        <div key={property.id}>
          <h3>{property.title}</h3>
          <p>Price: ${property.price}</p>
        </div>
      ))}
    </div>
  );
}

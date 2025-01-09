// components/client/PropertyCard.tsx
'use client';

interface PropertyCardProps {
  data: { id: string; title: string; price: number };
  onFavorite: () => Promise<void>;
}

export function PropertyCard({ data, onFavorite }: PropertyCardProps) {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>Price: ${data.price}</p>
      <button onClick={onFavorite}>Favorite</button>
    </div>
  );
}

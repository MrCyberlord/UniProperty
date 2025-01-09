// app/api/properties/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = Object.fromEntries(url.searchParams.entries());

  // Simulate filtered property data
  const properties = [
    { id: "1", title: "Luxury Apartment", price: 200000 },
    { id: "2", title: "Cozy House", price: 150000 },
  ];

  // Filter properties based on `filters` (for now, just return all properties)
  return NextResponse.json(properties);
}

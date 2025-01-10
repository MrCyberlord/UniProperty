import { Property } from "./property";

export const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: 500000,
      location: 'Mumbai',
      specs: {
        beds: 2,
        baths: 2,
        area: 1200
      },
      images: ['/images/apartment1.jpg'],
      status: 'available'
    },
    {
      id: '2',
      title: 'Suburban Family Home',
      price: 750000,
      location: 'Mumbai',
      specs: {
        beds: 4,
        baths: 3,
        area: 2500
      },
      images: ['/images/apartment2.jpg'],
      status: 'pending'
    },
    {
      id: '3',
      title: 'Cozy Mountain Cabin',
      price: 300000,
      location: 'Delhi',
      specs: {
        beds: 3,
        baths: 2,
        area: 1800
      },
      images: ['/images/apartment2.jpg'],
      status: 'sold'
    },
    {
      id: '4',
      title: 'Luxury Beachfront Villa',
      price: 1200000,
      location: 'Delhi',
      specs: {
        beds: 5,
        baths: 4,
        area: 4000
      },
      images: ['/images/apartment4.jpg'],
      status: 'available'
    },
    {
      id: '5',
      title: 'Urban Studio Apartment',
      price: 200000,
      location: 'Chennai',
      specs: {
        beds: 1,
        baths: 1,
        area: 600
      },
      images: ['/images/apartment5.jpg'],
      status: 'pending'
    },
    {
      id: '6',
      title: 'Rustic Country House',
      price: 450000,
      location: 'Chennai',
      specs: {
        beds: 3,
        baths: 2,
        area: 2200
      },
      images: ['/images/apartment6.jpg'],
      status: 'available'
    },
    {
      id: '7',
      title: 'Modern Penthouse Suite',
      price: 1500000,
      location: 'Banglore',
      specs: {
        beds: 4,
        baths: 4,
        area: 3500
      },
      images: ['/images/apartment7.jpg'],
      status: 'sold'
    },
    {
      id: '8',
      title: 'Charming Historic Cottage',
      price: 275000,
      location: 'Banglore',
      specs: {
        beds: 2,
        baths: 1,
        area: 1200
      },
      images: ['/images/apartment8.jpg'],
      status: 'available'
    },
    {
      id: '9',
      title: 'Spacious Suburban Ranch',
      price: 600000,
      location: 'Pune',
      specs: {
        beds: 4,
        baths: 3,
        area: 2800
      },
      images: ['/images/apartment9.jpg'],
      status: 'pending'
    },
    {
      id: '10',
      title: 'Coastal Townhouse',
      price: 850000,
      location: 'Pune',
      specs: {
        beds: 3,
        baths: 3,
        area: 2000
      },
      images: ['/images/apartment10.jpg'],
      status: 'sold'
    }
  ]
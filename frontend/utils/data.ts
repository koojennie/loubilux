export interface Product {
  _id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  date: string;
}

const products: Product[] = [
  {
    _id: 1,
    name: 'Coach Mollie Tote',
    price: 3190000,
    category: 'bag',
    image: '/img/featured-item1.png',
    description: 'Coach Mollie Tote Bag In Signature Canvas',
    date: '2025-06-03T08:30:00Z',
  },
  {
    _id: 2,
    name: 'Michael Kors Crossbody',
    price: 1290000,
    category: 'bag',
    image: '/img/featured-item2.png',
    description: 'ini',
    date: '2025-06-03T08:30:00Z',
  },
  {
    _id: 3,
    name: 'Lacoste Geneva 2001138',
    price: 1950000,
    category: 'wrist-watch',
    image: '/img/featured-item3.png',
    description: 'ini',
    date: '2025-06-03T08:30:00Z'
  },
  {
    _id: 4,
    name: 'Longchamp Sunglasses',
    price: 1350000,
    category: 'sunglasses',
    image: '/img/featured-item4.png',
    description: 'ini',
    date: '2025-06-03T08:30:00Z'
  },
];

export default products;
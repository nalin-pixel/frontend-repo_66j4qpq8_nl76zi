import React from 'react';
import { Star } from 'lucide-react';

const defaultProducts = [
  { id: 'p1', name: 'Visa Card – Pastel Blue', price: 15900, image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p2', name: 'Visa Card – Blush Pink', price: 15900, image: 'https://images.unsplash.com/photo-1524749292158-7540c2494485?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p3', name: 'Card Stand – Minimal', price: 15900, image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p4', name: 'Card Sleeve – Frosted', price: 15900, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
];

const currency = (n) => `Rp${n.toLocaleString('id-ID')}`;

const ProductGrid = ({ onAdd, products }) => {
  const items = products && products.length ? products : defaultProducts;
  return (
    <section id="products" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Top Products</h2>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <div key={p.id} className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-1">{p.name}</h3>
                <p className="mt-1 text-indigo-600 font-semibold">{currency(p.price)}</p>
                {onAdd && (
                  <button onClick={() => onAdd(p)} className="mt-3 w-full px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

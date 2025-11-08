import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Footer from './components/Footer';

const defaultProducts = [
  { id: 'p1', name: 'Visa Card – Pastel Blue', price: 15900, image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p2', name: 'Visa Card – Blush Pink', price: 15900, image: 'https://images.unsplash.com/photo-1524749292158-7540c2494485?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p3', name: 'Card Stand – Minimal', price: 15900, image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p4', name: 'Card Sleeve – Frosted', price: 15900, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
];

const currency = (n) => `Rp${n.toLocaleString('id-ID')}`;

function App() {
  const [route, setRoute] = useState('home');
  const [products, setProducts] = useState(defaultProducts);
  const [banners, setBanners] = useState([
    { id: 'b1', url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop' },
  ]);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const addToCart = (p) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const setQty = (id, qty) => setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
  const removeItem = (id) => setCart((prev) => prev.filter((x) => x.id !== id));

  const completeCheckout = (trx) => {
    setTransactions((prev) => [trx, ...prev]);
    setCart([]);
    setRoute('home');
    alert('Order placed! Your transaction is pending verification.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar onNavigate={setRoute} cartCount={cartCount} />

      {route === 'home' && (
        <>
          <Hero />
          <div id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {banners.length > 0 && (
              <img src={banners[0].url} alt="banner" className="w-full rounded-2xl border border-gray-200" />
            )}
          </div>
          <ProductGrid onAdd={addToCart} products={products} />
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="border border-gray-200 rounded-2xl p-4 bg-white">
                    <p className="font-medium line-clamp-1">{p.name}</p>
                    <p className="text-indigo-600 font-semibold">{currency(p.price)}</p>
                    <button onClick={() => addToCart(p)} className="mt-2 w-full px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Add</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {route === 'cart' && (
        <Cart items={cart} onQty={setQty} onRemove={removeItem} onCheckout={() => setRoute('checkout')} />
      )}

      {route === 'checkout' && (
        <Checkout items={cart} onBack={() => setRoute('cart')} onComplete={completeCheckout} />
      )}

      {route === 'admin' && (
        <Admin products={products} setProducts={setProducts} banners={banners} setBanners={setBanners} transactions={transactions} setTransactions={setTransactions} />
      )}

      <Footer />
    </div>
  );
}

export default App;

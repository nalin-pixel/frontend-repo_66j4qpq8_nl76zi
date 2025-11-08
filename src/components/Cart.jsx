import React from 'react';

const currency = (n) => `Rp${n.toLocaleString('id-ID')}`;

const Cart = ({ items = [], onQty, onRemove, onCheckout }) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart</h2>
        {items.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-600">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{currency(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onQty(item.id, Math.max(1, item.qty - 1))} className="px-2 py-1 rounded bg-gray-100">-</button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button onClick={() => onQty(item.id, item.qty + 1)} className="px-2 py-1 rounded bg-gray-100">+</button>
                </div>
                <div className="w-24 text-right font-medium">{currency(item.price * item.qty)}</div>
                <button onClick={() => onRemove(item.id)} className="text-rose-600 hover:text-rose-700 text-sm">Remove</button>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-lg font-semibold">{currency(subtotal)}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={onCheckout} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;

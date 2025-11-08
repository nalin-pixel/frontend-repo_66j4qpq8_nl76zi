import React, { useState } from 'react';

const currency = (n) => `Rp${n.toLocaleString('id-ID')}`;

const Checkout = ({ items = [], onBack, onComplete }) => {
  const [file, setFile] = useState(null);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload proof of payment');
    // Simulate upload success
    const transaction = {
      id: 'trx-' + Date.now(),
      total,
      items,
      proofName: file.name,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    onComplete(transaction);
  };

  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-900">← Back</button>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">Checkout</h2>
        <p className="text-gray-600 mb-6">Transfer to: PT PastelPay • BCA 1234567890 • Send the receipt below.</p>

        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span>{i.qty} × {i.name}</span>
                <span>{currency(i.qty * i.price)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="font-medium">Total</span>
            <span className="font-semibold">{currency(total)}</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Proof of Payment</label>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800" />
              {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>}
            </div>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Complete Order</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

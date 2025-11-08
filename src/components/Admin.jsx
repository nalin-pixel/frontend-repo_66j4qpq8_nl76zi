import React, { useMemo, useState } from 'react';
import { LogIn, LogOut, Plus, Pencil, Trash2, CheckCircle, Clock } from 'lucide-react';

const currency = (n) => `Rp${n.toLocaleString('id-ID')}`;

const Admin = ({ products, setProducts, banners, setBanners, transactions, setTransactions }) => {
  const [authed, setAuthed] = useState(false);
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [form, setForm] = useState({ id: '', name: '', price: 15900, image: '' });
  const [editing, setEditing] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');

  const login = (e) => {
    e.preventDefault();
    if (creds.email === 'admin@demo.com' && creds.password === 'admin123') {
      setAuthed(true);
    } else {
      alert('Invalid credentials. Hint: admin@demo.com / admin123');
    }
  };

  const logout = () => setAuthed(false);

  const resetForm = () => {
    setForm({ id: '', name: '', price: 15900, image: '' });
    setEditing(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.image) return alert('Please provide name and image URL');
    const newProduct = { ...form, id: 'p' + Date.now() };
    setProducts((prev) => [...prev, newProduct]);
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProducts((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    resetForm();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const pending = useMemo(() => transactions.filter((t) => t.status === 'pending').length, [transactions]);

  if (!authed) {
    return (
      <section className="py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2"><LogIn className="h-5 w-5"/> Admin Login</h2>
          <form onSubmit={login} className="border border-gray-200 rounded-2xl p-6 bg-white grid gap-4">
            <input value={creds.email} onChange={(e)=>setCreds({...creds, email: e.target.value})} type="email" placeholder="Email" className="w-full rounded-lg border-gray-300"/>
            <input value={creds.password} onChange={(e)=>setCreds({...creds, password: e.target.value})} type="password" placeholder="Password" className="w-full rounded-lg border-gray-300"/>
            <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Sign In</button>
            <p className="text-xs text-gray-500">Demo: admin@demo.com / admin123</p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"><LogOut className="h-4 w-4"/> Logout</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-semibold text-gray-900 mb-3">Product Management</h3>
            <form onSubmit={editing ? handleUpdate : handleAdd} className="grid gap-3">
              <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Product name" className="w-full rounded-lg border-gray-300"/>
              <input value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} placeholder="Image URL" className="w-full rounded-lg border-gray-300"/>
              <input value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)||0})} type="number" placeholder="Price" className="w-full rounded-lg border-gray-300"/>
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                {editing ? (<><Pencil className="h-4 w-4"/> Update</>) : (<><Plus className="h-4 w-4"/> Add</>)}
              </button>
            </form>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-medium line-clamp-1">{p.name}</p>
                    <p className="text-sm text-indigo-600 font-semibold">{currency(p.price)}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded bg-gray-100">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="px-2 py-1 rounded bg-rose-100 text-rose-700">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-semibold text-gray-900 mb-3">Banner Management</h3>
            <div className="flex gap-2">
              <input value={bannerUrl} onChange={(e)=>setBannerUrl(e.target.value)} placeholder="Banner image URL" className="flex-1 rounded-lg border-gray-300"/>
              <button onClick={()=>{ if(!bannerUrl) return; setBanners((b)=>[...b,{ id:'b'+Date.now(), url: bannerUrl }]); setBannerUrl(''); }} className="px-3 py-2 rounded-lg bg-gray-900 text-white">Add</button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {banners.map((b) => (
                <div key={b.id} className="relative group">
                  <img src={b.url} alt="banner" className="h-24 w-full object-cover rounded-lg"/>
                  <button onClick={()=>setBanners((prev)=>prev.filter(x=>x.id!==b.id))} className="absolute top-2 right-2 p-1 rounded bg-white/80"><Trash2 className="h-4 w-4"/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Transactions</h3>
              <span className="text-sm text-gray-600">Pending: {pending}</span>
            </div>
            <div className="divide-y">
              {transactions.length === 0 && (
                <p className="text-sm text-gray-600">No transactions yet.</p>
              )}
              {transactions.map((t)=> (
                <div key={t.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{t.id}</p>
                    <p className="text-sm text-gray-600">{new Date(t.createdAt).toLocaleString()}</p>
                    <p className="text-sm mt-1">{t.items.length} items • Total {currency(t.total)}</p>
                    {t.proofName && <p className="text-sm text-gray-600">Proof: {t.proofName}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${t.status==='paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {t.status==='paid' ? <CheckCircle className="h-3 w-3"/> : <Clock className="h-3 w-3"/>}
                      {t.status}
                    </span>
                    {t.status !== 'paid' && (
                      <button onClick={()=>setTransactions((prev)=>prev.map(x=>x.id===t.id?{...x,status:'paid'}:x))} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Mark Paid</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;

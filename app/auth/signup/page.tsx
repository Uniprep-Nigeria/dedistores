'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    name: 'Ada Johnson',
    email: 'ada@example.com',
    phone: '08000000000',
    address: '12 Wuse Road, Abuja',
    city: 'Abuja',
    state: 'FCT',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dedistores-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 0 ? 2500 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/paystack/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          amount: total * 100,
          reference: `dedi-${Date.now()}`,
          callback_url: `${window.location.origin}/checkout?paid=true`,
        }),
      });

      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      alert('Demo checkout successful. Payment reference: ' + data.reference);
      localStorage.removeItem('dedistores-cart');
      setItems([]);
    } catch (error) {
      alert('Unable to process payment at the moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-6">
        <Link href="/cart" className="text-sm font-semibold text-primary">← Back to cart</Link>
      </div>

      <div className="container-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Secure checkout</div>
          <h1 className="mt-2 text-3xl font-black text-charcoal">Delivery details</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Full name" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email address" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Phone number" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="City" />
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 sm:col-span-2" placeholder="State" />
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 sm:col-span-2" placeholder="Delivery address" />
          </div>

          <div className="mt-8 rounded-2xl bg-lavender p-4 text-sm text-primary">
            Paystack is integrated for Nigerian naira payments. Add your LIVE keys in production to accept real payments.
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Processing payment...' : 'Pay with Paystack'}
          </button>
        </form>

        <aside className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Summary</div>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                <div>
                  <div className="font-semibold text-charcoal">{item.name}</div>
                  <div className="text-sm text-slate-500">Qty {item.qty}</div>
                </div>
                <div className="font-bold text-primary">₦{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>₦{deliveryFee.toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-charcoal"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
          </div>
        </aside>
      </div>
    </main>
  );
}

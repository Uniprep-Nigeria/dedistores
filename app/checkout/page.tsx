'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

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
  const total = subtotal + deliveryFee - discount;

  const updateQty = (id: string, nextQty: number) => {
    const updated = items.map((item) => (item.id === id ? { ...item, qty: Math.max(1, nextQty) } : item));
    setItems(updated);
    localStorage.setItem('dedistores-cart', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem('dedistores-cart', JSON.stringify(updated));
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'DEDI10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-6">
        <Link href="/" className="text-sm font-semibold text-primary">← Continue shopping</Link>
      </div>

      <div className="container-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Cart</div>
            <h1 className="text-3xl font-black text-charcoal">{items.length} item(s) selected</h1>
          </div>

          {items.length === 0 ? (
            <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
              <div className="text-xl font-bold">Your cart is empty.</div>
              <Link href="/" className="btn-primary mt-6">Explore products</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-28">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-charcoal">{item.name}</div>
                        <div className="mt-1 text-sm text-slate-500">₦{item.price.toLocaleString()} each</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-sm font-semibold text-red-500">Remove</button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 rounded-full bg-white text-lg font-bold">−</button>
                        <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 rounded-full bg-white text-lg font-bold">+</button>
                      </div>
                      <div className="text-xl font-black text-primary">₦{(item.price * item.qty).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Order summary</div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span>₦{deliveryFee.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Discount</span><span>-₦{discount.toLocaleString()}</span></div>
            </div>
            <div className="mt-6 rounded-2xl bg-lavender p-3 text-sm text-primary">Sample coupon: DEDI10</div>
            <div className="mt-4 flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm" />
              <button onClick={applyCoupon} className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white">Apply</button>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-lg font-bold text-charcoal">Total</span>
              <span className="text-2xl font-black text-primary">₦{total.toLocaleString()}</span>
            </div>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Proceed to checkout</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

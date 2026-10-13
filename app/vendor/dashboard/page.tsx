'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function VendorRegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', description: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/vendors/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(response.ok ? 'Shop registration received. Admin review is in progress.' : data.error || 'Registration failed');
  };

  return (
    <main className="bg-slate-50 py-16">
      <div className="container-shell max-w-3xl">
        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-100 md:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Vendor onboarding</div>
          <h1 className="mt-3 text-3xl font-black text-charcoal">Start selling on DEDI STORES</h1>
          <p className="mt-3 text-slate-600">Create your shop profile, upload products, and manage inventory with a trusted marketplace partner.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Shop name" required />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Business email" required />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 sm:col-span-2" placeholder="Phone number" required />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 sm:col-span-2" placeholder="Tell us about your products and business" required />
            <div className="sm:col-span-2 flex items-center justify-between gap-3">
              <Link href="/" className="text-sm font-semibold text-primary">Cancel</Link>
              <button type="submit" className="btn-primary">Submit shop application</button>
            </div>
          </form>

          {message ? <div className="mt-6 rounded-2xl bg-lavender p-4 text-sm text-primary">{message}</div> : null}
        </div>
      </div>
    </main>
  );
}

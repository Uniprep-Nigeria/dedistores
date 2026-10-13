'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || 'Login failed');
      return;
    }

    localStorage.setItem('dedistores-token', data.token);
    localStorage.setItem('dedistores-user', JSON.stringify(data.user));
    setMessage('Login successful. Redirecting...');
    window.location.href = '/';
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f5ebff,#fff_40%)] px-4 py-8">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-slate-100">
        <div className="mb-6 text-center">
          <div className="text-2xl font-black text-primary">DEDI STORES</div>
          <div className="mt-2 text-sm text-slate-500">Welcome back</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email address" required />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" required />
          <button type="submit" className="btn-primary w-full">Log in</button>
        </form>

        {message ? <div className="mt-4 rounded-2xl bg-lavender p-3 text-sm text-primary">{message}</div> : null}

        <div className="mt-5 text-center text-sm text-slate-500">
          New to DEDI STORES? <Link href="/auth/signup" className="font-semibold text-primary">Sign up</Link>
        </div>
      </div>
    </main>
  );
}

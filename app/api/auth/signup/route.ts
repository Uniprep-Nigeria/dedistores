import { db } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [products, vendors, customers, orders] = await Promise.all([
    db.product.count(),
    db.shop.count(),
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.order.count(),
  ]);

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-8">
        <div className="mb-8 rounded-[28px] bg-gradient-to-r from-[#222222] via-[#2b2b2b] to-[#6C2BD9] p-6 text-white shadow-soft">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Admin dashboard</div>
          <h1 className="mt-3 text-3xl font-black">DEDI STORES marketplace control</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Products</div><div className="mt-3 text-3xl font-black text-primary">{products}</div></div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Vendors</div><div className="mt-3 text-3xl font-black text-primary">{vendors}</div></div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Customers</div><div className="mt-3 text-3xl font-black text-primary">{customers}</div></div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Orders</div><div className="mt-3 text-3xl font-black text-primary">{orders}</div></div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100"><div className="text-xl font-black">Marketplace settings</div><div className="mt-4 text-sm text-slate-600">Admin controls for categories, commissions, payouts, subscriptions and promotions.</div></div>
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100"><div className="text-xl font-black">Payments & payouts</div><div className="mt-4 text-sm text-slate-600">Monitor Paystack payment records and vendor net payouts in NGN.</div></div>
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100"><div className="text-xl font-black">Product management</div><div className="mt-4 text-sm text-slate-600">Approve listings, flag issues, and manage a vendor’s inventory status.</div></div>
        </div>
      </div>
    </main>
  );
}

import { db } from '@/lib/db';

export default async function VendorDashboardPage() {
  const shops = await db.shop.findMany({ include: { products: true } });
  const totals = shops.reduce((sum, shop) => sum + shop.products.length, 0);

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-8">
        <div className="mb-8 rounded-[28px] bg-gradient-to-r from-primary to-[#7a39eb] p-6 text-white shadow-soft">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-violet-100">Vendor dashboard</div>
          <h1 className="mt-3 text-3xl font-black">Seller control center</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Active shops</div><div className="mt-3 text-3xl font-black text-primary">{shops.length}</div></div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Total products</div><div className="mt-3 text-3xl font-black text-primary">{totals}</div></div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="text-xs uppercase tracking-[0.2em] text-slate-500">Revenue</div><div className="mt-3 text-3xl font-black text-primary">₦942,000</div></div>
        </div>

        <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="mb-5 text-xl font-black text-charcoal">My shops</div>
          <div className="space-y-3">
            {shops.map((shop) => (
              <div key={shop.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="text-lg font-bold text-charcoal">{shop.name}</div>
                  <div className="text-sm text-slate-500">{shop.description || 'Ready to sell premium products.'}</div>
                </div>
                <div className="rounded-full bg-lavender px-3 py-1 text-sm font-semibold text-primary">{shop.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

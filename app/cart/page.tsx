import Link from 'next/link';
import { db } from '@/lib/db';
import { ProductCard } from '@/components/product-card';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const q = searchParams.q || '';
  const category = searchParams.category || 'all';

  const products = await db.product.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { shortDescription: { contains: q } },
              { description: { contains: q } },
            ],
          }
        : {}),
      ...(category !== 'all' ? { category: { is: { slug: category } } } : {}),
    },
    include: { category: true, shop: true },
    take: 24,
  });

  const searchTitle = q ? `Search results for “${q}”` : 'All products';

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-6">
        <Link href="/" className="text-sm font-semibold text-primary">← Back to home</Link>
      </div>
      <div className="container-shell">
        <div className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Search</div>
          <h1 className="mt-2 text-3xl font-black text-charcoal">{searchTitle}</h1>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  compareAtPrice: product.compareAtPrice,
                  shortDescription: product.shortDescription,
                  images: product.images,
                  category: product.category ? { name: product.category.name } : null,
                  shop: product.shop ? { name: product.shop.name } : null,
                  featured: product.featured,
                  trending: product.trending,
                  flashDeal: product.flashDeal,
                  discountPercent: product.discountPercent,
                  rating: product.avgRating,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-white p-10 text-center shadow-soft ring-1 ring-slate-100">
            <div className="text-xl font-bold">No items match your search.</div>
            <div className="mt-2 text-slate-500">Try a different keyword or browse featured collections.</div>
          </div>
        )}
      </div>
    </main>
  );
}

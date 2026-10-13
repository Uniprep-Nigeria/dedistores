import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { category: true, shop: { include: { owner: true } } },
  });

  if (!product) notFound();

  return (
    <main className="bg-slate-50 pb-16">
      <div className="container-shell py-6">
        <Link href="/" className="text-sm font-semibold text-primary">← Back to home</Link>
      </div>

      <section className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-100">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(0, 3).map((image, index) => (
              <div key={`${product.id}-${index}`} className="relative h-24 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
                <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-slate-100">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{product.category?.name}</div>
          <h1 className="mt-3 text-3xl font-black text-charcoal">{product.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-lavender px-2 py-1 text-primary">Sold by {product.shop.name}</span>
            <span>•</span>
            <span>{product.stock} in stock</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <div className="text-4xl font-black text-primary">₦{product.price.toLocaleString()}</div>
            {product.compareAtPrice ? <div className="text-lg text-slate-400 line-through">₦{product.compareAtPrice.toLocaleString()}</div> : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <span key={color} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium">{color}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span key={size} className="rounded-full border border-primary bg-lavender px-3 py-2 text-sm font-semibold text-primary">{size}</span>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              className="btn-primary flex-1"
              onClick={() => {
                const saved = localStorage.getItem('dedistores-cart');
                const cart = saved ? JSON.parse(saved) : [];
                const existing = cart.find((item: any) => item.id === product.id);
                if (existing) {
                  existing.qty += 1;
                } else {
                  cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty: 1 });
                }
                localStorage.setItem('dedistores-cart', JSON.stringify(cart));
                window.dispatchEvent(new Event('cart:updated'));
                window.location.href = '/cart';
              }}
            >
              Add to cart
            </button>
            <button className="btn-accent flex-1">Buy now</button>
          </div>

          <div className="mt-8 rounded-2xl bg-lavender p-4 text-sm text-primary">
            {product.shortDescription}
          </div>

          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </section>
    </main>
  );
}

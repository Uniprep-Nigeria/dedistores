import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { ProductSummary } from '@/components/home-page-client';

export function ProductCard({ product }: { product: ProductSummary }) {
  const discountPercent = product.discountPercent || Math.max(0, Math.round(((Number(product.compareAtPrice || product.price) - Number(product.price)) / Number(product.compareAtPrice || product.price)) * 100));

  return (
    <article className="soft-card overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative">
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <button className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm">
          <Heart className="h-4 w-4" />
        </button>
        {discountPercent > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
            -{discountPercent}%
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          <span>{product.category?.name || 'Marketplace'}</span>
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" /> {product.rating.toFixed(1)}
          </span>
        </div>

        <Link href={`/products/${product.id}`} className="block text-lg font-bold text-charcoal hover:text-primary">
          {product.name}
        </Link>

        <p className="line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-2xl font-black text-primary">₦{product.price.toLocaleString()}</div>
            {product.compareAtPrice && (
              <div className="text-sm text-slate-400 line-through">₦{product.compareAtPrice.toLocaleString()}</div>
            )}
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lavender text-primary transition hover:bg-primary hover:text-white"
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
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

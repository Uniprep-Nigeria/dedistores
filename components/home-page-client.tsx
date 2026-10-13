'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronRight, Heart, Search, ShoppingCart, Star, Tag } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

export type ProductSummary = {
  id: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  shortDescription: string;
  images: string[];
  category: { name: string } | null;
  shop: { name: string } | null;
  featured: boolean;
  trending: boolean;
  flashDeal: boolean;
  discountPercent: number;
  rating: number;
};

export function HomePageClient({
  categories,
  featuredProducts,
  trendingProducts,
  flashDeals,
}: {
  categories: Array<{ id: string; name: string; icon: string | null; slug: string }>;
  featuredProducts: ProductSummary[];
  trendingProducts: ProductSummary[];
  flashDeals: ProductSummary[];
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('dedistores-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCartSize(Array.isArray(parsed) ? parsed.reduce((sum, item) => sum + item.qty, 0) : 0);
      } catch {
        setCartSize(0);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const base = [...featuredProducts, ...trendingProducts, ...flashDeals];
    const normalized = query.trim().toLowerCase();
    return base.filter((product) => {
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized) || product.shortDescription.toLowerCase().includes(normalized);
      const matchesCategory = selectedCategory === 'all' || product.category?.name.toLowerCase() === selectedCategory.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  }, [featuredProducts, flashDeals, query, selectedCategory, trendingProducts]);

  return (
    <main className="bg-slate-50 text-charcoal">
      <header className="bg-primary text-white">
        <div className="container-shell py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-lg font-black">D</div>
              <div>
                <div className="text-xl font-black tracking-tight">DEDI STORES</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-violet-100">Nigerian marketplace</div>
              </div>
            </div>
            <nav className="hidden items-center gap-4 text-sm md:flex">
              <Link href="#categories" className="text-violet-100 transition hover:text-white">Categories</Link>
              <Link href="#deals" className="text-violet-100 transition hover:text-white">Flash deals</Link>
              <Link href="#featured" className="text-violet-100 transition hover:text-white">Featured</Link>
              <Link href="/vendor/register" className="text-violet-100 transition hover:text-white">Sell on DEDI</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white md:inline-flex">Login</Link>
              <Link href="/auth/signup" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">Sign up</Link>
              <Link href="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                  {cartSize}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-violet-100 bg-white">
        <div className="container-shell py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-charcoal outline-none ring-0 transition focus:border-primary focus:bg-white"
                  placeholder="Search for gadgets, fashion, beauty, home supplies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <div className="hidden items-center gap-2 rounded-full bg-lavender px-3 py-2 text-sm text-primary md:flex">
                <Tag className="h-4 w-4" />
                Free delivery from ₦15,000
              </div>
              <Link href="/search" className="btn-primary">Browse deals</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#f5ebff] via-white to-[#fffaf5]">
        <div className="container-shell py-6 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] bg-gradient-to-r from-primary via-[#7a39eb] to-[#3e1d88] p-6 text-white shadow-soft md:p-8">
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-100">Mega savings</div>
              <h1 className="mt-4 max-w-md text-3xl font-black leading-tight md:text-5xl">Shop smarter, save more.</h1>
              <p className="mt-4 max-w-lg text-sm text-violet-100 md:text-base">Find trusted sellers, thousands of fresh deals, and premium everyday essentials tailored for Nigerian shoppers.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/search" className="btn-accent">Shop now</Link>
                <Link href="/vendor/register" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white">Become a seller <ChevronRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-left">
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-black">10k+</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-violet-100">Products</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-black">4.8/5</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-violet-100">Satisfaction</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-black">1.2k</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-violet-100">Vendors</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[28px] bg-[#fff7f0] p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Flash sale</div>
                    <div className="mt-2 text-2xl font-black text-charcoal">Up to 70% off</div>
                  </div>
                  <div className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-white">Live</div>
                </div>
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Today only</div>
                      <div className="mt-1 text-xl font-bold text-primary">Ring Light Kit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-accent">₦12,000</div>
                      <div className="text-xs text-slate-400 line-through">₦20,500</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Trending now</div>
                    <div className="mt-2 text-xl font-black">Creator essentials</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {['Tripods', 'Microphones', 'Cameras', 'Selfie sticks'].map((tag) => (
                    <div key={tag} className="rounded-2xl bg-lavender px-3 py-3 text-center text-sm font-medium text-primary">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="page-section">
        <div className="container-shell">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Top categories</div>
              <h2 className="mt-2 text-2xl font-black text-charcoal">Shop by category</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`rounded-2xl border p-4 text-left shadow-sm transition ${selectedCategory === category.slug ? 'border-primary bg-lavender text-primary' : 'border-slate-200 bg-white text-charcoal hover:border-primary/50'}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">{category.icon || '✨'}</div>
                <div className="text-sm font-bold">{category.name}</div>
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-2xl border p-4 text-left shadow-sm transition ${selectedCategory === 'all' ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-charcoal hover:border-primary/50'}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">📦</div>
              <div className="text-sm font-bold">All offers</div>
            </button>
          </div>
        </div>
      </section>

      <section id="deals" className="page-section bg-[#fffaf3]">
        <div className="container-shell">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Flash deals</div>
              <h2 className="mt-2 text-2xl font-black text-charcoal">Big discounts, limited time</h2>
            </div>
            <Link href="/search?deal=true" className="text-sm font-semibold text-primary">View all</Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {flashDeals.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="page-section">
        <div className="container-shell">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured</div>
              <h2 className="mt-2 text-2xl font-black text-charcoal">Best picks for you</h2>
            </div>
            <Link href="/search" className="text-sm font-semibold text-primary">See more</Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="container-shell">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Trending</div>
              <h2 className="mt-2 text-2xl font-black text-charcoal">Most loved by shoppers</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-slate-900 text-white">
        <div className="container-shell">
          <div className="rounded-[32px] bg-gradient-to-r from-[#6c2bd9] to-[#8c44f5] p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-violet-100">Marketplace advantage</div>
                <h3 className="mt-3 text-3xl font-black">Trusted shopping, secure payments, fast delivery.</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xl font-black">Paystack</div>
                  <div className="mt-1 text-xs text-violet-100">NGN checkout</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xl font-black">Vendor</div>
                  <div className="mt-1 text-xs text-violet-100">Shop management</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xl font-black">Admin</div>
                  <div className="mt-1 text-xs text-violet-100">Marketplace control</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 text-slate-600">
        <div className="container-shell flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-black text-primary">DEDI STORES</div>
            <div className="mt-1 text-sm">Modern shopping built for Nigeria.</div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/search">Browse products</Link>
            <Link href="/vendor/register">Sell with us</Link>
            <Link href="/auth/login">Customer login</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

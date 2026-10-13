import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q') || '';

  const products = await db.product.findMany({
    where: {
      ...(category && category !== 'all' ? { category: { slug: category } } : {}),
      ...(q ? { OR: [{ name: { contains: q } }, { shortDescription: { contains: q } }] } : {}),
    },
    include: { category: true, shop: true },
    take: 30,
  });

  return NextResponse.json({ products });
}

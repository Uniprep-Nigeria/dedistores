import { NextResponse } from 'next/server';
import { verifyPaystackReference } from '@/lib/paystack';

export async function POST(request: Request) {
  const body = await request.json();
  const { reference } = body;

  if (!reference) {
    return NextResponse.json({ error: 'Reference is required.' }, { status: 400 });
  }

  const result = await verifyPaystackReference(reference);
  return NextResponse.json(result);
}

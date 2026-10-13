import { NextResponse } from 'next/server';
import { createPaystackInitialization } from '@/lib/paystack';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, amount, reference, callback_url } = body;

  if (!email || !amount || !reference) {
    return NextResponse.json({ error: 'Email, amount and reference are required.' }, { status: 400 });
  }

  const result = await createPaystackInitialization({
    email,
    amount: Number(amount),
    reference,
    callback_url: callback_url || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout`,
  });

  return NextResponse.json(result);
}

export async function createPaystackInitialization({
  email,
  amount,
  reference,
  callback_url,
}: {
  email: string;
  amount: number;
  reference: string;
  callback_url: string;
}) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY || '';

  if (!secretKey || secretKey.includes('your_secret_key_here')) {
    return {
      status: true,
      message: 'Demo mode: Paystack integration is ready but not configured yet.',
      reference,
      authorization_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?paid=true&reference=${reference}`,
    };
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amount),
      reference,
      callback_url,
    }),
  });

  return response.json();
}

export async function verifyPaystackReference(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY || '';

  if (!secretKey || secretKey.includes('your_secret_key_here')) {
    return {
      status: true,
      message: 'Demo verification successful.',
      data: { reference, status: 'success' },
    };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

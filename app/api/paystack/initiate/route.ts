import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, description } = body;

  if (!name || !email || !phone || !description) {
    return NextResponse.json({ error: 'Please complete all fields.' }, { status: 400 });
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  let user = existingUser;

  if (!user) {
    user = await db.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword('defaultvendorpass'),
        role: 'VENDOR',
      },
    });
  }

  const handle = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const shop = await db.shop.create({
    data: {
      name,
      handle,
      description,
      phone,
      status: 'PENDING',
      ownerId: user.id,
    },
  });

  return NextResponse.json({ message: 'Shop registration submitted for review.', shop });
}

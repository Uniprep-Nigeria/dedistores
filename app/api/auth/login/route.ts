import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password || password.length < 6) {
    return NextResponse.json({ error: 'Name, email and a 6+ character password are required.' }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'A user with that email already exists.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { name, email, passwordHash, role: 'CUSTOMER' },
  });

  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
}

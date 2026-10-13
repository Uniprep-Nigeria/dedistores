import { NextResponse } from 'next/server';
import { comparePassword, signToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const token = await signToken({ sub: user.id, email: user.email, role: user.role });

  return NextResponse.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

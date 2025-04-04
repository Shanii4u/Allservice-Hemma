import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const user = await createUser(name, email, password);

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 400 }
    );
  }
} 
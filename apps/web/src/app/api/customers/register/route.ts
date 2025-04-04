import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, email, phone, address, city, postalCode, password } = await request.json();

    if (!email || !password || !name || !address || !city || !postalCode) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user and customer in a transaction
    const result = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'CUSTOMER',
        },
      });

      // Create customer
      const customer = await tx.customer.create({
        data: {
          userId: user.id,
          address,
          city,
          postalCode,
        },
      });

      return { user, customer };
    });

    return NextResponse.json({
      id: result.customer.id,
      name: result.user.name,
      email: result.user.email,
      address: result.customer.address,
      city: result.customer.city,
      postalCode: result.customer.postalCode,
    });
  } catch (error) {
    console.error('Customer registration error:', error);
    return NextResponse.json(
      { error: 'Error creating customer' },
      { status: 500 }
    );
  }
} 
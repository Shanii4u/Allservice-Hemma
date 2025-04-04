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

    const { name, email, phone, department, startDate, skills, password } = await request.json();

    if (!email || !password || !name || !department || !startDate) {
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

    // Create user and employee in a transaction
    const result = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'EMPLOYEE',
        },
      });

      // Create employee
      const employee = await tx.employee.create({
        data: {
          userId: user.id,
          department,
          startDate: new Date(startDate),
          skills,
        },
      });

      return { user, employee };
    });

    return NextResponse.json({
      id: result.employee.id,
      name: result.user.name,
      email: result.user.email,
      department: result.employee.department,
      startDate: result.employee.startDate,
      skills: result.employee.skills,
    });
  } catch (error) {
    console.error('Employee registration error:', error);
    return NextResponse.json(
      { error: 'Error creating employee' },
      { status: 500 }
    );
  }
} 
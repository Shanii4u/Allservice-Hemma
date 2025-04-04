import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const workAssignments = await prisma.workAssignment.findMany({
      include: {
        employee: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(workAssignments);
  } catch (error) {
    console.error('Error fetching work assignments:', error);
    return NextResponse.json(
      { error: 'Error fetching work assignments' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const workAssignment = await prisma.workAssignment.findUnique({
      where: { id },
    });

    if (!workAssignment) {
      return NextResponse.json(
        { error: 'Work assignment not found' },
        { status: 404 }
      );
    }

    const updatedWorkAssignment = await prisma.workAssignment.update({
      where: { id },
      data: { status },
      include: {
        employee: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedWorkAssignment);
  } catch (error) {
    console.error('Error updating work assignment:', error);
    return NextResponse.json(
      { error: 'Error updating work assignment' },
      { status: 500 }
    );
  }
} 
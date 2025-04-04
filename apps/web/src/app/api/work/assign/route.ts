import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { employeeId, customerId, taskType, date, startTime, endTime, description, priority } = await request.json();

    if (!employeeId || !customerId || !taskType || !date || !startTime || !endTime || !description) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Create work assignment
    const workAssignment = await prisma.workAssignment.create({
      data: {
        employeeId,
        customerId,
        taskType,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        description,
        priority: priority || 'NORMAL',
      },
      include: {
        employee: {
          include: {
            user: true,
          },
        },
        customer: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: workAssignment.id,
      employee: {
        id: workAssignment.employee.id,
        name: workAssignment.employee.user.name,
      },
      customer: {
        id: workAssignment.customer.id,
        name: workAssignment.customer.user.name,
      },
      taskType: workAssignment.taskType,
      date: workAssignment.date,
      startTime: workAssignment.startTime,
      endTime: workAssignment.endTime,
      description: workAssignment.description,
      priority: workAssignment.priority,
      status: workAssignment.status,
    });
  } catch (error) {
    console.error('Work assignment error:', error);
    return NextResponse.json(
      { error: 'Error creating work assignment' },
      { status: 500 }
    );
  }
} 
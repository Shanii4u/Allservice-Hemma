import { hash } from 'bcryptjs';
import prisma from './prisma';

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string = 'USER'
) {
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
} 
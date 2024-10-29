import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, avatar, phoneNumber } = req.body;

    try {
      // Check if user with the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash: hashedPassword,  // Updated to match schema
          avatar,
          phoneNumber,
        },
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

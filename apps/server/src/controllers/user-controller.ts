import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateUserJWT } from '../utils/generate-jwt-token';
import { loginSchema, signupSchema, userPayload } from 'common';
import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const parsedInput = signupSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ message: parsedInput.error.message });
    }

    const { username, email, password, confirmPassword } = parsedInput.data;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
    });
    await prisma.$disconnect();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedInput = loginSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({ message: parsedInput.error.message });
    }

    const { email, password } = parsedInput.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      await prisma.$disconnect();
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userPayload: userPayload = { email, id: user.id };
    const token = generateUserJWT(userPayload);
    res
      .cookie('userAccessToken', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .json({ message: 'User logged in' });
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('userAccessToken');
    res.status(200).json({ message: 'User logged out' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const decodedUser: decodedUser = req.decodedUser;
    const user = await prisma.user.findUnique({
      where: {
        id: decodedUser.id,
      },
    });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

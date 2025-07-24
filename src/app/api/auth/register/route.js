import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body against schema
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { fullName, email, password, language } = result.data;
    const hash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hash,
        language,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Create the user in the database

    // Mock successful response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}

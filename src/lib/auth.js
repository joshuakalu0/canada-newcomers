import { compare } from "bcryptjs";
import prisma from "./prisma";

// Verify user credentials
export async function verifyCredentials(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Email/password is invalid" };
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    // role: user.role,
  };
}

// Check if user is authenticated
export function isAuthenticated(session) {
  return !!session?.user;
}

// Check if user is an admin
export function isAdmin(session) {
  return session?.user?.role === "ADMIN";
}

// Get current user from database with full details
export async function getCurrentUser(userId) {
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      country: true,
      language: true,
      createdAt: true,
    },
  });
}

import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate request body against schema
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    
    // In a real app, you would:
    // 1. Check if user exists
    // 2. Verify the password
    // 3. Create a session or JWT token
    
    // Mock successful response
    return NextResponse.json(
      { 
        message: 'Login successful', 
        user: { 
          email,
          name: 'Test User',
          role: 'USER'
        } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
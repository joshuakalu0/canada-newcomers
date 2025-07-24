# Canada Newcomers Hub

A comprehensive platform designed to help international students and newcomers navigate their Canadian journey with ease and confidence.

## Features

- **Interactive Map**: Find essential services and resources across Canada using Google Maps integration
- **User Authentication**: Secure login and registration system with role-based access control
- **Personalized Dashboard**: Customized dashboard for users with relevant information and resources
- **Service Directory**: Comprehensive directory of services categorized for easy navigation
- **Saved Locations**: Save and manage favorite locations for quick access
- **User Profiles**: Personalized profiles with user preferences and settings
- **Admin Dashboard**: Complete admin panel for managing users, services, locations, and feedback
- **Responsive Design**: Mobile-friendly interface with Canadian flag-inspired color scheme
- **Multi-language Support**: Support for multiple languages to accommodate diverse users

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Google Maps API
- **Animations**: GSAP, Framer Motion
- **Styling**: TailwindCSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/canada_newcomers?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

## Project Structure

- `src/app/(auth)`: Authentication pages (login, register)
- `src/app/(sites)`: Public pages (home, about, contact, faq)
- `src/app/(user)`: Protected user pages (dashboard, map, profile)
- `src/app/admin`: Admin dashboard and management pages
- `src/app/api`: API routes for data operations
- `src/app/components`: Reusable components
- `src/lib`: Utility functions and libraries
- `prisma`: Database schema and migrations

## Key Pages

- **Home**: Landing page with key information and resources
- **Login/Register**: User authentication pages
- **User Dashboard**: Personalized dashboard for authenticated users
- **Interactive Map**: Map interface to find and save locations
- **Profile**: User profile management
- **Admin Dashboard**: Complete admin interface for site management

## Security Features

- JWT-based authentication
- Role-based access control
- Protected routes with middleware
- Secure password handling
- CSRF protection

## Design

The application features a clean, modern design inspired by the Canadian flag, with a red and white color scheme. The interface is designed to be intuitive and accessible, with a focus on user experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
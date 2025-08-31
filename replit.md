# SkillSwap Platform

## Overview

SkillSwap is a professional service bartering platform that enables freelancers and professionals to exchange completed work directly without monetary transactions. Users can offer their expertise in exchange for services they need, creating a skill-based economy where professionals help each other grow their businesses.

The platform facilitates direct skill exchanges (e.g., web development for graphic design, content writing for SEO services) through a structured matching and project management system with built-in reputation tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: TanStack Query (React Query) for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation and schema integration

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints with JSON responses
- **Request Processing**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement with Vite integration for full-stack development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Data Validation**: Zod schemas shared between client and server for consistent validation

### Database Schema Design
The system uses a comprehensive relational schema with the following core entities:
- **Users**: Profile information, skills, ratings, and verification status
- **Services**: Offered and needed services with categorization and skill requirements
- **Swap Proposals**: Matching system for service exchanges with status tracking
- **Projects**: Active work collaborations with milestone and progress tracking
- **Reviews**: Reputation system with ratings and feedback
- **Messages**: Communication system for project coordination

### Authentication and Session Management
- **Session Storage**: PostgreSQL-based session management using connect-pg-simple
- **User Management**: User registration, profile management, and verification system
- **Authorization**: Service ownership validation and project access control

### File Management
- **File Upload**: Custom file upload component with drag-and-drop support
- **Validation**: File size limits, type restrictions, and count limitations
- **Storage**: Portfolio files and project assets management system

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, Vite, and React DOM
- **Database**: Neon Database (PostgreSQL serverless), Drizzle ORM, and Drizzle Kit
- **Validation**: Zod for schema validation and type safety

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **UI Components**: shadcn/ui component system with class-variance-authority
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tools**: Vite with React plugin and TypeScript support
- **Development**: tsx for Node.js TypeScript execution, esbuild for production builds
- **Replit Integration**: Cartographer plugin and runtime error overlay for development

### Utility Libraries
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel**: Embla Carousel React for image galleries
- **Command Interface**: cmdk for command palette functionality
- **Utilities**: clsx and Tailwind Merge for conditional class handling
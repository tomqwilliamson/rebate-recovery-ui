# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript application for managing medical supplies rebate recovery processes. It's built with modern technologies including Vite, Redux Toolkit, Azure AD B2C authentication, and real-time SignalR communication.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - TypeScript compilation followed by Vite production build  
- `npm run lint` - ESLint code quality check (max 0 warnings)
- `npm run preview` - Preview production build locally

### Testing
No test framework is currently configured in the project.

### Demo/Mock Login
For development and demo purposes, a mock authentication system is available:
- Click "Demo Login" on the login page to bypass Azure AD B2C authentication
- Creates a mock user session with full dashboard access
- Mock user: Demo User (demo.user@company.com) with admin role
- Mock JWT tokens are stored in localStorage for session persistence

## Architecture Overview

### State Management
- **Redux Toolkit** with organized slices in `src/store/slices/`:
  - `authSlice` - User authentication and profile data
  - `contractsSlice` - Contract data and filters  
  - `rebatesSlice` - Rebate calculations and history
  - `uiSlice` - Theme, sidebar, and notification state

### API Layer  
- **Base API Service** (`src/services/api/base.api.ts`) provides:
  - Automatic JWT token injection via request interceptors
  - 401 unauthorized handling with automatic redirect to login
  - Standardized error handling and response formatting
  - File upload support with multipart/form-data
- All API services extend this base class for consistency

### Authentication
- **Azure AD B2C** integration with MSAL
- Token management through `tokenService` in `src/services/auth/`
- Protected routes with automatic redirection for unauthenticated users

### Real-time Communication
- **SignalR** service in `src/services/signalr/` for live notifications and updates

### Component Organization
```
src/components/
├── auth/           # Authentication components
├── common/         # Shared reusable components
│   ├── UI/         # Basic UI components
│   ├── Layout/     # Layout components  
│   └── Charts/     # Data visualization
└── features/       # Feature-specific components
    ├── Dashboard/  
    ├── Contracts/  
    ├── Rebates/    
    ├── Analytics/  
    └── Settings/   
```

### TypeScript Configuration
- Path aliases configured for clean imports:
  - `@/` → `src/`
  - `@components/` → `src/components/`  
  - `@services/` → `src/services/`
  - `@store/` → `src/store/`
  - `@hooks/` → `src/hooks/`
  - `@types/` → `src/types/`
  - `@utils/` → `src/utils/`

## Environment Configuration

Required environment variables:
- `VITE_API_BASE_URL` - Backend API base URL (defaults to `/api`)
- `REACT_APP_AZURE_CLIENT_ID` - Azure AD B2C client ID
- `REACT_APP_AZURE_AUTHORITY` - Azure B2C authority URL  
- `REACT_APP_AZURE_KNOWN_AUTHORITY` - Azure B2C known authority
- `REACT_APP_REDIRECT_URI` - OAuth redirect URI
- `REACT_APP_SIGNALR_HUB_URL` - SignalR hub URL

## Code Conventions

### Styling
- **Tailwind CSS** utility classes with custom gradient and glassmorphism effects
- Color scheme: primary blues with accent purples
- Consistent hover effects and smooth transitions

### Component Patterns
- Export components from index files in each directory
- TypeScript interfaces defined in `src/types/`
- Custom hooks in `src/hooks/`
- Utility functions in `src/utils/`

### API Integration  
- Extend `BaseApiService` for new API endpoints
- Add corresponding TypeScript types in `types/`
- Handle errors using the standardized error format

## Build & Deployment

The application builds to a `dist/` directory and is optimized for Azure Static Web Apps deployment. The Vite proxy configuration redirects `/api` calls to `https://localhost:7001` during development.
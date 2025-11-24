# ResQ - Emergency Dispatch System

## Project Structure

```
├── src/
│   ├── app/                    # Redux configuration
│   ├── features/               # Feature-based modules
│   │   ├── ambulances/
│   │   ├── incidents/
│   │   ├── dispatch/
│   │   └── dashboard/
│   ├── shared/                 # Shared code
│   ├── pages/                  # Main pages
│   ├── layouts/                # Reusable layouts
│   ├── services/               # API services
│   └── tests/                  # Global tests
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Mock API Server
```bash
npm run api
```

### Run Tests
```bash
npm test
npm run test:e2e
```

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit
- TanStack Query
- React Router
- Tailwind CSS
- React Leaflet
- React Hook Form + Zod
- Vitest + Playwright

## Git Flow

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches

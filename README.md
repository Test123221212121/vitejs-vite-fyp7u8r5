# AssetLink OS Dashboard v7.2

Modern React/TypeScript dashboard application for AssetLink OS with Supabase backend.

## Features

- **Dashboard**: Executive overview with real-time statistics
- **Kanban Board**: Visual task management with project filtering
- **Projects**: Project management and overview
- **Companies**: Company management
- **LifeOS**: Personal routines and focus tasks
- **News Feed**: News and updates
- **AssetLink Core**: System status monitoring
- **Organization**: Organization chart

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Import existing data (optional):
```bash
npm install dotenv
node scripts/import-data.mjs
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/       # Dashboard components
│   ├── kanban/          # Kanban board components
│   ├── projects/        # Projects view
│   ├── companies/       # Companies view
│   ├── lifeos/          # LifeOS dashboard
│   └── layout/          # Layout components (Sidebar, Header)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries (Supabase client)
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Database Schema

The application uses Supabase with the following tables:

- **companies**: Company information with brand colors
- **customers**: Customer information linked to companies
- **projects**: Projects with status and company/customer relations
- **tasks**: Tasks with status (urgent, todo, doing, done, recurring)
- **routines**: Daily/weekly personal routines
- **activity_log**: System activity logging

All tables have Row Level Security (RLS) enabled.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Migration from Old System

This application replaces the old HTML/JS + Python server system with a modern React application. Data from the old `metadata.json` and `kanban.json` files can be imported using the `scripts/import-data.mjs` script.

## License

Private - AssetLink Group

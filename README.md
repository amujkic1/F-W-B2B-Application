# F-W-B2B-Application

Full-stack B2B application with:

- Frontend: React + Vite (in `client`)
- Backend: Node.js + Express + MongoDB (in `server`)

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string for backend (`MONGO_URI`)

## Project Structure

- `client/` - frontend app (Vite)
- `server/` - backend API

## Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Default Vite dev URL: `http://localhost:5173`

Other client commands:

```bash
npm start        # alias for npm run dev
npm run build    # production build to client/dist
npm run preview  # preview production build
```

## Backend (Server)

```bash
cd server
npm install
npm start
```

Backend runs on:

- `http://localhost:5000` by default
- or `PORT` from environment variables

Required backend environment variable:

- `MONGO_URI`

## Run Frontend and Backend Together

Use two terminals:

1. Start backend from `server/` with `npm start`
2. Start frontend from `client/` with `npm run dev`
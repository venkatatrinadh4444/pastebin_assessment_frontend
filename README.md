# Pastebin Lite

A simple Pastebin-like web application where users can create text pastes
and share a link to view them. Pastes can expire based on time or view count.

## Tech Stack
- Backend: NestJS, Prisma, PostgreSQL (Neon)
- Frontend: Next.js (App Router), Tailwind CSS
- Deployment: Render (backend), Vercel (frontend)

## Live URLs
- Frontend: https://pastebin-assessment-frontend.vercel.app
- Backend API: https://assessment-backend-n6jj.onrender.com

## Running Locally

### Backend
```bash
git clone https://github.com/venkatatrinadh4444/pastebin_assessment_frontend.git
cd pastebin_assessment_frontend
npm install
npm run dev

.env 
NEXT_PUBLIC_API_BASE_URL=https://assessment-backend-n6jj.onrender.com
NEXT_PUBLIC_SITE_URL=https://pastebin-assessment-frontend.vercel.app

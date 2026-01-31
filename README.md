# HRMS Lite

## Overview
Lightweight HRMS system for managing employees and attendance.

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind
- **Backend**: FastAPI
- **Database**: MySQL

## How to Run Locally

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up your `.env` file (refer to `.env.example`).
4. Start the server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Assumptions
- Single admin user handles all entries.
- No authentication layer included in this "Lite" version.
- Daily attendance can only be marked for today or past dates.

## Limitations
- No payroll or leave management.
- Backend assumes a pre-configured MySQL instance (credentials in `.env`).

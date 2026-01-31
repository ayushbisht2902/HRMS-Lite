# HRMS Lite

## Overview
Lightweight HRMS system for managing employees and attendance.

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind
- **Backend**: FastAPI
- **Database**: MySQL

## MySQL Setup
1. **Install MySQL Server**: Make sure it’s running on port `3306`.
2. **Create the Database**:
   ```sql
   CREATE DATABASE IF NOT EXISTS hrms_lite;
   ```
3. **Configure Permissions**: Ensure your user has access to this database.
4. **Update Backend `.env`**: Fill in your credentials:
   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DB=hrms_lite
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   ```

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
   uvicorn app.main:app --reload
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

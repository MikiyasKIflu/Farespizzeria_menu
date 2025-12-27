# Faris Cafe Menu

A modern, digital menu application for Fares Pizzeria/Cafe.

## Features

- **Public Menu**: Beautiful, responsive menu display with category filtering and search.
- **Multilingual Support**: Supports English, Amharic, Afan Oromo, and Somali.
- **Admin Dashboard**: Secure interface to manage menu items and categories.
- **Supabase Backend**: Real-time database and authentication.

## Tech Stack

- React + Vite
- Supabase (Auth + Database)
- Vercel (Deployment)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**:
   Run the SQL scripts in your Supabase SQL Editor:
   - `schema.sql`: Creates the menu_items table
   - `create_categories_table.sql`: Creates the categories table
   - `seed_fares_pizzeria.sql`: Adds initial menu data

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## Admin Access

Navigate to `/admin` to access the dashboard. You will need to sign in with a Supabase user account.

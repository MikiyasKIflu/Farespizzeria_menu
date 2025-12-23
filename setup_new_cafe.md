# Setup Guide: New Café Instance

Follow these steps to customize this template for a new café.

## 1. Clone the Repository
Clone this repository to your local machine or your preferred hosting platform (e.g., GitHub, GitLab).

```bash
git clone <repository-url>
cd cafe-menu-template
```

## 2. Supabase Setup
This project uses Supabase for the database and authentication.

1.  **Create a Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Database Schema**:
    -   Copy the contents of `schema.sql` from this repository.
    -   In your Supabase dashboard, go to the **SQL Editor**.
    -   Paste and run the schema to create the `menu_items` table.
3.  **Authentication**:
    -   Go to **Authentication > Users** in Supabase and create a new user for the admin account.
4.  **Environment Variables**:
    -   Create a `.env` file in the root of your project.
    -   Add your Supabase URL and Anon Key:
        ```env
        VITE_SUPABASE_URL=your-supabase-url
        VITE_SUPABASE_KEY=your-supabase-anon-key
        ```

## 3. Customize Branding
Update the configurations to match the new café's branding.

1.  **Config File**: Open `src/config.js` and update the values:
    ```javascript
    export const cafeConfig = {
        name: 'My New Café',
        slogan: 'Best Coffee in Town!',
        logoPath: '/logo.png', // Place your logo in the public folder
        primaryColor: '#YOUR_COLOR', // Update color variables in index.css too
        accentColor: '#YOUR_ACCENT',
    };
    ```
2.  **CSS Variables**: Open `src/index.css` and update the branding colors in the `:root` section.
3.  **Images**: Replace `public/logo.png` with the café's logo.

## 4. Deploy to Vercel
Deployment is easiest with Vercel.

1.  Connect your repository to Vercel.
2.  Add the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`) in the Vercel project settings.
3.  Deploy!

---

## 5. First Time Data
You can use the `seed_ayu_menu.sql` as a reference to add initial items to your database via the Supabase SQL Editor, or use the Admin Dashboard to add them manually.

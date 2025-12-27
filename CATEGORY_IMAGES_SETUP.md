# Adding Category Images - Instructions

To add images to your categories, follow these steps:

## Step 1: Verify Supabase Schema
The `image_url` column has already been added to the `categories` table in the schema. If you haven't run the SQL yet:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Click **SQL Editor** in the left sidebar
4. Run the `create_categories_table.sql` file to create the categories table with image support

## Step 2: Add Images to Your Categories
You can add image URLs when creating categories in the admin panel, or update existing categories:

1. Go to your admin dashboard (`/admin`)
2. Click **Manage Categories**
3. When adding a new category, enter the image URL in the "Image URL" field
4. For existing categories, you can update them directly in Supabase:
   - Go to **Table Editor** → **categories**
   - Click on a category row
   - Add or update the `image_url` field with a link to an image

## Recommended Image Sources
- **Unsplash**: https://unsplash.com/ (free high-quality images)
- **Your own images**: Upload to your server or use image hosting

The images will automatically display in the category filter on the public menu page.

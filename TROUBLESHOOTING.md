# Troubleshooting Menu Items Not Saving

## Issue
Categories are working, but menu items are not being saved to Appwrite.

## Most Common Causes

### 1. Missing Indexes (MOST LIKELY)
Appwrite requires indexes for any queries that use ordering or filtering.

**Fix:**
1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Navigate to: **Databases** → **[Your Database]** → **menu_items** → **Indexes**
3. Create these indexes:
   - **category_index**: Attribute `category`, Type: Key, Direction: ASC
   - **name_en_index**: Attribute `name_en`, Type: Key, Direction: ASC
   - **created_at_index**: Attribute `$createdAt`, Type: Key, Direction: DESC
4. Wait 30 seconds for indexes to become "Available"
5. Refresh your website

### 2. Missing Attributes
Ensure your `menu_items` collection has these attributes (exact names):
- `name_en` (String, required)
- `name_local` (String, required)
- `name_om` (String, optional)
- `name_so` (String, optional)
- `price` (Float or Integer, required)
- `category` (String, required)
- `is_available` (Boolean, default: true)
- `image_url` (String, optional)

### 3. Permissions Issue
Check collection permissions:
1. Go to **menu_items** → **Settings** → **Permissions**
2. Add role: **Any** with **Read** permission
3. Add role: **Users** with **Create, Read, Update, Delete** permissions

## How to Check if Items Are Actually Saving

1. After clicking "Add Item", check for an alert popup
   - If you see "Error saving item: [message]" → The error message tells you what's wrong
   - If no alert appears → The item might be saved but not displaying

2. Go to Appwrite Console → **Databases** → **menu_items** → **Documents**
   - If you see documents there but not in your app → It's an index or query issue
   - If no documents → It's a permission or attribute issue

## Quick Test
Try adding a simple item:
- Name (English): `Test`
- Name (Local): `ሙከራ`
- Price: `50`
- Category: (select any existing category)

If this fails, note the exact error message and check the browser console (F12).

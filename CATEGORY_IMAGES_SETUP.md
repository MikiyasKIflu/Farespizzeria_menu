# Adding Category Images - Instructions

To add images to your categories, follow these steps:

## Step 1: Update Appwrite Collection
1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Navigate to: **Databases** → **[Your Database]** → **categories**
3. Click **Attributes** tab
4. Click **Add Attribute**
5. Select **String**
6. Attribute Key: `image_url`
7. Size: `2000`
8. Required: **No** (uncheck)
9. Click **Create**

## Step 2: Add Images to Your Categories
After I update the code, you'll be able to add image URLs when creating categories in the admin panel.

For now, you can add images directly in Appwrite:
1. Go to **categories** → **Documents**
2. Click on a category
3. Add an `image_url` field with a link to an image (e.g., from Unsplash or your own images)

## Recommended Image Sources
- **Unsplash**: https://unsplash.com/ (free high-quality images)
- **Your own images**: Upload to your server or use image hosting

Let me know once you've added the `image_url` attribute in Appwrite!

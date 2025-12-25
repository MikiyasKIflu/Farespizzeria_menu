# Deploying Your Café Menu to Vercel

Follow these steps to deploy your menu online so customers can access it.

## Prerequisites
- A GitHub account (free)
- Your Appwrite credentials ready

## Step 1: Push Code to GitHub

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `faris-cafe-menu` (or any name you prefer)
   - Make it **Public** or **Private** (your choice)
   - Don't initialize with README (we already have code)
   - Click **Create repository**

2. **Push your code** (run these commands in your project folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Fares Pizzeria menu"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/faris-cafe-menu.git
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Sign in** with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. **Import** your `faris-cafe-menu` repository
5. Click **Import**

## Step 3: Add Environment Variables

**CRITICAL**: Before clicking Deploy, add your Appwrite credentials:

1. In the deployment settings, find **Environment Variables**
2. Add these variables (one by one):

   ```
   VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=694cca3a00364303b5fb
   VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
   VITE_APPWRITE_COLLECTION_ITEMS_ID=YOUR_ITEMS_COLLECTION_ID
   VITE_APPWRITE_COLLECTION_CATEGORIES_ID=YOUR_CATEGORIES_COLLECTION_ID
   ```

3. Get the IDs from your Appwrite Console:
   - Database ID: Databases → Click your database → Copy the ID from the URL
   - Collection IDs: Click each collection → Copy ID from the URL

## Step 4: Deploy!

1. Click **Deploy**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://faris-cafe-menu.vercel.app`

## Step 5: Share with Customers

Your menu is now live! You can:
- **Share the link** directly with customers
- **Create a QR code**: Use https://qr-code-generator.com/ with your Vercel URL
- **Print the QR code** and place it on tables

## Admin Access

- Public menu: `https://your-url.vercel.app/`
- Admin panel: `https://your-url.vercel.app/login`

## Troubleshooting

**If the menu is blank after deployment:**
- Check that all environment variables are set correctly in Vercel
- Make sure your Appwrite collections have the correct permissions (Read for "Any")

**To update your menu later:**
- Just push changes to GitHub: `git add .`, `git commit -m "Update menu"`, `git push`
- Vercel will automatically redeploy!

## Custom Domain (Optional)

Want a custom domain like `menu.farespizzeria.com`?
1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel, go to your project → Settings → Domains
3. Add your custom domain and follow the instructions

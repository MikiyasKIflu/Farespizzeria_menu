# Deploying Your Café Menu to Vercel

Follow these steps to deploy your menu online so customers can access it.

## Prerequisites
- A GitHub account (free)
- Your Supabase credentials ready

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

**CRITICAL**: Before clicking Deploy, add your Supabase credentials:

1. In the deployment settings, find **Environment Variables**
2. Add these variables (one by one):

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Where to find them**:
   - Go to your Supabase Project Dashboard
   - Click **Settings** (gear icon) -> **API**
   - Copy the **Project URL** and **anon public** key

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
- Admin panel: `https://your-url.vercel.app/admin` (Note: requires login)

## Troubleshooting

**If the menu is blank after deployment:**
- Check that all environment variables are set correctly in Vercel
- Check the browser console (F12) for connection errors
- Verify your Supabase storage policies (RLS) allowing public access to menu items

**To update your menu later:**
- Just push changes to GitHub: `git add .`, `git commit -m "Update menu"`, `git push`
- Vercel will automatically redeploy!

## Custom Domain (Optional)

Want a custom domain like `menu.farespizzeria.com`?
1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel, go to your project → Settings → Domains
3. Add your custom domain and follow the instructions

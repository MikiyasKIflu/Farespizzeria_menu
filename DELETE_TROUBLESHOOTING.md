# Delete Function Not Working - Troubleshooting Steps

## Step 1: Check Browser Console
1. Open http://localhost:5173/admin in your browser
2. Press **F12** to open Developer Tools
3. Click on the **Console** tab
4. Try to delete an item
5. Look for any **red error messages** in the console
6. Copy the exact error message

## Step 2: Check Appwrite Permissions
The most common reason delete doesn't work is missing permissions.

1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Navigate to: **Databases** → **[Your Database]** → **menu_items**
3. Click **Settings** → **Permissions**
4. You should see at least these two roles:

   **Role: Any**
   - ✅ Read

   **Role: Users** (or your specific email)
   - ✅ Create
   - ✅ Read
   - ✅ Update
   - ✅ Delete ← **This must be checked!**

5. If "Delete" is not checked, check it and click **Update**

## Step 3: Verify You're Logged In
Make sure you're logged in as an authenticated user:
- You should see your email or user info in the Appwrite console
- Try logging out and logging back in to the admin panel

## Step 4: Test with Console Command
Open browser console (F12) and paste this command:
```javascript
console.log('User:', await account.get());
```
This will show if you're properly authenticated.

## Common Error Messages and Fixes

**"Unauthorized" or "Missing scope"**
→ Add Delete permission to Users role in Appwrite

**"Document not found"**
→ The item ID is wrong (but we already fixed this)

**No error at all**
→ The button click handler might not be connected properly

Let me know what error you see in the console!

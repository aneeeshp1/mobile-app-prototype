# GitHub Pages Deployment Guide

Complete step-by-step instructions to deploy your mobile app prototype to GitHub Pages.

## Prerequisites

- GitHub account (free at github.com)
- Git installed on your computer
- Your mobile prototype project ready to deploy

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Sign in to your account
3. Click the **+** icon in the top right corner
4. Select **New repository**
5. Fill in the details:
   - **Repository name**: `mobile-app-prototype` (or any name you prefer)
   - **Description**: Mobile app prototype with login (optional)
   - **Public**: Select "Public" (required for free GitHub Pages)
   - Leave other options as default
6. Click **Create repository**

You'll be taken to your new empty repository. Keep this page open - you'll need the repository URL.

### Step 2: Set Up Git Locally

Open your terminal/command prompt and navigate to your project folder:

```bash
cd c:\Users\Public\mobile-prototype
```

Initialize Git and connect to your GitHub repository:

```bash
# Initialize git locally
git init

# Configure git (replace with your info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all project files
git add .

# Create first commit
git commit -m "Initial commit: Mobile app prototype with login form"

# Add GitHub remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/mobile-app-prototype.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important**: Replace:
- `USERNAME` with your GitHub username
- `mobile-app-prototype` with your repository name

### Step 3: Enable GitHub Pages

GitHub Pages should automatically detect and deploy using GitHub Actions:

1. Go to your repository on GitHub: `https://github.com/USERNAME/REPO_NAME`
2. Click **Settings** (gear icon in the top right)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source should already be set to **GitHub Actions**
   - If not, select it from the dropdown
5. GitHub will automatically start the deployment workflow

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow named "Deploy to GitHub Pages" running
3. Wait for it to complete (usually 1-2 minutes)
4. When done, you'll see a green checkmark ✓

### Step 5: Access Your Deployed App

Your app is now live! Access it at:

```
https://USERNAME.github.io/REPO_NAME/
```

For example:
- If your username is `john_doe` and repo is `mobile-app-prototype`
- Your URL is: `https://john_doe.github.io/mobile-app-prototype/`

### Step 6: Share Your App

You can now share this URL with anyone! They can:
- View your mobile app prototype
- Test the login form (use any email and password with 6+ characters)
- See what your mobile app will look like

## Making Updates

Every time you make changes and push to GitHub, your live site updates automatically:

```bash
# Make changes to your files...

# Then push to GitHub
git add .
git commit -m "Description of changes"
git push
```

The GitHub Actions workflow automatically rebuilds and redeploys (usually 1-2 minutes).

## Troubleshooting

### Issue: "404 Not Found" error

**Solutions:**
1. Make sure your repository is public (Settings > General)
2. Wait 2-3 minutes for the first deployment
3. Hard refresh your browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
4. Check the Actions tab to verify deployment succeeded

### Issue: App shows blank page

**Solutions:**
1. Clear browser cache
2. Open browser DevTools (F12) and check Console for errors
3. Verify the URL matches your repository name
4. Try a different browser

### Issue: Changes not showing on deployed site

**Solutions:**
1. Make sure you pushed to GitHub: `git push`
2. Check the Actions tab for successful deployment
3. Wait a few minutes for deployment to complete
4. Hard refresh your browser

### Issue: Can't login to app

This is normal! The login form accepts any email and password (minimum 6 characters) for demo purposes. There's no real authentication yet.

## Customizing Your Deployment

### Change the site URL

If you want a custom domain (optional):

1. Go to repository **Settings > Pages**
2. Under "Custom domain", enter your domain name
3. You'll be guided through DNS configuration

### Update app settings

All deployment happens automatically. Just update your code:

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub: `git push`
4. GitHub automatically rebuilds and deploys

## Security Notes

- GitHub Pages is for **public content only**
- Your code is visible to everyone
- Don't commit passwords or secret keys to GitHub
- Use environment variables for sensitive data (if needed later)

## Next Steps

Once your app is deployed:

1. **Share the link** with team members or stakeholders
2. **Gather feedback** on the design and UX
3. **Iterate quickly** - make changes and push to GitHub
4. **Add more features** as you refine the design
5. **Prepare for production** when ready

## Useful Commands

```bash
# Check git status
git status

# View commit history
git log

# Create a new feature branch (optional)
git checkout -b feature-name

# Switch back to main
git checkout main

# View remote repository info
git remote -v
```

## Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Deploy Vite on GitHub Pages](https://vitejs.dev/guide/static-deploy.html)

---

**Your mobile app prototype is ready to be shared with the world! 🚀**

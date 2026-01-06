# Quick Start Guide - Mobile App Prototype

## What is this?

This is a React-based mobile app prototype with a login form and home screen, ready to be deployed on GitHub Pages for others to test and see how your mobile app will look and behave.

## 🎯 Quick Steps to Deploy

### 1. Create a GitHub Repository

- Go to [github.com](https://github.com) and sign in
- Click the **+** icon and select **New repository**
- Name it something like `mobile-app-prototype`
- Make sure it's **public**
- Click **Create repository**

### 2. Initialize Git and Push Code

Open your terminal in the project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial mobile app prototype"

# Add your repository (replace USERNAME/REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

> **Note**: If you're creating a new repo, GitHub will tell you the correct branch name to use.

### 3. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under "Build and deployment", select **GitHub Actions** as source
5. Wait a few seconds - the workflow should start automatically

### 4. Get Your Deployment URL

Once deployment is complete:
- Go to your repository home page
- On the right side, under "Deployments", you'll see a link
- Your app will be live at: `https://USERNAME.github.io/REPO_NAME/`

### 5. Share the Link!

Share the URL with anyone to showcase your mobile app prototype.

## 🎮 Testing the App

1. Open the deployed URL in your browser
2. Try the login form with any email and password (min 6 chars)
3. Example:
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign In"
5. You'll see the home screen with feature cards
6. Click "Sign Out" to go back to login

## 📝 Making Changes

To update your prototype:

```bash
# Make changes to files
# Then push to GitHub:

git add .
git commit -m "Describe your changes"
git push
```

GitHub will automatically rebuild and redeploy in 1-2 minutes.

## 🎨 Easy Customizations

### Change Colors

Edit `src/index.css` and `src/styles/LoginForm.css` to change the gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Try different color combinations:
- `#FF6B6B` and `#4ECDC4` (Pink & Teal)
- `#667eea` and `#764ba2` (Purple - default)
- `#F093FB` and `#F5576C` (Pink & Red)

### Change Text

Edit these files to customize:
- `src/components/LoginForm.jsx` - Login screen text
- `src/components/HomePage.jsx` - Home screen text
- `src/App.jsx` - App logic

### Add More Pages

Create new files in `src/components/` and update `src/App.jsx`.

## 🆘 Common Issues

**Q: I see a blank page**
- Give GitHub Actions 2-3 minutes to build
- Refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Check repository Settings > Pages

**Q: I see "404" error**
- Make sure repository is public
- Wait for Actions workflow to complete
- Check the URL matches your repository name

**Q: I can't login**
- Use any email and password (password min 6 characters)
- No actual authentication - it's just a demo

## 📚 Project Structure

```
mobile-prototype/
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx      ← Login screen
│   │   └── HomePage.jsx       ← Home screen after login
│   ├── styles/
│   │   ├── LoginForm.css
│   │   └── HomePage.css
│   ├── App.jsx                ← Main app
│   └── index.css              ← Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml         ← Auto-deployment config
├── vite.config.js             ← Build config
├── package.json               ← Project info
└── README.md                  ← Full documentation
```

## 💡 Tips

1. **Use Chrome DevTools** - Press F12 and select mobile view to see how it looks on phones
2. **Share Early** - Get feedback early in development
3. **Iterate Quickly** - Make changes and push - they'll be live in minutes
4. **Mobile Optimization** - Test on actual phones to see real mobile experience

## 🚀 Next Steps

Once you have this working:
1. Add more screens (profile, settings, etc.)
2. Add real authentication (Firebase, Auth0, etc.)
3. Connect to a backend API
4. Add data persistence
5. Publish to app stores (convert to native app)

## 📞 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Visit [Vite Documentation](https://vite.dev)
- Visit [React Documentation](https://react.dev)
- Visit [GitHub Pages Help](https://pages.github.com)

---

**Happy prototyping! 🎉**

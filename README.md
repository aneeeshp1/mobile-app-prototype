# Mobile App Prototype

A modern React-based mobile app prototype featuring a clean login form and home screen. This is a fully responsive, mobile-first design that showcases how a mobile app would look and behave.

## 🚀 Features

- **Login Form**: Email and password authentication form with validation
- **Home Screen**: Welcome screen with feature cards after successful login
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Development**: Built with Vite for quick development and optimized builds
- **Ready for Deployment**: Pre-configured for GitHub Pages hosting

## 🛠️ Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **GitHub Pages** - Static hosting

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Git (for GitHub Pages deployment)

## 🔧 Development

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for production
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Preview production build locally
```bash
npm run preview
```

## 🔐 Demo Credentials

For testing, you can use any email and password (minimum 6 characters):
- Email: `demo@example.com`
- Password: `password123`

## 📱 App Structure

```
src/
├── components/
│   ├── LoginForm.jsx      # Login form component
│   └── HomePage.jsx       # Home screen component
├── styles/
│   ├── LoginForm.css      # Login form styling
│   └── HomePage.css       # Home page styling
├── App.jsx                # Main app component
├── App.css                # App styling
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 🌐 Deployment to GitHub Pages

### Step 1: Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial mobile app prototype"

# Add remote repository (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to main branch
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Select **GitHub Actions** as the source
4. The GitHub Actions workflow will automatically deploy your app

### Step 3: Share Your App

Once deployed, your app will be available at:
```
https://USERNAME.github.io/REPO_NAME/
```

For example, if your username is `john` and repo name is `mobile-app`, the URL would be:
```
https://john.github.io/mobile-app/
```

## 🔄 Continuous Deployment

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build the production version
2. Deploy it to GitHub Pages
3. Update your live website

## 📝 Customization

### Change App Title and Logo
Edit `index.html` to update the page title and favicon.

### Modify Colors
The gradient colors are defined in:
- `src/index.css` - Global styles
- `src/styles/LoginForm.css` - Login page colors
- `src/styles/HomePage.css` - Home page colors

Update the gradient values:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Features
Create new components in `src/components/` and import them in `App.jsx`.

## 🎨 Design Features

- **Gradient Backgrounds**: Modern purple gradient theme
- **Mobile Frame**: iPhone-like design with notch and rounded corners
- **Smooth Animations**: Slide-up animations for page transitions
- **Interactive Buttons**: Hover and active states for better UX
- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and inputs for mobile use

## 📱 Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to fork, modify, and use this prototype for your own projects.

## 📄 License

Open source - free to use and modify.

## 🆘 Troubleshooting

### GitHub Pages shows 404 error
- Ensure your repository is public
- Verify the workflow completed successfully (check Actions tab)
- Try clearing browser cache

### App looks broken on mobile
- Clear browser cache
- Try on different device or browser
- Check browser console for errors

### Changes not reflecting on GitHub Pages
- Wait a few minutes for the GitHub Actions workflow to complete
- Check the Actions tab to verify deployment succeeded
- Manually trigger deployment if needed

## 📞 Support

For issues or questions, refer to:
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [GitHub Pages Documentation](https://pages.github.com)

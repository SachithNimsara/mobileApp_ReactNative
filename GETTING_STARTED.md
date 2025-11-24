# 🚀 FitBuddy - Getting Started

## Quick Start (3 Steps)

### Step 1: Install Dependencies
Open PowerShell or Command Prompt in the FitBuddy folder and run:
```bash
npm install
```

**OR** double-click the `install.bat` file on Windows.

### Step 2: Start the App
```bash
npm start
```

### Step 3: Run on Your Device
- Install **Expo Go** app on your phone (iOS/Android)
- Scan the QR code that appears in the terminal
- Wait for the app to load

---

## 🎯 Demo Login

Use these credentials to test the app:
```
Username: emilys
Password: emilyspass
```

---

## 📱 What You'll Get

A fully functional fitness tracking app with:

✅ **Authentication**
- Login & Registration with validation
- Secure token storage

✅ **Home Screen**
- Browse exercises and wellness tips
- Interactive water intake tracker (tap circles to track 0-8 glasses)
- Search exercises
- Pull to refresh

✅ **Exercises Screen**
- Filter by difficulty (Beginner, Intermediate, Advanced)
- Search by name, category, or muscle group
- View detailed exercise information

✅ **Favorites**
- Save your favorite exercises
- Quick access to saved items
- One-tap to remove

✅ **Profile**
- View your stats
- Toggle dark mode (try it!)
- Logout

---

## 🎨 Features to Try

1. **Track Water Intake**
   - On Home screen, tap the blue circles to track glasses
   - Watch the progress bar fill up!

2. **Add Favorites**
   - Tap the heart icon on any exercise card
   - View them all in the Favorites tab

3. **Dark Mode**
   - Go to Profile tab
   - Toggle the dark mode switch
   - Watch the entire app transform!

4. **Search & Filter**
   - Use the search bar to find specific exercises
   - In Exercises tab, filter by difficulty level

5. **Exercise Details**
   - Tap any exercise card
   - See full instructions, calories, equipment needed

---

## 🛠️ Troubleshooting

### Installation Issues?
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### App Not Starting?
```bash
# Clear Expo cache
expo start -c
```

### Can't See QR Code?
- Make sure your computer and phone are on the same WiFi
- Or press 'w' to run in web browser

---

## 📁 Project Files

```
FitBuddy/
├── components/       # UI components (Button, Card, Input, etc.)
├── screens/         # All app screens
├── redux/           # State management
├── navigation/      # Navigation setup
├── services/        # API services
├── utils/           # Constants and utilities
└── App.js          # Main entry point
```

---

## 🎨 Customization

Want to change the colors? Edit `utils/constants.js`:
```javascript
export const COLORS = {
  primary: '#10B981',    // Change this!
  secondary: '#3B82F6',  // And this!
  // ... more colors
};
```

Want to add exercises? Edit `services/api.js`:
```javascript
export const MOCK_EXERCISES = [
  // Add your exercises here
];
```

---

## 📚 Technologies Used

- React Native + Expo
- Redux Toolkit (state management)
- React Navigation (navigation)
- Formik + Yup (forms & validation)
- AsyncStorage (data persistence)
- React Native Feather (icons)

---

## 🎓 Learning Resources

- **Expo Docs:** https://docs.expo.dev
- **React Navigation:** https://reactnavigation.org
- **Redux Toolkit:** https://redux-toolkit.js.org

---

## ✨ What Makes This App Special

🎯 **Production-Ready**
- Complete error handling
- Loading states everywhere
- Form validation
- Data persistence

🎨 **Beautiful Design**
- Modern color scheme
- Smooth animations
- Dark mode support
- Gradient backgrounds

🚀 **Great Performance**
- Optimized renders
- Efficient state management
- Fast navigation
- Smooth scrolling

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Read `README.md` for full documentation
3. Review code comments in the files
4. Check `PROJECT_SUMMARY.md` for technical details

---

## 🎉 Enjoy Your FitBuddy App!

**Remember:**
- Username: `emilys`
- Password: `emilyspass`

Start tracking your fitness journey today! 💪

---

**Built with ❤️ using React Native and Expo**

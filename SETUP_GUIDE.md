# FitBuddy - Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android)

## Installation Steps

### 1. Navigate to the project directory
```bash
cd FitBuddy
```

### 2. Install all dependencies
```bash
npm install
```

This will install all required packages:
- React Native and Expo
- Navigation libraries
- Redux Toolkit and React Redux
- AsyncStorage
- Axios
- Formik and Yup
- React Native Feather icons
- Expo Linear Gradient

### 3. Start the development server
```bash
npm start
```

Or use specific commands:
```bash
npm run android  # Run on Android
npm run ios      # Run on iOS (macOS only)
npm run web      # Run on web browser
```

### 4. Run the app

**On Physical Device:**
1. Open the Expo Go app on your phone
2. Scan the QR code from the terminal
3. Wait for the app to build and load

**On Emulator:**
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

## Testing the App

### Login Credentials

Use these demo credentials to test the app:

```
Username: emilys
Password: emilyspass
```

These credentials work with the DummyJSON API (https://dummyjson.com).

### Features to Test

1. **Authentication:**
   - Try logging in with demo credentials
   - Try registering a new account (form validation)
   - Test password strength validation

2. **Home Screen:**
   - Browse exercises and wellness tips
   - Use the search bar to filter items
   - Try pull-to-refresh
   - Track water intake (tap the circles)

3. **Exercise Details:**
   - Tap any card to view details
   - Add/remove from favorites
   - View calories, equipment, and instructions

4. **Favorites:**
   - Add items to favorites from Home or Exercises
   - View all favorites
   - Remove items from favorites

5. **Profile:**
   - View your stats
   - Toggle dark mode
   - Logout

## Troubleshooting

### Common Issues

**1. Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**2. Metro bundler issues:**
```bash
# Clear Expo cache
expo start -c
```

**3. iOS simulator not opening:**
- Make sure Xcode is installed (macOS only)
- Run: `sudo xcode-select --switch /Applications/Xcode.app`

**4. Android emulator not starting:**
- Ensure Android Studio is installed
- Set up an AVD (Android Virtual Device)

## Project Structure Overview

```
FitBuddy/
├── components/        # Reusable UI components
├── navigation/        # Navigation configuration
├── redux/            # State management
├── screens/          # App screens
├── services/         # API services
├── utils/            # Constants and utilities
└── App.js           # Main app entry
```

## Key Technologies

- **React Native + Expo:** Cross-platform mobile development
- **Redux Toolkit:** State management
- **React Navigation:** Navigation
- **Formik + Yup:** Forms and validation
- **AsyncStorage:** Local data persistence
- **Axios:** HTTP requests

## Features Implemented

✅ Complete authentication flow  
✅ Bottom tab navigation  
✅ Exercise browsing with search/filter  
✅ Water intake tracker  
✅ Favorites management  
✅ Dark mode support  
✅ Smooth animations  
✅ AsyncStorage persistence  
✅ Form validation  
✅ Error handling  

## Development Tips

1. **Enable Fast Refresh:** Changes automatically reload
2. **Use React DevTools:** Install browser extension
3. **Debug with Console:** Use `console.log()` for debugging
4. **Hot Reload:** Shake device to open dev menu

## Next Steps

- Explore the code in different folders
- Modify colors in `utils/constants.js`
- Add more exercises in `services/api.js`
- Customize UI components
- Test on different devices

## Support

For issues or questions:
1. Check the README.md file
2. Review the code comments
3. Check Expo documentation: https://docs.expo.dev
4. React Navigation docs: https://reactnavigation.org

---

**Happy Coding! 🚀**

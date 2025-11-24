# FitBuddy - Health & Wellness Mobile App

A complete React Native mobile application for tracking exercises, water intake, and wellness tips. Built with Expo, Redux Toolkit, and modern UI/UX practices.

## Features

### Authentication
- ✅ Login and Registration with form validation (Formik + Yup)
- ✅ Email format validation and password strength requirements
- ✅ Secure token storage with AsyncStorage
- ✅ Demo credentials for testing

### Navigation
- ✅ Stack Navigator for authentication flow
- ✅ Bottom Tab Navigator with 4 tabs (Home, Exercises, Favorites, Profile)
- ✅ Smooth animations and transitions

### Home Screen
- ✅ Scrollable exercise and wellness tip cards
- ✅ Interactive water intake tracker (0-8 glasses)
- ✅ Search and filter functionality
- ✅ Pull-to-refresh
- ✅ Favorite button on each card

### Exercise Details Screen
- ✅ Full exercise information display
- ✅ Equipment needed and muscle groups
- ✅ Step-by-step instructions
- ✅ Estimated calories burned
- ✅ Add/remove favorites

### State Management
- ✅ Redux Toolkit for global state
- ✅ Slices for: auth, exercises, favorites, waterIntake, theme
- ✅ AsyncStorage persistence

### Favorites Screen
- ✅ Display all favorited items
- ✅ Remove from favorites
- ✅ Empty state with motivational message

### Profile Screen
- ✅ User information display
- ✅ Weekly activity stats
- ✅ Dark mode toggle with persistence
- ✅ Logout functionality

### UI/UX Features
- ✅ Complete dark mode support
- ✅ Smooth animations (card press, transitions)
- ✅ Gradient backgrounds and overlays
- ✅ Shadow effects on cards
- ✅ Rounded corners and modern design
- ✅ Loading states with ActivityIndicator
- ✅ Error handling with user-friendly messages
- ✅ Responsive design
- ✅ React Native Feather icons throughout

## Color Palette

- **Primary:** #10B981 (Emerald green)
- **Secondary:** #3B82F6 (Blue)
- **Accent:** #F59E0B (Amber)
- **Success:** #22C55E
- **Error:** #EF4444
- **Difficulty Easy:** #22C55E
- **Difficulty Medium:** #F59E0B
- **Difficulty Hard:** #EF4444

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Run on platforms:**
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web
- Or scan the QR code with Expo Go app

## Demo Credentials

For testing the app, use these credentials:

**Username:** emilys  
**Password:** emilyspass

(These work with the dummyjson.com API)

## Project Structure

```
FitBuddy/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Input.js
│   ├── Card.js
│   ├── Header.js
│   └── WaterTracker.js
├── navigation/          # Navigation configuration
│   └── AppNavigator.js
├── redux/              # State management
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── exercisesSlice.js
│   │   ├── favoritesSlice.js
│   │   ├── waterIntakeSlice.js
│   │   └── themeSlice.js
│   └── store.js
├── screens/            # App screens
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── ExerciseDetailsScreen.js
│   ├── FavoritesScreen.js
│   └── ProfileScreen.js
├── services/           # API services
│   └── api.js
├── utils/              # Constants and utilities
│   └── constants.js
├── App.js             # Main app entry
└── package.json
```

## Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **Formik & Yup** - Form handling and validation
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client
- **React Native Feather** - Icon library
- **Expo Linear Gradient** - Gradient components

## API Integration

- **Authentication:** https://dummyjson.com/auth/login
- **Exercises:** Mock data with realistic exercise information
- **Wellness Tips:** Built-in wellness tips and advice

## Key Features Implemented

### Water Intake Tracker
- Interactive circular buttons (glasses)
- Visual progress bar
- Daily goal tracking (8 glasses)
- Tap to increment/decrement
- Auto-reset on new day
- AsyncStorage persistence

### Exercise Cards
- Gradient overlay on images
- Difficulty badges (colored by level)
- Category tags
- Calories burned display
- Favorite heart icon
- Smooth press animations

### Search & Filter
- Real-time search across exercises
- Filter by name, category, muscle group
- Instant results

### Dark Mode
- Complete theme support
- Smooth transitions
- Persists in AsyncStorage
- Toggle switch in Profile

### Animations
- Card press effects (scale animation)
- Screen transitions
- Water glass fill animations
- Theme transition animations

## Code Quality

- ✅ Feature-based folder structure
- ✅ Functional components with React Hooks
- ✅ Reusable components
- ✅ Proper error handling
- ✅ Loading states
- ✅ Comments for complex logic
- ✅ Constants file for configuration
- ✅ API service layer
- ✅ Redux best practices

## Future Enhancements

- Add more exercise categories
- Implement workout plans
- Add progress tracking charts
- Social features (share workouts)
- Push notifications for reminders
- Integration with fitness APIs
- Offline mode support
- Multi-language support

## License

This project is created for educational purposes.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using React Native and Expo**

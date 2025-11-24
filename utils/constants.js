// Color Palette
export const COLORS = {
  // Light Mode
  primary: '#10B981',
  secondary: '#3B82F6',
  accent: '#F59E0B',
  backgroundLight: '#F9FAFB',
  backgroundDark: '#111827',
  cardBackgroundLight: '#FFFFFF',
  cardBackgroundDark: '#1F2937',
  textLight: '#111827',
  textDark: '#F9FAFB',
  success: '#22C55E',
  error: '#EF4444',
  
  // Additional colors
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  white: '#FFFFFF',
  black: '#000000',
  
  // Difficulty colors
  difficultyEasy: '#22C55E',
  difficultyMedium: '#F59E0B',
  difficultyHard: '#EF4444',
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'https://dummyjson.com',
  LOGIN: '/auth/login',
  REGISTER: '/users/add',
  USER: '/auth/me',
};

// App Strings
export const STRINGS = {
  APP_NAME: 'FitBuddy',
  LOGIN: 'Login',
  REGISTER: 'Register',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  USERNAME: 'Username',
  FULL_NAME: 'Full Name',
  LOGOUT: 'Logout',
  HOME: 'Home',
  EXERCISES: 'Exercises',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  DARK_MODE: 'Dark Mode',
  WATER_INTAKE: 'Water Intake',
  DAILY_GOAL: 'Daily Goal',
  GLASSES: 'glasses',
  NO_FAVORITES: 'No favorites yet',
  NO_FAVORITES_MESSAGE: 'Start adding exercises to your favorites!',
  LOADING: 'Loading...',
  ERROR: 'Error',
  SUCCESS: 'Success',
  SEARCH_PLACEHOLDER: 'Search exercises...',
  DIFFICULTY: 'Difficulty',
  EQUIPMENT: 'Equipment',
  MUSCLE_GROUPS: 'Muscle Groups',
  INSTRUCTIONS: 'Instructions',
  CALORIES_BURNED: 'Calories Burned',
  ADD_TO_FAVORITES: 'Add to Favorites',
  REMOVE_FROM_FAVORITES: 'Remove from Favorites',
  WEEKLY_STATS: 'Weekly Stats',
  EXERCISES_COMPLETED: 'Exercises Completed',
  AVG_WATER_INTAKE: 'Avg Water Intake',
  PULL_TO_REFRESH: 'Pull to refresh',
};

// Screen Names
export const SCREENS = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  EXERCISES: 'Exercises',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  EXERCISE_DETAILS: 'ExerciseDetails',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@fitbuddy_auth_token',
  USER_DATA: '@fitbuddy_user_data',
  FAVORITES: '@fitbuddy_favorites',
  WATER_INTAKE: '@fitbuddy_water_intake',
  DARK_MODE: '@fitbuddy_dark_mode',
};

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
};

// Layout Constants
export const LAYOUT = {
  BORDER_RADIUS: 12,
  BORDER_RADIUS_LARGE: 16,
  PADDING: 16,
  PADDING_SMALL: 8,
  PADDING_LARGE: 24,
  CARD_SHADOW: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

// Water Intake Constants
export const WATER_INTAKE = {
  MAX_GLASSES: 8,
  GLASS_SIZE_ML: 250,
};

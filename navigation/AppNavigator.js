import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/slices/authSlice';
import { setTheme } from '../redux/slices/themeSlice';
import { setFavorites } from '../redux/slices/favoritesSlice';

// Web-compatible icon component
const IconComponent = ({ name, color, size }) => {
  if (Platform.OS === 'web') {
    const icons = {
      Home: '🏠',
      Activity: '💪',
      Heart: '❤️',
      User: '👤'
    };
    return <Text style={{ fontSize: size }}>{icons[name] || '•'}</Text>;
  }
  // For native platforms, use react-native-feather
  const FeatherIcons = require('react-native-feather');
  const Icon = FeatherIcons[name];
  return <Icon width={size} height={size} color={color} />;
};
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import ExerciseDetailsScreen from '../screens/ExerciseDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, SCREENS, STORAGE_KEYS } from '../utils/constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress,
        },
      }),
    }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

// Home Stack Navigator (for nested navigation)
const HomeStack = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name={SCREENS.EXERCISE_DETAILS} component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
};

// Favorites Stack Navigator
const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
    <Stack.Screen name={SCREENS.EXERCISE_DETAILS} component={ExerciseDetailsScreen} />
  </Stack.Navigator>
);

// Exercises Stack Navigator
const ExercisesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ExercisesMain" component={ExercisesScreen} />
    <Stack.Screen name={SCREENS.EXERCISE_DETAILS} component={ExerciseDetailsScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case SCREENS.HOME:
              iconName = 'Home';
              break;
            case SCREENS.EXERCISES:
              iconName = 'Activity';
              break;
            case SCREENS.FAVORITES:
              iconName = 'Heart';
              break;
            case SCREENS.PROFILE:
              iconName = 'User';
              break;
            default:
              iconName = 'Home';
          }

          return <IconComponent name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: isDarkMode ? COLORS.gray400 : COLORS.gray500,
        tabBarStyle: {
          backgroundColor: isDarkMode
            ? COLORS.cardBackgroundDark
            : COLORS.cardBackgroundLight,
          borderTopColor: isDarkMode ? COLORS.gray800 : COLORS.gray200,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={SCREENS.EXERCISES}
        component={ExercisesStack}
        options={{ tabBarLabel: 'Exercises' }}
      />
      <Tab.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesStack}
        options={{ tabBarLabel: 'Favorites' }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    checkAuthStatus();
    loadTheme();
    loadFavorites();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch(loginSuccess({ user, token }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (stored !== null) {
        const isDarkMode = JSON.parse(stored);
        dispatch(setTheme(isDarkMode));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        const favorites = JSON.parse(stored);
        dispatch(setFavorites(favorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

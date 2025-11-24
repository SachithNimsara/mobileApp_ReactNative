import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import exercisesReducer from './slices/exercisesSlice';
import favoritesReducer from './slices/favoritesSlice';
import waterIntakeReducer from './slices/waterIntakeSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exercisesReducer,
    favorites: favoritesReducer,
    waterIntake: waterIntakeReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

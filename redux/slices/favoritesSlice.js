import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

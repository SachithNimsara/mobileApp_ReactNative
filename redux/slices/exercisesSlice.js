import { createSlice } from '@reduxjs/toolkit';

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    fetchExercisesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExercisesSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchExercisesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearExercises: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.searchQuery = '';
    },
  },
});

export const {
  fetchExercisesStart,
  fetchExercisesSuccess,
  fetchExercisesFailure,
  setSearchQuery,
  clearExercises,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;

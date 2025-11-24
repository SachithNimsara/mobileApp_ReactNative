import { createSlice } from '@reduxjs/toolkit';

const waterIntakeSlice = createSlice({
  name: 'waterIntake',
  initialState: {
    glasses: 0,
    date: new Date().toDateString(),
    weeklyData: [],
  },
  reducers: {
    incrementWater: (state) => {
      const today = new Date().toDateString();
      if (state.date !== today) {
        // New day, reset counter
        state.glasses = 1;
        state.date = today;
      } else if (state.glasses < 8) {
        state.glasses += 1;
      }
    },
    decrementWater: (state) => {
      const today = new Date().toDateString();
      if (state.date === today && state.glasses > 0) {
        state.glasses -= 1;
      }
    },
    setWaterIntake: (state, action) => {
      state.glasses = action.payload.glasses;
      state.date = action.payload.date;
    },
    resetDailyWater: (state) => {
      state.glasses = 0;
      state.date = new Date().toDateString();
    },
    addWeeklyData: (state, action) => {
      state.weeklyData = action.payload;
    },
  },
});

export const {
  incrementWater,
  decrementWater,
  setWaterIntake,
  resetDailyWater,
  addWeeklyData,
} = waterIntakeSlice.actions;

export default waterIntakeSlice.reducer;

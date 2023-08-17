import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({
  name: "city",
  initialState: {
    value: [], // Initial state for cities
  },
  reducers: {
    addCity: (state, action) => {
      state.value.push(action.payload); // Push the new city to the state array
    },
  },
});

// Action creator for adding a city
export const { addCity } = citySlice.actions;

export default citySlice.reducer;

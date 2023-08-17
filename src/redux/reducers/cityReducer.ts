import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityState {
  value: string[]; // Update this type according to your use case
}

const initialState: CityState = {
  value: [], // Initial state for cities
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload); // Push the new city to the state array
    },
  },
});

// Action creator for adding a city
export const { addCity } = citySlice.actions;

export default citySlice.reducer;
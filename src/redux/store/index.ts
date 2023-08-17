import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../reducers/cityReducer"; // Import the cityReducer directly, not named import

export default configureStore({
  reducer: {
    city: cityReducer, // Use cityReducer, not citySlice.reducer
  },
});
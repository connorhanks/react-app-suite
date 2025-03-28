import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, WeatherData } from '../types/weather';

// Create initial state for the weather slice
const initialState: WeatherState = {
  loading: false,
  error: null,
  location: '',
  weatherData: null
};

// Create weather slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Action to set the loc
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    
    // Action to start fetching weather
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action that will be dispatched by the saga on successful API call
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.loading = false;
      state.weatherData = action.payload;
      state.error = null;
    },
    
    // Action that will be dispatched by the saga if API call fails
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.weatherData = null;
    },
  },
});

// Export the actions
export const { 
  setLocation,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure
} = weatherSlice.actions;

// Export reducer
export default weatherSlice.reducer;
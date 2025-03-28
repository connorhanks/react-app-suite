import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../weatherSlice';
import type { RootState } from '../index';

// Check if API key exists and throw a helpful error if it doesn't
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!API_KEY) {
  throw new Error('Weather API key is missing. Pls add VITE_WEATHER_API_KEY to your .env file');
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Helper function to make the API call
function fetchWeatherFromAPI(location: string) {
  console.log('Making API call for loc:', location);
  const url = `${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`;
  console.log('API URL:', url);
  return axios.get(url);
}

// Helper function to get weather icon URL
export const getWeatherIconUrl = (icon: string) => 
  `https://openweathermap.org/img/wn/${icon}@4x.png`;

// Worker saga: will be fired on FETCH_WEATHER_START actions
function* fetchWeather() {
  try {
    console.log('fetchWeather saga started');
    // Get the location from the store
    const location: string = yield select((state: RootState) => state.weather.location);
    console.log('Location from store:', location);
    
    // Make the API call
    const response = yield call(fetchWeatherFromAPI, location);
    console.log('API response:', response.data);
    
    // Dispatch success action with the data
    yield put(fetchWeatherSuccess(response.data));
  } catch (error: any) {
    console.error('Error in fetchWeather saga:', error);
    // Dispatch failure action if the API call fails
    yield put(fetchWeatherFailure(error.response?.data?.message || 'Failed to fetch weather data'));
  }
}

// Watcher saga: watches for actions and starts worker saga
export function* weatherSaga() {
  console.log('Weather saga init');
  yield takeLatest(fetchWeatherStart.type, fetchWeather);
}

export default weatherSaga;
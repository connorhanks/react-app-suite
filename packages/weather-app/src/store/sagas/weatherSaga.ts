import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '..';
import { fetchWeather, fetchWeatherSuccess, fetchWeatherFailure } from '../weatherSlice';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || '';

export function getWeatherIconUrl(iconCode: string) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function* fetchWeatherSaga(action: ReturnType<typeof fetchWeather>): Generator<any, void, any> {
  try {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key is not configured');
    }

    const location: string = yield select((state: RootState) => state.weather.location);
    const response = yield call(fetch, `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    const data = yield response.json();
    yield put(fetchWeatherSuccess(data));
  } catch (error) {
    yield put(fetchWeatherFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

export function* weatherSaga() {
  yield takeLatest(fetchWeather.type, fetchWeatherSaga);
} 
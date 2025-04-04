import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherReducer, { WeatherState } from './weatherSlice';
import { weatherSaga } from './sagas/weatherSaga';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  weather: WeatherState;
}

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(weatherSaga);

export type AppDispatch = typeof store.dispatch; 
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherReducer from './weatherSlice';
import rootSaga from './rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run saga middleware with root saga
sagaMiddleware.run(rootSaga);

// Define RootState type for TS
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for TS
export type AppDispatch = typeof store.dispatch;

export default store;

import { all, fork } from 'redux-saga/effects';
import weatherSaga from './sagas/weatherSaga';

// Root saga combines all other sagas
export default function* rootSaga() {
  
  yield all([
    fork(weatherSaga),
  ]);
} 
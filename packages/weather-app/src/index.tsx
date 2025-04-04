import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import WeatherApp from './components/WeatherApp';

const WeatherAppWithProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
};

export default WeatherAppWithProvider; 
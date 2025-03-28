import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLocation, fetchWeatherStart } from '../store/weatherSlice';
import { RootState } from '../store';
import { getWeatherIconUrl } from '../store/sagas/weatherSaga';

const WeatherApp: React.FC = () => {
  // Set up Redux dispatch to send actions
  const dispatch = useDispatch();

  // Get weather data from Redux store
  const { weatherData, loading, error, location } = useSelector((state: RootState) => state.weather);
  // Local state to keep track of recent searches (prsists  until page refresh)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Handle form submission when user searches for a location
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    if (location.trim()) { // Check if location isn't empty
      dispatch(fetchWeatherStart()); // Tell Redux to fetch weather data
      // Add the location to recent searches if it's not already there
      if (!recentSearches.includes(location)) {
        setRecentSearches(prev => [location, ...prev].slice(0, 5)); // Keep only last 5 searches
      }
    }
  };

  // Convert temp from celsius to fahrenheit
  const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;

  // Convert unix timestamp to readable time
  const getTimeFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to ms
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true // Use 12-hour format (AM/PM)
    });
  };

  // Convert wind degrees to compass directions
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Set background gradient based on weather and time of day
  const getWeatherBackground = () => {
    if (!weatherData) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    
    const condition = weatherData.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18; // Check if it's night time (between 6pm and 6am)

    // Return different gradients based on weather condition and time
    switch(condition) {
      case 'clear':
        return isNight ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'clouds':
        return isNight ? 'bg-gradient-to-br from-gray-800 to-blue-900' : 'bg-gradient-to-br from-gray-400 to-blue-500';
      case 'rain':
        return isNight ? 'bg-gradient-to-br from-gray-900 to-blue-800' : 'bg-gradient-to-br from-gray-600 to-blue-700';
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 to-blue-300';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-gray-900 to-purple-900';
      default:
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="weather-app">
      {/* Search section w form & recent searches */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))} // Update loc in Redux when user types
            placeholder="Enter city name..."
            className="flex-1 px-4 py-2 text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium shadow-lg shadow-blue-500/30"
          >
            Search
          </button>
        </form>

        {/* Show recent searches (if any exist) */}
        {recentSearches.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(setLocation(search)); // Set loc
                  dispatch(fetchWeatherStart()); // Fetch weather for that loc
                }}
                className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all shadow-sm hover:shadow-md border border-gray-200 text-gray-700 font-medium flex items-center gap-2"
              >
                <span role="img" aria-label="location" className="text-blue-500">📍</span>
                {search}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show loading spinner while fetching data */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* Show error message if something goes wrong */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Weather display section - only shows when we have data */}
      {weatherData && (
        <div className={`rounded-3xl p-6 text-white overflow-hidden ${getWeatherBackground()}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Main weather info */}
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-2">{weatherData.name}, {weatherData.sys.country}</h2>
              <p className="text-7xl font-bold mb-4">
                {Math.round(weatherData.main.temp)}°C
                <span className="text-2xl opacity-75 ml-2">
                  / {Math.round(celsiusToFahrenheit(weatherData.main.temp))}°F
                </span>
              </p>
              <p className="text-xl capitalize mb-1">{weatherData.weather[0].description}</p>
              <p className="opacity-75">
                Feels like {Math.round(weatherData.main.feels_like)}°C
              </p>
            </div>

            {/* Weather icon display */}
            <div className="relative">
              <img 
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                className="w-48 h-48 object-contain filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Additional weather details in grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-black/20 rounded-2xl p-4">
            <div className="text-center p-2">
              <p className="text-sm opacity-75 mb-1">Humidity</p>
              <p className="text-2xl font-bold">{weatherData.main.humidity}%</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm opacity-75 mb-1">Wind</p>
              <p className="text-2xl font-bold">
                {Math.round(weatherData.wind.speed)} m/s
                <span className="text-sm ml-1">{getWindDirection(weatherData.wind.deg)}</span>
              </p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm opacity-75 mb-1">Sunrise</p>
              <p className="text-2xl font-bold">{getTimeFromTimestamp(weatherData.sys.sunrise)}</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm opacity-75 mb-1">Sunset</p>
              <p className="text-2xl font-bold">{getTimeFromTimestamp(weatherData.sys.sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
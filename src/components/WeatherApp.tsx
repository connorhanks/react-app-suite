import React, { useState } from 'react';
import { useWeather, getWeatherIconUrl } from '../context/WeatherContext';

const WeatherApp: React.FC = () => {
  const { weatherData, loading, error, location, fetchWeather, setLocation } = useWeather();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Handle form submission when user searches for a location
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    if (location.trim()) { // Check if location isn't empty
      fetchWeather(location); // Fetch 
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

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Weather Display */}
      {weatherData && (
        <div className="weather-display">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          
          {/* Weather Icon and Description */}
          <div className="weather-icon">
            <img 
              src={getWeatherIconUrl(weatherData.weather[0].icon)} 
              alt={weatherData.weather[0].description}
            />
            <p>{weatherData.weather[0].description}</p>
          </div>

          {/* Temperature */}
          <div className="temperature">
            <p>Temperature: {Math.round(celsiusToFahrenheit(weatherData.main.temp))}°F</p>
            <p>Feels like: {Math.round(celsiusToFahrenheit(weatherData.main.feels_like))}°F</p>
          </div>

          {/* Additional Weather Info */}
          <div className="weather-details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} m/s {getWindDirection(weatherData.wind.deg)}</p>
            <p>Sunrise: {getTimeFromTimestamp(weatherData.sys.sunrise)}</p>
            <p>Sunset: {getTimeFromTimestamp(weatherData.sys.sunset)}</p>
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches</h3>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>
                <button onClick={() => fetchWeather(search)}>{search}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
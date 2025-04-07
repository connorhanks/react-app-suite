import React, { createContext, useContext, useState, useCallback } from 'react';

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  location: string;
  fetchWeather: (location: string) => Promise<void>;
  setLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const fetchWeather = useCallback(async (searchLocation: string) => {
    try {
      setLoading(true);
      setError(null);
      setLocation(searchLocation);

      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        location,
        fetchWeather,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const getWeatherIconUrl = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}; 
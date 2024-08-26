import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (city === '') return;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data.current);
        setForecast(data.forecast.forecastday);
      } else {
        alert(data.error.message || 'City not found');
        setWeather(null);
        setForecast(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };


  const handleClear = () => {
    setCity('');
    setWeather(null);
    setForecast(null);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        <button type="button" onClick={handleClear} className="clear-button">Clear</button> {/* Clear button */}
      </form>

      {weather && (
        <div className="weather-info">
          <h2>{city}</h2>
          <p>Temperature: {weather.temp_c}°C</p>
          <p>Weather: {weather.condition.text}</p>
          <p>Humidity: {weather.humidity}%</p> {/* Display humidity */}
        </div>
      )}

      {forecast && (
        <div className="forecast">
          <h3>3-Day Forecast</h3>
          {forecast.map((day) => (
            <div key={day.date} className="forecast-day">
              <h4>{day.date}</h4>
              <p>{day.day.condition.text}</p>
              <p>Min: {day.day.mintemp_c}°C | Max: {day.day.maxtemp_c}°C</p>
              <p>Humidity: {day.day.avghumidity}%</p> {/* Display average humidity for the day */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

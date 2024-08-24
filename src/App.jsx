import React, { useState } from 'react';
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  const fetchWeather = async () => {
    if (city === '') return;
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.error.message || 'City not found');
        setWeather(null);
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
      </form>

      {weather && (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Weather: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city === "") {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=007086a7e5aa410271d56147841b672a`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("City not found.");
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError("");
        }
      })
      .catch((error) => {
        setError("Error fetching weather data.");
        setWeatherData(null);
      });
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter City"
      />
      <button onClick={handleSearch}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          {/* City and Country Box */}
          <div className="weather-box city-country-box">
            <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          </div>

          <div className="weather-box">
            <h3>Temperature:</h3>
            <p>{weatherData.main.temp}°C</p>
          </div>
          <div className="weather-box">
            <h3>Condition:</h3>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className="weather-box">
            <h3>Humidity:</h3>
            <p>{weatherData.main.humidity}%</p>
          </div>
          <div className="weather-box">
            <h3>Wind Speed:</h3>
            <p>{weatherData.wind.speed} m/s</p>
          </div>
          <div className="weather-box pressure">
            <h3>Pressure:</h3>
            <p>{weatherData.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

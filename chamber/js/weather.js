

const apiKey = '8249496ae81f86c48180078cff688f3b'; 
const city = 'Saint George,Utah,US';



const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Current temperature and description
    const current = data.list[0];
    document.getElementById('current-temp').textContent = `Temperature: ${current.main.temp.toFixed(1)}°F`;
    document.getElementById('weather-desc').textContent = `Conditions: ${current.weather[0].description}`;

    // 3-day forecast (at 24h intervals: index 8, 16, 24)
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h3>3-Day Forecast:</h3>';

    for (let i = 8; i <= 24; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, { weekday: 'long' });
      const temp = forecast.main.temp.toFixed(1);
      const desc = forecast.weather[0].description;

      const dayEl = document.createElement('p');
      dayEl.textContent = `${date}: ${temp}°F - ${desc}`;
      forecastDiv.appendChild(dayEl);
    }
  } catch (err) {
    console.error('Weather API failed:', err);
    document.getElementById('weather-desc').textContent = 'Unable to load weather data.';
  }
}

fetchWeather();


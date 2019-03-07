const p = document.getElementById("weather");

fetch(
  "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956"
)
  .then(result => result.json())
  .then(data => {
    console.log(data);
    p.innerHTML = concatWeather(data);
  })
  .catch(err => console.log(err));

const concatWeather = data => {
  const todaysWeather = data.consolidated_weather[0];
  const weather = todaysWeather.weather_state_name;
  const pred = todaysWeather.predictability;
  const high = parseInt(todaysWeather.max_temp);
  const low = parseInt(todaysWeather.min_temp);
  const windspeed = parseInt(todaysWeather.wind_speed);
  const winddir = todaysWeather.wind_direction_compass;

  return `Weather: ${weather} <br> High Temp: ${high} <br> Low Temp: ${low} <br> Wind Speed: ${windspeed} <br> Wind Direction: ${winddir} <br> Predictability: ${pred} `;
};

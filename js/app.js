let search = document.getElementById("search");
const p = document.getElementById("weather");

const queryLocation = qcity => {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${qcity}`
  )
    .then(data => data.json())
    .then(result => getWeather(result[0].woeid))
    .catch(err => {
      console.log(err);
      p.innerHTML = "Something went wrong. Please try again later.";
    });
};

const getWeather = woeid => {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
  )
    .then(result => result.json())
    .then(data => {
      p.innerHTML = concatWeather(data);
    })
    .catch(err => {
      console.log(err);
      p.innerHTML = "Something went wrong. Please try again later.";
    });
};

const concatWeather = data => {
  const todaysWeather = data.consolidated_weather[0];
  const weather = todaysWeather.weather_state_name;
  const pred = todaysWeather.predictability;
  const high = parseInt(todaysWeather.max_temp);
  const low = parseInt(todaysWeather.min_temp);
  const windspeed = parseInt(todaysWeather.wind_speed);
  const winddir = todaysWeather.wind_direction_compass;

  return `<h3>Location: ${data.title}, ${
    data.parent.title
  }</h3> <br> Weather: ${weather} <br> High Temp: ${(high * 9) / 5 +
    32} &#8457; <br> Low Temp: ${(low * 9) / 5 +
    32} &#8457; <br> Wind Speed: ${windspeed} mph<br> Wind Direction: ${winddir} <br> Predictability: ${pred} %`;
};

search.addEventListener("click", () => {
  p.innerHTML = "Loading weather . . .";
  let city = document.getElementById("city").value;
  queryLocation(city);
});

function displayWeather(response) {
  let temperatureElement = document.querySelector(`#temperature`);
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(`#city-name`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let timeElement = document.querySelector(`#time`);
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector(`#icon`);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  console.log(response.data);
  forecastResult(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}am,`;
}

function searchCity(city) {
  let apiKey = `9387af763ce4b20bcfo1t37b0bacd41e`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(`#search-input`);

  searchCity(searchInput.value);
}

function forecastResult(city) {
  let apiKey = `9387af763ce4b20bcfo1t37b0bacd41e`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  console.log(response.data.daily); // show the daily forecast array

  let forecastHtml = "";

  response.data.daily.slice(0, 5).forEach(function (day) {
    let dayName = formatDay(day.time);
    let maxTemp = Math.round(day.temperature.maximum);
    let minTemp = Math.round(day.temperature.minimum);
    let iconUrl = day.condition.icon_url;
    let description = day.condition.description;

    forecastHtml += `
      <div class="weather-app-forecast-day">
        <div class="weather-app-forecast-date">${dayName}</div>
        <div class="weather-app-forecast-icon">
          <img src="${iconUrl}" alt="${description}" />
        </div>
        <div class="weather-app-forecast-temperatures">
          <div class="weather-app-forecast-degree"><strong>${maxTemp}°</strong></div>
          <div class="weather-app-forecast-degree">${minTemp}°</div>
        </div>
      </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  if (forecastElement) {
    forecastElement.innerHTML = forecastHtml;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let searchFormElement = document.querySelector(`#search-form`);
if (searchFormElement) {
  searchFormElement.addEventListener("submit", handleSearchSubmit);
} else {
  console.warn("#search-form not found in the DOM");
}

// perform an initial search and forecast load
searchCity("New York");

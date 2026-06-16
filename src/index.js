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

let searchFormElement = document.querySelector(`#search-form`);
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  function displayTemperature(response) {
    let temperature = Math.round(response.data.temperature.current);
    let city = response.data.city;

    let headingElement = document.querySelector("#current-temperature-value1");
    headingElement.innerHTML = temperature;

    let moderaterain = document.querySelector("#moderate-rain");
    moderaterain.innerHTML = response.data.condition.description;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity} %`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed} km/h`;

    let iconElement = document.querySelector("#current-temperature-icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  }

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let city = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

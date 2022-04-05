function formatDate(date) {
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
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
  let currentDay = days[currentDate.getDay()];
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let displayCurrentDate = document.querySelector("#current-date");
let currentDate = new Date();
displayCurrentDate.innerHTML = formatDate(currentDate);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let changeCity = document.querySelector("h3");
  changeCity.innerHTML = `${cityName}, ${temperature}°C`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  let ApiKey = "089773709a05f5b5eba8ca325c20b058";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showCurrentLocation(response) {
  let currentLocation = document.querySelector(`#current-location`);
  currentLocation.innerHTML = response.data.name;
}

function getPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let ApiKey = "089773709a05f5b5eba8ca325c20b058";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`;

  axios.get(ApiUrl).then(showCurrentLocation);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector(`#location-button`);
locationButton.addEventListener("click", showPosition);

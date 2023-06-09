//Change date to current day and time
function dayTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
    let currentDay = document.querySelector("#current-day");
    let currentTime = document.querySelector("#current-time");
  
    currentDay.innerHTML = `${day}`;
    currentTime.innerHTML = `${hours}:${minutes}`;
  }
  dayTime();
  
  //Show weather of current location
  function showWeather(response) {
    let currentCity = document.querySelector(".currentCity");
    let currentTemp = document.querySelector("#degrees-celcius-temp");
    let currentHumidity = document.querySelector("#humidity-value");
    let currentWind = document.querySelector("#wind-value");
    let weatherDescription = document.querySelector("#description");
  
    let temperature = Math.round(response.data.main.temp);
    let humidity = Math.round(response.data.main.humidity);
    let wind = Math.round(response.data.wind.speed);
    let description = response.data.weather[0].description;
  
    currentCity.innerHTML = response.data.name;
    currentTemp.innerHTML = temperature;
    currentHumidity.innerHTML = humidity;
    currentWind.innerHTML = wind;
    weatherDescription.innerHTML = description;
  }
  
  function retrievePosition(position) {
    let apiKey = "6e4f1a7a1140d6ca523a88618d523748";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  
  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  let currentButton = document.querySelector("#location-button");
  currentButton.addEventListener("click", currentLocation);
  
  //Change city to new searched city
  function searchCity() {
    let searchInput = document.querySelector("#city-input");
    let newCity = document.querySelector("#searched-city");
    let formatCity = searchInput.value.toLowerCase();
    formatCity = formatCity.charAt(0).toUpperCase() + formatCity.slice(1);
    newCity.innerHTML = `${formatCity}`;
  
    return formatCity;
  }
  let search = document.querySelector("#search-city");
  search.addEventListener("click", searchCity);
  
  // get weather for a searched city
  function cityWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let humidity = Math.round(response.data.main.humidity);
    let wind = Math.round(response.data.wind.speed);
    let description = response.data.weather[0].description;
  
    let cityTemperature = document.querySelector("#degrees-celcius-temp");
    let cityHumidity = document.querySelector("#humidity-value");
    let cityWind = document.querySelector("#wind-value");
    let cityDescription = document.querySelector("#description");
  
    cityTemperature.innerHTML = temperature;
    cityHumidity.innerHTML = humidity;
    cityWind.innerHTML = wind;
    cityDescription.innerHTML = description;
  }
  
  function getWeather(event) {
    event.preventDefault();
    let city = searchCity();
    let apiKey = "6e4f1a7a1140d6ca523a88618d523748";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(cityWeather);
  }
  let weather = document.querySelector("#search-city");
  weather.addEventListener("click", getWeather);
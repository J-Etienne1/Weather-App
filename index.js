import apiKey from "./config.js";
console.log(apiKey);

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the search box, search button, and weather icon elements from the HTML document
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Define an asynchronous function to check the weather for a given city
async function checkWeather(city) {
  // Fetch data from the OpenWeatherMap API for the given city
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  // Check if the response status is 404, indicating an invalid city name
  if (response.status === 404) {
    // If the city name is invalid, show the error message and hide the weather information
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // If the city name is valid, parse the response data as JSON
    var data = await response.json();

    // Update the weather information in the HTML document with data from the API
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update the weather icon based on the current weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Show the weather information and hide the error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Add an event listener to the search button to call the checkWeather function when clicked
searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

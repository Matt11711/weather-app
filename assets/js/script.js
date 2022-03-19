https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=61d65336c26f3aab8d79e21de8c8e05c
http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=61d65336c26f3aab8d79e21de8c8e05c

var currentWeatherEl = document.querySelector("#current-weather")
var dailyForecastEl = document.querySelector("#daily-forecast")
var savedCitiesEl = document.querySelector("#saved-cities")
var getLatLon = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=61d65336c26f3aab8d79e21de8c8e05c";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          getWeather(data[0].lat, data[0].lon);
        })} else {
        alert('Error: City Not Found');
      }
    });
  };


var getWeather = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=61d65336c26f3aab8d79e21de8c8e05c";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          todayWeather(data)
          dailyForecast(data)
        })} else {
        alert('Error: City Not Found');
      }
    });
  };

function todayWeather(data) {
var weatherTitle = document.createElement("h2")

}

getLatLon('london')
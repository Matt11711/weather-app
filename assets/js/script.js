
var currentWeatherEl = document.querySelector("#current-weather")
var dailyForecastEl = document.querySelector("#daily-forecast")
var savedCitiesEl = document.querySelector("#saved-cities")
var searchButton = document.querySelector("#search-button")
cityArray = []

var getLatLon = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=61d65336c26f3aab8d79e21de8c8e05c";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          getWeather(data[0].lat, data[0].lon,city);
        })} else {
        alert('Error: City Not Found');
      }
    });
  };


var getWeather = function(lat,lon,city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=61d65336c26f3aab8d79e21de8c8e05c";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
            currentWeatherEl.innerHTML=""
    dailyForecastEl.innerHTML = ""
          todayWeather(data,city)
          dailyForecast(data)
          saveSearch(city)
        })} else {
        alert('Error: City Not Found');
      }
    });
  };

function todayWeather(data,city) {
var weatherTitle = document.createElement("h2")
var temp = document.createElement("p")
var wind = document.createElement("p")
var humidity = document.createElement("p")
var uv = document.createElement("p")
console.log(data.current.dt)
var currentDate = new Date(data.current.dt*1000)
console.log(currentDate)
weatherTitle.innerHTML = city +" (" + (currentDate.getMonth()+1)+ "/"+currentDate.getDate() + "/"+currentDate.getFullYear()+ ")" + "<img src=' http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png'/>"
currentWeatherEl.appendChild(weatherTitle)

temp.textContent = "Temp: " + data.current.temp + "°F"
currentWeatherEl.appendChild(temp)
wind.textContent = "Wind: " + data.current.wind_speed + " MPH"
currentWeatherEl.appendChild(wind)
humidity.textContent = "Humidity: " + data.current.humidity + " %"
currentWeatherEl.appendChild(humidity)
uv.textContent = "UV Index: " 
var uvDataEl = document.createElement("span")
var uvData = data.current.uvi
uvDataEl.textContent = uvData
if (uvData<3) {
uvDataEl.classList.add("bg-success")
}
else if (uvData<6) {
    uvDataEl.classList.add("bg-warning")
}
else {
    uvData.classList.add("bg-danger")
}
uv.append(uvDataEl)
currentWeatherEl.appendChild(uv)
}

function dailyForecast(data) {
   var sectionTitle = document.createElement("h3")
   sectionTitle.textContent = "5-Day Forecast:"
   document.querySelector("#weather-container").insertBefore(sectionTitle,dailyForecastEl)
//    dailyForecastEl.appendChild(sectionTitle)
    for (i=1;i<6;i++) {
        var weatherCard = document.createElement("div")
        var currentDate = new Date(data.daily[i].dt*1000)
      
var todayDateEl = document.createElement("h4")
var weatherIcon = document.createElement("img")
var temp = document.createElement("p")
var wind = document.createElement("p")
var humidity = document.createElement("p")
todayDateEl.textContent = (currentDate.getMonth()+1)+ "/"+currentDate.getDate() + "/"+currentDate.getFullYear()

weatherCard.appendChild(todayDateEl)
weatherIcon.src= "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"
weatherCard.appendChild(weatherIcon)
temp.textContent = "Temp: " + data.current.temp + "°F"
weatherCard.appendChild(temp)
wind.textContent = "Wind: " + data.current.wind_speed + " MPH"
weatherCard.appendChild(wind)
humidity.textContent = "Humidity: " + data.current.humidity + " %"
weatherCard.appendChild(humidity)
weatherCard.classList.add("col-2")
weatherCard.classList.add("bg-primary")
        dailyForecastEl.appendChild(weatherCard)
    }
}

function saveSearch(city) {
   
    
    cityArray.push(city)
    localStorage.setItem("city",JSON.stringify(cityArray))
}

function addSavedCity(city) {
    var cityEl = document.createElement("p")
    cityEl.textContent=city
    savedCitiesEl.appendChild(cityEl)
}
function loadSavedCities() {
var savedCities = JSON.parse(localStorage.getItem("city"))

if (savedCities) {
    cityArray = savedCities
for (i=0;i<savedCities.length;i++) {
    addSavedCity(savedCities[i])
}
}
}
searchButton.onclick = function(event){
    event.preventDefault();
    var cityName = document.querySelector("#city-name-input").value
    addSavedCity(cityName)
    
    getLatLon(cityName)
    document.querySelector("#city-name-input").value=''
}
savedCitiesEl.onclick = function(event) {
    getLatLon(event.target.textContent)
}
loadSavedCities()
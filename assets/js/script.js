
// let weatherInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataLat}&lon=${dataLon}&exclude=&appid=6212f09690f4fd274b9ba1da9141cbaa`
// let locationInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=&appid=6212f09690f4fd274b9ba1da9141cbaa`
let inputField = document.querySelector(".input");
let searchBtn = document.querySelector(".button");
let savedCity = document.querySelector(".city-searched");
let foundCity = document.querySelector(".found-city")
let unixDate = document.querySelector(".unixDate")
let cityTemp = document.querySelector(".temp")
let cityWind = document.querySelector(".wind")
let cityHumid = document.querySelector(".humid")
let cityUvi = document.querySelector(".uvi")

// local storage saving searched city
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let savedSearchedCity = localStorage.getItem("searchedCity");
    console.log(savedSearchedCity)
    let searchedCity = [];
    if (savedSearchedCity === null) {
        searchedCity = [];

    } else {
        searchedCity = JSON.parse(localStorage.getItem("searchedCity"));

    }
    let input = inputField.value
    searchedCity.push(input);
    localStorage.setItem("searchedCity", JSON.stringify(searchedCity));

showSearched();
getLatLon(input);
})

// displayed saved city 
function showSearched() {
    let searched = JSON.parse(localStorage.getItem("searchedCity"))? JSON.parse(localStorage.getItem("searchedCity")):[];
    searched.forEach(function (data) {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.setAttribute("class", "recentCity");
        button.textContent = data;
        li.append(button);
        savedCity.append(li);
    });
        
}

function getLatLon(city){
    let locationInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=&appid=6212f09690f4fd274b9ba1da9141cbaa`
    fetch(locationInfo)
        .then(function(response){
            return response.json();
        }) 
        .then(function(data){
        console.log(data[0].lat)
        console.log(data[0].lon)
        getCity(data[0].lat, data[0].lon)
        })       
}

function getCity(dataLat, dataLon){
    let weatherInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataLat}&lon=${dataLon}&exclude=&units=imperial&appid=6212f09690f4fd274b9ba1da9141cbaa`
    fetch(weatherInfo)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
        console.log(data.current);
        currentWeather(data.current);
        futureWeather(data.daily);
        })
}

function currentWeather(current){
    // foundCity.textContent = input;
    console.log(inputField.value)
    cityTemp.textContent = current.temp;
    console.log(current.temp)
    cityWind.textContent = current.wind_speed;
    console.log(current.wind_speed)
    cityHumid.textContent = current.humidity
    console.log(current.humidity)
    cityUvi.textContent = current.uvi
    console.log(current.uvi)
    // unixDate.textContent = current.dt
    console.log(current.dt)
    console.log(current.weather) // shows an array
}

function futureWeather(daily){ //for loop
    console.log(daily[1].temp)
    console.log(daily[2].wind_speed)
    console.log(daily[3].humidity)
    console.log(daily[4])
    console.log(daily[5])

}
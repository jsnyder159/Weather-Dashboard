
// let weatherInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${dataLat}&lon=${dataLon}&exclude=&appid=6212f09690f4fd274b9ba1da9141cbaa`
// let locationInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=&appid=6212f09690f4fd274b9ba1da9141cbaa`
let inputField = document.querySelector(".input");
let searchBtn = document.querySelector(".button");
let savedCity = document.querySelector(".city-searched");


// local storage saving searched city
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let savedSearchedCity = localStorage.getItem("searchedCity");
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
        // on click event listener (getLatLon) passing in data.
        li.append(button);
        savedCity.append(li);
    });
        
}

function getLatLon(city){
    let locationInfo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=6212f09690f4fd274b9ba1da9141cbaa`
    fetch(locationInfo)
        .then(function(response){
            return response.json();
        }) 
        .then(function(data){
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
        currentWeather(data.current);
        futureWeather(data.daily);
        })
}

function currentWeather(current){
    let foundCity = document.querySelector(".city-found");
    let cityTemp = document.querySelector(".temp");
    let cityWind = document.querySelector(".wind");
    let cityHumid = document.querySelector(".humid");
    let cityUvi = document.querySelector(".uvi");
    foundCity.textContent = `${inputField.value} ${moment().format("M/D/YYYY")}`;
    cityTemp.textContent = `Temp: ${current.temp}  °F`;
    cityWind.textContent = `Wind: ${current.wind_speed} MPH`;
    cityHumid.textContent = `Humidity: ${current.humidity} %`;
    cityUvi.textContent = `UV Index: ${current.uvi}`;
    
    // empty IMG src= url on openweather fix w/ icon code

    // console.log(inputField.value)
    // console.log(current.temp)
    // console.log(current.wind_speed)
    // console.log(current.humidity)
    // console.log(current.uvi)
    // console.log(current.dt)
    // console.log(current.weather)
}

function futureWeather(daily){ 
    let fiveDay = document.querySelector(".five")
    fiveDay.textContent = "Five Day Forcast:"
    // let truck = moment date ${moment().format("M/D/YYYY").add(i, "d")
    // for (let i = 1; i< 5; i++) {


    // }
    console.log(daily[4])
    console.log(daily[1].temp.max)
    console.log(daily[2].wind_speed)
    console.log(daily[3].humidity)


}
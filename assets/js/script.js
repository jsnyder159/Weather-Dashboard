let inputField = document.querySelector(".input");
let searchBtn = document.querySelector(".button");
let savedCity = document.querySelector(".city-searched");


// local storage saving searched city
searchBtn.addEventListener("click", function(event) {
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
        removeImg();
        currentWeather(data.current);
        futureWeather(data.daily);
        })
}

function removeImg () {
    document.querySelector("img").remove();
}

function currentWeather(current){
    
    let weatherMain = document.querySelector(".current-main")
    let foundCity = document.querySelector(".city-found");
    let cityTemp = document.querySelector(".temp");
    let cityWind = document.querySelector(".wind");
    let cityHumid = document.querySelector(".humid");
    let cityUvi = document.querySelector(".uvi");
    let weatherIcon = document.createElement('img');

    weatherIcon.src =`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
    weatherMain.append(weatherIcon);
    foundCity.textContent = `${inputField.value} ${moment().format("M/D/YYYY")}`;
    cityTemp.textContent = `Temp: ${current.temp}  °F`;
    cityWind.textContent = `Wind: ${current.wind_speed} MPH`;
    cityHumid.textContent = `Humidity: ${current.humidity} %`;
    cityUvi.textContent = `UV Index: ${current.uvi}`;

}

function futureWeather(daily){ 
    let fiveDay = document.querySelector(".fiveFive");
    let dayFive = document.querySelector(".five");
    fiveDay.textContent = "Five Day Forcast:";
    

    for (let i = 1; i< 6; i++) {

        // let futureDate = document.createElement("h2");
        // futureDate.setAttribute("class", "dateFuture");
        // fiveDay.append(futureDate);
        
        let futureDiv = document.createElement('div');
        let futureTemp = document.createElement("p");
        let futureWind = document.createElement("p");
        let futureHumid = document.createElement("p");
        let weatherIcon = document.createElement('img');

        futureDiv.setAttribute("class", "futureDivBox");
        futureTemp.setAttribute('class', "tempFuture");
        futureWind.setAttribute("class", "windFuture");
        futureHumid.setAttribute("class", "humidFuture");
        weatherIcon.setAttribute("class", "updatedIcon");

        futureTemp.textContent = `Temp: ${daily[i].temp.max} °F`;
        futureDiv.append(futureTemp);
        
        futureWind.textContent = `Wind: ${daily[i].wind_speed} MPH`;
        futureDiv.append(futureWind);

        futureHumid.textContent = `Humidity: ${daily[i].humidity} %`;
        futureDiv.append(futureHumid);

        weatherIcon.src = `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`;

        dayFive.append(futureDiv);
        futureDiv.append(weatherIcon);
    }
}

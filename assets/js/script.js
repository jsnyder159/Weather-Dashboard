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
    document.querySelector(".five").innerHTML = ""
}

function currentWeather(current){
    let date = new Date(current.dt * 1000)
    let year = date.getFullYear();
    let day = date.getDay();
    let month = date.getMonth();
    let weatherMain = document.querySelector(".current-main")
    let foundCity = document.querySelector(".city-found");
    let cityTemp = document.querySelector(".temp");
    let cityWind = document.querySelector(".wind");
    let cityHumid = document.querySelector(".humid");
    let cityUvi = document.querySelector(".uvi");
    let weatherIcon = document.createElement('img');

    weatherIcon.src =`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
    weatherMain.append(weatherIcon);
    foundCity.textContent = `${month}/${day}/${year}`;
    cityTemp.textContent = `Temp: ${current.temp}  °F`;
    cityWind.textContent = `Wind: ${current.wind_speed} MPH`;
    cityHumid.textContent = `Humidity: ${current.humidity} %`;
    cityUvi.textContent = `UV Index: ${current.uvi}`;
    if (current.uvi <= 2){
        document.querySelector(".uvi").style.backgroundColor = "green";
    } else if (current.uvi <= 5){
        document.querySelector(".uvi").style.backgroundColor = "yellow"
    } else {
        document.querySelector(".uvi").style.backgroundColor = "red"
    }

}

function futureWeather(daily){ 
    let fiveDayForcast = document.querySelector(".five-day-forcast");
    let futureForcast = document.querySelector(".five");
    fiveDayForcast.textContent = "Five Day Forcast:";
    

    for (let i = 1; i< 6; i++) {

        let futureDiv = document.createElement('div');
        let futureDate = document.createElement("h2");
        let futureTemp = document.createElement("p");
        let futureWind = document.createElement("p");
        let futureHumid = document.createElement("p");
        let weatherIcon = document.createElement('img');

        futureDate.setAttribute("class", "dateFuture");
        futureDiv.setAttribute("class", "futureDivBox");
        futureTemp.setAttribute('class', "tempFuture");
        futureWind.setAttribute("class", "windFuture");
        futureHumid.setAttribute("class", "humidFuture");
        weatherIcon.setAttribute("class", "updatedIcon");

        let year = new Date(daily[i].dt * 1000).getFullYear();
        let day = new Date(daily[i].dt * 1000).getDay();
        let month = new Date(daily[i].dt * 1000).getMonth();

        futureDate.textContent = `${month}/${day}/${year}`
        futureTemp.textContent = `Temp: ${daily[i].temp.max} °F`;
        futureWind.textContent = `Wind: ${daily[i].wind_speed} MPH`;
        futureHumid.textContent = `Humidity: ${daily[i].humidity} %`;

        weatherIcon.src = `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`;

        futureDiv.append(futureDate);
        futureDiv.append(weatherIcon);
        futureDiv.append(futureTemp);
        futureDiv.append(futureWind);
        futureDiv.append(futureHumid);
        futureForcast.append(futureDiv);

        // append all elements to futureDiv
        // append futureDiv to parent div
    }
}

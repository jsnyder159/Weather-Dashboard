let inputField = document.querySelector(".input");
let searchBtn = document.querySelector(".button");
let savedCity = document.querySelector(".city-searched");
let mainBox = document.querySelector(".box-big")


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

        // on click event listener (getLatLon) passing in data. Allows previously searched city buttons to change name to city.
        li.append(button);
        savedCity.append(li);
        button.addEventListener("click", function(){
            getLatLon(data)
            inputField.value = data
            console.log(inputField)
        })
    });
        
}

// Takes in the city and runs it through the openweather API giving me the Lat and Lon for the city searched and runs getcity with the lat lon.
function getLatLon(city){
    let locationInfo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=&appid=6212f09690f4fd274b9ba1da9141cbaa`
    fetch(locationInfo)
        .then(function(response){
            return response.json();
        }) 
        .then(function(data){
        getCity(data[0].lat, data[0].lon)
        })       
}

// Takes in the Lat and Lon giving me all the information needed for the weather for the previously searched city, and plugs that info into other functions.
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

// Clears information from the area's selected so the next search city can populate.
function removeImg () {
    document.querySelector(".current-main").innerHTML = ""
    document.querySelector(".five").innerHTML = ""
}

// Creates an tags and appends the information taken from the getCity function.
function currentWeather(current){
    // Gives current data 
    let date = new Date(current.dt * 1000)
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();
    let weatherMain = document.querySelector(".current-main")

    //Creates elements in HTML
    let weatherIcon = document.createElement('img');
    let foundCity = document.createElement("h2");
    let cityTemp = document.createElement("p");
    let cityWind = document.createElement("p");
    let cityHumid = document.createElement("p");
    let cityUvi = document.createElement("p");

    //Gives classes to elements created in HTML
    foundCity.setAttribute("class", "city-found");
    cityTemp.setAttribute("class", "temp");
    cityWind.setAttribute("class", "wind");
    cityHumid.setAttribute("class", "humid");
    cityUvi.setAttribute("class", "uvi");
    weatherIcon.src =`https://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
    
    // Appends all of the elements to the div
    weatherMain.append(foundCity);
    weatherMain.append(weatherIcon);
    weatherMain.append(cityTemp);
    weatherMain.append(cityWind);
    weatherMain.append(cityHumid);
    weatherMain.append(cityUvi);

    // Displays the information from the getCity function
    foundCity.textContent = `${inputField.value} ${month}/${day}/${year}`;
    cityTemp.textContent = `Temp: ${current.temp}  °F`;
    cityWind.textContent = `Wind: ${current.wind_speed} MPH`;
    cityHumid.textContent = `Humidity: ${current.humidity} %`;
    cityUvi.textContent = `UV Index: ${current.uvi}`;

    // Changes color of UVI background when the # hits certain marks.
    if (current.uvi <= 2){
        document.querySelector(".uvi").style.backgroundColor = "green";
    } else if (current.uvi <= 5){
        document.querySelector(".uvi").style.backgroundColor = "yellow"
    } else {
        document.querySelector(".uvi").style.backgroundColor = "red"
    }

}

//Creates information for the 5 day forcast
function futureWeather(daily){ 
    let fiveDayForcast = document.querySelector(".five-day-forcast");
    let futureForcast = document.querySelector(".five");
    fiveDayForcast.textContent = "Five Day Forcast:";
    
    // For loop to add 5 seperate boxes for the 5 days needed for a 5 day forcast.
    for (let i = 0; i< 5; i++) {
        
        // Adds elements to the HTML
        let futureDiv = document.createElement('div');
        let futureDate = document.createElement("h2");
        let futureTemp = document.createElement("p");
        let futureWind = document.createElement("p");
        let futureHumid = document.createElement("p");
        let weatherIcon = document.createElement('img');

        // Adds classes to previously added elements
        futureDate.setAttribute("class", "dateFuture");
        futureDiv.setAttribute("class", "futureDivBox");
        futureTemp.setAttribute('class', "tempFuture");
        futureWind.setAttribute("class", "windFuture");
        futureHumid.setAttribute("class", "humidFuture");
        weatherIcon.setAttribute("class", "updatedIcon");

        // Displays date for the future 5 days adding 1 for each time the for loop is run.
        let date = new Date(daily[i].dt * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate() +1;

        // Displays the information taken from the getCity function
        futureDate.textContent = `${month}/${day}/${year}`
        futureTemp.textContent = `Temp: ${daily[i].temp.max} °F`;
        futureWind.textContent = `Wind: ${daily[i].wind_speed} MPH`;
        futureHumid.textContent = `Humidity: ${daily[i].humidity} %`;

        // Displays the icon for associated weather type.
        weatherIcon.src = `https://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`;

        // Appends previously created elements to the main Div.
        futureDiv.append(futureDate);
        futureDiv.append(weatherIcon);
        futureDiv.append(futureTemp);
        futureDiv.append(futureWind);
        futureDiv.append(futureHumid);
        futureForcast.append(futureDiv);
    }
}

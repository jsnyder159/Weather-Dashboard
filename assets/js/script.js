
let weatherInfo = "https://api.openweathermap.org/data/2.5/onecall?lat=&lon={lon}&exclude={part}&appid={6212f09690f4fd274b9ba1da9141cbaa}"
let locationInfo = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={6212f09690f4fd274b9ba1da9141cbaa}"
let inputField = document.querySelector(".input")
let searchBtn = document.querySelector(".button")
let savedCity = document.querySelector(".city-searched")

// function savedSearch() {
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let savedSearchedCity = localStorage.getItem("searchedCity");
    console.log(savedSearchedCity)
    let searchedCity = []
    if (savedSearchedCity === null) {
        searchedCity = []

    } else {
        searchedCity = JSON.parse(localStorage.getItem("searchedCity"));

    }
    let input = inputField.value
    searchedCity.push(input);
    localStorage.setItem("searchedCity", JSON.stringify(searchedCity));

showSearched();
})


function showSearched() {
    let searched = JSON.parse(localStorage.getItem("searchedCity"));
    searched.forEach(function (i) {
        let li = document.createElement("li");
        li.textContent = i
        savedCity.append(li)
    })
}

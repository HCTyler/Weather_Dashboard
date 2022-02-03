var APIKey = "6597c239dc318b2df8682f417cd75416"

//DOM elements
var cityInput= document.getElementById("cityInput")
var searchButton= document.getElementById("searchButton")
var searchHistory= document.getElementById("searchHistory")
var clearButton= document.getElementById("clearButton")
var weatherContainer= document.getElementById("weatherContainer")
var weather= document.getElementById("weather")
var forcast= document.getElementById("forcast")
var searchStored= JSON.parse(localStorage.getItem("historyStored")) || []

searchButton.addEventListener("click", function(){
    const searchedCity= cityInput.value
    searchStored.push(searchedCity)
    localStorage.setItem("historyStored",JSON.stringify(searchStored))
    console.log(searchStored)

})

function renderHistory(){
    console.log(searchStored)
}
const APIKey = "6597c239dc318b2df8682f417cd75416"

//DOM elements
var cityInput= document.getElementById("cityInput")
var searchButton= document.getElementById("searchButton")
var searchHistory= document.getElementById("searchHistory")
var clearButton= document.getElementById("clearButton")
var weatherContainer= document.getElementById("weatherContainer")
var weather= document.getElementById("weather")
var forcast= document.getElementById("forcast")
var searchedCity=[]
var searchStored= JSON.parse(localStorage.getItem("historyStored")) || []


//taking searched items and storing it in local storage
searchButton.addEventListener("click", function(){
    searchedCity= cityInput.value
    searchStored.push(searchedCity)
    console.log(searchStored,"Variable with empty Array, check filled")
    localStorage.setItem("historyStored",JSON.stringify(searchStored))
    console.log(searchStored)
    renderHistory()
})
clearButton.addEventListener("click",function(){
    localStorage.clear()
    searchStored= []
    renderHistory()
})

function renderHistory(){
    console.log(searchedCity)
    searchHistory.innerHTML= ""

    for(var i=searchStored.length; i>=0; i--){
        var renderedHistory= document.createElement("button")
        renderedHistory.setAttribute("type","text")
        renderedHistory.setAttribute("class","form-control d-block bg-white")
        renderedHistory.textContent= searchStored[i]
        console.log(renderHistory)
        searchHistory.append(renderedHistory)
    }
}

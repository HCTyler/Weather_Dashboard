const APIKey = "6597c239dc318b2df8682f417cd75416"

//DOM elements
var cityInput= document.getElementById("cityInput")
var searchButton= document.getElementById("searchButton")
var searchHistory= document.getElementById("searchHistory")
var clearButton= document.getElementById("clearButton")
var form= document.getElementById("form")
var weatherToday= document.getElementById("weatherToday")
var forcast= document.getElementById("forcast")
var cityTitle= document.getElementById("cityTitle")
// var weatherPix= document.getElementById("weatherPix")
// var temperature= document.getElementById("temperature")
// var wind= document.getElementById("wind")
// var humidity= document.getElementById("humidity") 
var searchedCity=[]
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function displayPast(){
    var pastSearched = localStorage.getItem("search-history")
    if (pastSearched) {
        searchedCity = JSON.parse(pastSearched)
    }
    renderHistory()
}
function renderHistory(){
    console.log(searchedCity)
    searchHistory.innerHTML= ""

    for(var i=searchStored.length -1; i>=0; i--){
        const renderedHistory= document.createElement("button")
        renderedHistory.setAttribute("type","text")
        renderedHistory.setAttribute("aria-control","today forecast")
        renderedHistory.classList.add("history-btn", "btn-history")
        renderedHistory.textContent= searchStored[i]
        renderedHistory.setAttribute("data-search", searchedCity[i])
        renderedHistory.textContent= searchedCity[i]
        searchHistory.append.apply(renderedHistory)

    }
}
function appendSeach(search){
    if(searchedCity.indexOf(search) !==1){
        return
    }
    searchedCity.push(search)
    localStorage.setitem("seach-history",JSON.stringify(searchedCity))
    renderHistory()
}
function renderToday(city, weather,timezone){
    var date= dayjs().tz(timezone).formar("M/D/YYYY")

    var tempF = weather.temp;
    var windMph = weather.wind_speed;
    var humidity = weather.humidity;
    var uvi = weather.uvi;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvEl = document.createElement('p');
    var uviBadge = document.createElement('button');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);

    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    heading.textContent = `${city} (${date})`;

    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempEl.textContent = `Temp: ${tempF}°F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, tempEl, windEl, humidityEl);

    uvEl.textContent = 'UV Index: ';
    uviBadge.classList.add('btn', 'btn-sm');

    if (uvi < 3) {
        uviBadge.classList.add('btn-success');
    } else if (uvi < 7) {
        uviBadge.classList.add('btn-warning');
    } else {
        uviBadge.classList.add('btn-danger');
    }

    uviBadge.textContent = uvi;
    uvEl.append(uviBadge);
    cardBody.append(uvEl);

    weatherToday.innerHTML = '';
    weatherToday.append(card);
}

// displayPast()
// searchHistory.addEventListener("click",clickHistory)
// clearButton.addEventListener("click",function(){
//     localStorage.clear()
//     searchStored= []
//     renderHistory()
// })

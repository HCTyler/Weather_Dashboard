const APIKey = "6597c239dc318b2df8682f417cd75416"
var searchedCity=[]

//DOM elements
var cityInput= document.getElementById("cityInput")
var searchButton= document.getElementById("searchButton")
var searchHistory= document.getElementById("searchHistory")
var clearButton= document.getElementById("clearButton")
var formInput= document.getElementById("formInput")
var weatherToday= document.getElementById("weatherToday")
var forcast= document.getElementById("forcast")


dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function renderHistory(){
    searchHistory.innerHTML= ""

    for (var i = searchedCity.length - 1; i>=0; i--){
        var renderedHistory= document.createElement("button")
        renderedHistory.setAttribute("type","button")
        renderedHistory.setAttribute("aria-control","today forecast")
        renderedHistory.classList.add("history-btn", "btn-history")
        renderedHistory.setAttribute("data-search", searchedCity[i])
        renderedHistory.textContent= searchedCity[i]
        searchHistory.append.apply(renderedHistory)

    }
}
function appendSeach(search){
    if(searchedCity.indexOf(search) !== 1){
        return
    }
    searchedCity.push(search)

    localStorage.setitem("seach-history",JSON.stringify(searchedCity))
    renderHistory()
}

function displayPast(){
    var pastSearched = localStorage.getItem("search-history")
    if (pastSearched) {
        searchedCity = JSON.parse(pastSearched)
    }
    renderHistory()
}


function renderToday(city, weather,timezone){
    var date= dayjs().tz(timezone).format("M/D/YYYY")

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
function renderCard(forecast,timezone){
    var unixTs = forecast.dt;
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var tempF = forecast.temp.day;
    var { humidity } = forecast;
    var windMph = forecast.wind_speed;
  
    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
  
    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
  
    col.setAttribute('class', 'col-md');
    col.classList.add('five-day-card');
    card.setAttribute('class', 'card bg-primary h-100 text-white');
    cardBody.setAttribute('class', 'card-body p-2');
    cardTitle.setAttribute('class', 'card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
  

    cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    tempEl.textContent = `Temp: ${tempF} °F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    forcast.append(col)
    console.log("this works?!?!")
}
function renderForecast(dailyForecast,timezone){
    var startDate= dayjs().tz(timezone).add(1,"day").startOf("day").unix()
    var endDate= dayjs().tz(timezone).add(6,"day").startOf("day").unix()

    var forecastContainer= document.createElement("div")
    var heading= document.createElement("h4")
    forecastContainer.setAttribute("class","col-12")
    heading.textContent= "8-Day Forecast"
    console.log("Is this doing to append?! I don't ******* know")
    forecastContainer.append(heading)

    forcast.innerHTML= ""
    console.log("Is this leading here?, I don't ******* know")
    forcast.append(forecastContainer)
    console.log(dailyForecast.length)
    for (var i= 0; i< dailyForecast.length; i++){
        if(dailyForecast[i].dt >= startDate && dailyForecast[i]< endDate){
        renderCard(dailyForecast[i],timezone)
        }
        renderCard(dailyForecast[i],timezone)
    }
}
function renderStuff(city,data){
    renderToday(city, data.current, data.timezone)
    renderForecast(data.daily, data.timezone)
}
function getWeather(location){
    var {lat}= location
    var {lon}= location
    var city= location.name
    var weatherAPI= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`

    fetch(weatherAPI)
        .then(function(res){
            return res.json()
        })
        .then(function (data){
            renderStuff(city, data)
        })
        .catch(function(err){
            console.log(err)
        })
}
function getLocation(search){
    var weatherAPI= `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`

    fetch(weatherAPI)
        .then(function(res){
            return res.json()
        })
        .then(function (data){
            if (!data[0]) {
                alert("Location not found")
            } else {
                appendSeach(search)
                getWeather(data[0])
            }
        })
        .catch(function(err){
            console.error(err)
        })
}
function formEvent(e) {
    if(!cityInput.value){
        return
    }
    e.preventDefault()
    var search= cityInput.value.trim()
    getLocation(search)
    cityInput.value= ""
}
function clickHistory(e){
    if(!e.target.matches(".btn-history")) {
        return
    }
    var check= e.target
    var search= check.getAttribute("data-search")
    getLocation(search)
}



displayPast()
formInput.addEventListener("submit",formEvent)
searchHistory.addEventListener("click",clickHistory)

clearButton.addEventListener("click",function(){
    localStorage.clear()
    searchStored= []
    renderHistory()
})

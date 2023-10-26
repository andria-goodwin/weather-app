var apiKey = '76d5f9c2445ef51bea05282eb7396b3b';
var userInput = $('#user-input');
var searchBtn = $('#search-btn');
var currentIconEl = $('#current-icon');
var icon1El = $('#icon-1');
var icon2El = $('#icon-2');
var icon3El = $('#icon-3');
var icon4El = $('#icon-4');
var icon5El = $('#icon-5');

var searchHistory = [];

function historySearch(cityName) {
  // fetch request gets a list of all the repos for the node.js organization
  var geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + apiKey;

  fetch(geocoding)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var lat = data[0].lat;
      var lon = data[0].lon;
      getCurrentWeather(lat, lon)
      getForecast(lat, lon);
    });

  $('#city-name').text('Results for ' + cityName);
}

function getHistory() {
  var storedHistory = localStorage.getItem('history');

  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }

  for (var i = 0; i < searchHistory.length; i++) {
    var historyBtn = document.createElement('button');
    historyBtn.textContent = searchHistory[i];
    historyBtn.setAttribute('class', 'history-btn');
    $('#storage').append(historyBtn);
  }
}

getHistory();

function btnClick(e) {
    if (!e.target.matches('.history-btn')) {
      return;
    }

    var btn = e.target.textContent;
    console.log(btn);

    historySearch(btn);
}

function getGeocoding() {
    // fetch request gets a list of all the repos for the node.js organization
    var geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput.val() + '&appid=' + apiKey;

    searchHistory.push(userInput.val());
    console.log(searchHistory);
    localStorage.setItem('history', JSON.stringify(searchHistory));

    $('#storage').empty();
    getHistory();

    fetch(geocoding)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var lat = data[0].lat;
        var lon = data[0].lon;
        getCurrentWeather(lat, lon)
        getForecast(lat, lon);
      });

    $('#city-name').text('Results for ' + userInput.val());
}

function getCurrentWeather(lat, lon) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&units=imperial&appid=' + apiKey;


  fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        // current weather data
        var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        var windSpeed = data.wind.speed;
        var humidity = data.main.humidity;
        var temperature = data.main.temp;
        var description = data.weather[0].main
        console.log(windSpeed, humidity, temperature, description);
        

        $('#current-date').text(dayjs().format('[Today] M/D'));
        $('#current-ws').text('Wind: ' + windSpeed + ' mph');
        $('#current-hum').text('Humidity: ' + humidity + '%');
        $('#current-temp').text('Temp: ' + temperature + '°F');
        $('#current-main').text(description);
        currentIconEl.attr('src', iconUrl);
      });
}

function getForecast(lat, lon) {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon + '&units=imperial&appid=' + apiKey;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        // forecast day 1
        var iconUrl1 = `https://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`;
        var windSpeed1 = data.list[4].wind.speed;
        var humidity1 = data.list[4].main.humidity;
        var temperature1 = data.list[4].main.temp;
        var description1 = data.list[4].weather[0].main
        
        $('#date-1').text(dayjs().add(1, 'day').format('dddd M/D'));
        $('#ws-1').text('Wind: ' + windSpeed1 + ' mph');
        $('#hum-1').text('Humidity: ' + humidity1 + '%');
        $('#temp-1').text('Temp: ' + temperature1 + '°F');
        $('#main-1').text(description1);
        icon1El.attr('src', iconUrl1);

        // forecast day 2
        var iconUrl2 = `https://openweathermap.org/img/w/${data.list[12].weather[0].icon}.png`;
        var windSpeed2 = data.list[12].wind.speed;
        var humidity2 = data.list[12].main.humidity;
        var temperature2 = data.list[12].main.temp;
        var description2 = data.list[12].weather[0].main
        
        $('#date-2').text(dayjs().add(2, 'day').format('dddd M/D'));
        $('#ws-2').text('Wind: ' + windSpeed2 + ' mph');
        $('#hum-2').text('Humidity: ' + humidity2 + '%');
        $('#temp-2').text('Temp: ' + temperature2 + '°F');
        $('#main-2').text(description2);
        icon2El.attr('src', iconUrl2);

        // forecast day 3
        var iconUrl3 = `https://openweathermap.org/img/w/${data.list[20].weather[0].icon}.png`;
        var windSpeed3 = data.list[20].wind.speed;
        var humidity3 = data.list[20].main.humidity;
        var temperature3 = data.list[20].main.temp;
        var description3 = data.list[20].weather[0].main
        
        $('#date-3').text(dayjs().add(3, 'day').format('dddd M/D'));
        $('#ws-3').text('Wind: ' + windSpeed3 + ' mph');
        $('#hum-3').text('Humidity: ' + humidity3 + '%');
        $('#temp-3').text('Temp: ' + temperature3 + '°F');
        $('#main-3').text(description3);
        icon3El.attr('src', iconUrl3);

        // forecast day 4
        var iconUrl4 = `https://openweathermap.org/img/w/${data.list[28].weather[0].icon}.png`;
        var windSpeed4 = data.list[28].wind.speed;
        var humidity4 = data.list[28].main.humidity;
        var temperature4 = data.list[28].main.temp;
        var description4 = data.list[28].weather[0].main
        
        $('#date-4').text(dayjs().add(4, 'day').format('dddd M/D'));
        $('#ws-4').text('Wind: ' + windSpeed4 + ' mph');
        $('#hum-4').text('Humidity: ' + humidity4 + '%');
        $('#temp-4').text('Temp: ' + temperature4 + '°F');
        $('#main-4').text(description4);
        icon4El.attr('src', iconUrl4);

        // forecast day 5
        var iconUrl5 = `https://openweathermap.org/img/w/${data.list[36].weather[0].icon}.png`;
        var windSpeed5 = data.list[36].wind.speed;
        var humidity5 = data.list[36].main.humidity;
        var temperature5 = data.list[36].main.temp;
        var description5 = data.list[36].weather[0].main
        
        $('#date-5').text(dayjs().add(5, 'day').format('dddd M/D'));
        $('#ws-5').text('Wind: ' + windSpeed5 + ' mph');
        $('#hum-5').text('Humidity: ' + humidity5 + '%');
        $('#temp-5').text('Temp: ' + temperature5 + '°F');
        $('#main-5').text(description5);
        icon5El.attr('src', iconUrl5);
      
      });
}

searchBtn.click(getGeocoding);
$('#storage').click(btnClick);

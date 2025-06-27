






var search = document.getElementById('search');
var day = document.querySelectorAll('day');
var find = document.getElementById('submit');
var forecast = document.getElementById('forecast');
let gcurrentLocation = '';

const form = document.querySelector('.find-location');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent form reload
    // your custom code here
    console.log('Form submit prevented.');
    getWaetherData(search.value);
});



var weatherData;//current forecast.forecastday  location

find.addEventListener('click', (event) => {
    event.preventDefault();
    getWaetherData(search.value);

})

async function getWaetherData(search = '') {
    console.log('getWaetherData');
    console.log('search' + search);

    let currentLocation = `&q=${search}`
    try {
        if (search == '' || search == null) {

            currentLocation = `&q=${await getUserGeoLocation()} `
            console.log('currentLocation' + currentLocation);

        }

        console.log('currentLocation:' + currentLocation);

        console.log('url:' + `http://api.weatherapi.com/v1/forecast.json?key=33079935279d41dbb4e61533252306${currentLocation}&days=3`);

        let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=33079935279d41dbb4e61533252306${currentLocation}&days=3`)
        console.log('data:', data);

        data = await data.json();
        weatherData = data;
        console.log('weatherData:', weatherData);
        showWeather();

    }
    catch (e) {
        console.log('error getWaetherData:' + e.message);

    }
}


function getDayName(date, format = 'day') {
    let day = new Date(date);
    console.log('day name', day.toLocaleDateString("en-us", { weekday: "long" }));
    console.log('day name', day.toLocaleDateString("en-us", { month: "long" }));
    if (format == 'day') {
        return day.toLocaleDateString("en-us", { weekday: "long" });
    }
    else if (format == 'month') {

        return day.getDate() + day.toLocaleDateString("en-us", { month: "long" });
    }

    return format == 'day' ? day.toLocaleDateString("en-us", { weekday: "long" })
        : day.toLocaleDateString("en-us", { month: "long" });

}

function getWindDirection(wind) {
    if (wind[0].toUpperCase() == 'W')
        return 'Weast'
    else if (wind[0].toUpperCase() == 'E')
        return 'East'
    else if (wind[0].toUpperCase() == 'N')
        return 'North'
    else if (wind[0].toUpperCase() == 'S')
        return 'South'
}


function getUserGeoLocation() {
    console.log('getUserGeoLocation');

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    let gcurrentLocation = position.coords.latitude + ',' + position.coords.longitude;
                    console.log('successCallback: ' + gcurrentLocation);
                    resolve(gcurrentLocation);
                },
                error => {
                    console.error('Geolocation error:', error.message);
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation not supported by this browser.'));
        }
    });
}

function showWeather() {
    let weather = '';
    if (weatherData != null) {
        weather += `<div class="today forecast">
                        <div class="forecast-header" id="today">
                            <div class="day">${getDayName(weatherData.forecast.forecastday[0].date, 'day')}</div>
                            <div class=" date">${getDayName(weatherData.forecast.forecastday[0].date, 'month')}</div>
                            
                        </div> <!-- .forecast-header -->
                        <div class="forecast-content" id="current">
                            <div class="location">${weatherData.location.name}</div>
                            <div class="degree">
                                <div class="num">${weatherData.current.temp_c}<sup>o</sup>C</div>

                                <div class="forecast-icon">
                                    <img src="${weatherData.current.is_day == 1 ? '' : 'https://cdn.weatherapi.com/weather/64x64/night/113.png'}" alt="" width="90">
                                </div>

                            </div>
                            <div class="custom">${weatherData.current.condition.text}</div>
                            <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt=""
                                    width="21" height="21">${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                            <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23"
                                    height="21">${weatherData.current.wind_kph}km/h</span>
                            <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt=""
                                    width="21" height="21"> ${getWindDirection(weatherData.current.wind_dir)} </span>
                        </div>
                    </div>`;
        weather += ` <div class="forecast">
                        <div class="forecast-header">
                            <div class="day">${getDayName(weatherData.forecast.forecastday[1].date, 'day')}</div>
                        </div> <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div class="forecast-icon">
                                <img src="${weatherData.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
                            </div>
                            <div class="degree">${weatherData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${weatherData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                            <div class="custom">${weatherData.forecast.forecastday[1].day.condition.text}</div>
                        </div>
                    </div>`;
        weather += ` <div class="forecast">
                        <div class="forecast-header">
                            <div class="day">${getDayName(weatherData.forecast.forecastday[2].date, 'day')}</div>
                        </div> <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div class="forecast-icon">
                                <img src="${weatherData.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
                            </div>
                            <div class="degree">${weatherData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${weatherData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                            <div class="custom">${weatherData.forecast.forecastday[2].day.condition.text}</div>
                        </div>
                    </div>`;
    }

    forecast.innerHTML = weather;

}





getWaetherData(gcurrentLocation);



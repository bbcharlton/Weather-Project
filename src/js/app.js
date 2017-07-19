import {Http} from './http.js';
import * as ELEMENTS from './elements.js';

window.onload = function() {
    ELEMENTS.SEARCH.addEventListener('click', getWeather);
}

function sanitize(input) {
    let output = input;

    return output.replace(/[&\/\\#+()$~%.'":*?<>{}]/g, '');
}

function getDate() {
    let date  = new Date();
    let day   = date.getDate();
    let month = date.getMonth() + 1;
    let year  = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    } 

    if (month < 10) {
        month = '0' + month;
    } 

    date = month + '/' + day + '/' + year;

    return date;
}

function getWeather() {
    if (sanitize(ELEMENTS.INPUT.value).length != 0) {
        return new Promise(async (resolve, reject) => {
            const KEY     = ''; // <-- Replace with your API key from https://openweathermap.org/
            const URL     = 'http://api.openweathermap.org/data/2.5/weather?q=' + sanitize(ELEMENTS.INPUT.value) + '&units=imperial&appid=' + KEY;

            ELEMENTS.LOADING.style.display = 'block';

            if (ELEMENTS.CONTAINER.style.display == 'block') {
                ELEMENTS.CONTAINER.style.display = 'none';
            }

            let result = await Http.fetchData(URL);

            ELEMENTS.LOADING.style.display        = 'none';
            ELEMENTS.CONTAINER.style.display      = 'block';
            ELEMENTS.NAME.innerHTML               = result["name"];
            ELEMENTS.TEMPERATURE.innerHTML        = result.main.temp.toFixed(0) + '&deg;F';
            ELEMENTS.TEMPERATURE_MORE.innerHTML   = 'Min: '+ result.main.temp_min.toFixed(0) + '&deg;F  -  Max: ' + result.main.temp_max.toFixed(0) + '&deg;F';
            ELEMENTS.WEATHER.innerHTML            = result.weather[0].main + ' - ' + result.weather[0].description + ' - Humidity: ' + result.main.humidity + '%'
            ELEMENTS.DATE.innerHTML               = getDate();
        });
    }
}
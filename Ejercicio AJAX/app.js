const file_name = "data.txt";
const appId = "5d1425ae8401b6d8ea47e6173f61b120";
const kelvin = 273.15;

const boxCountry = document.getElementById("country");
const boxCity = document.getElementById("city");
const form = document.getElementById("weather_form");
const form_alert = document.getElementById("form-alert");

const weather_result = document.getElementById("weather-result");
const city_name = document.getElementById("city_name");
const city_weather = document.getElementById("city_weather");
const max_weather = document.getElementById("max_weather");
const min_weather = document.getElementById("min_weather");

let file_data = [];

form.addEventListener("submit", getWeather);
boxCountry.addEventListener("change", loadCities);
form_alert.style.transition = "3s ease display";
readFile();

function readFile() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", file_name, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var data = JSON.parse(this.responseText);

            file_data = data;
            loadFormData();
        }
    };

    xhttp.send();
}

function loadFormData() {
    var html = `<option value="">-- Seleccione --</option>`;

    file_data.forEach(function(data) {
        html += `<option value="${data.code}">${data.country}</option>`;
    });

    boxCountry.innerHTML = html;

    boxCity.innerHTML = `<option value="">-- Seleccione --</option>`;
}

function loadCities() {
    var country_data = file_data.find(f => f.code == boxCountry.value);

    var html = `<option value="">-- Seleccione --</option>`;

    if (country_data != undefined && country_data != null) {
        country_data.cities.forEach(function(city) {
            html += `<option value="${city}">${city}</option>`;
        });
    }

    boxCity.innerHTML = html;
}

function getWeather(e) {
    e.preventDefault();
    e.stopPropagation();

    var city = boxCity.value;
    var country = boxCountry.value;

    if (city == "" || country == "") {
        form_alert.style.display = "block";
        weather_result.style.display = "none";
    }
    else {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", url, true);

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                var data = JSON.parse(this.responseText);

                loadWeather(data);
                weather_result.style.display = "block";
            }
        };

        xhttp.send();

        form_alert.style.display = "none";
    }
}

function loadWeather(data) {
    console.log(data);

    city_name.innerText = data.name;
    city_weather.innerText = (data.main.temp - kelvin).toFixed(2) + "°C";
    max_weather.innerText = (data.main.temp_max - kelvin).toFixed(2) + "°C";
    min_weather.innerText = (data.main.temp_min - kelvin).toFixed(2) + "°C";
}
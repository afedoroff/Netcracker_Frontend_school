const apiKey = "577b3bd2eec54e5a84a1ae825e746783";
/*
function fetchWeather(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=577b3bd2eec54e5a84a1ae825e746783`
    )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => displayWeather(data));
}*/
//XMLHttpRequest

function fetchWeather(city) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=577b3bd2eec54e5a84a1ae825e746783`);
    xhr.responseType = 'json'
    xhr.onload = () => {
        displayWeather(xhr.response);
    }
    xhr.send();
    xhr.onerror = () => {
        alert("No weather found.");
        throw new Error("No weather found.");
    }
}

function search() {
    fetchWeather(document.querySelector(".search-bar").value);
}

function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, pressure } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${(temp - 273).toFixed()} °C`;
    document.querySelector(".feels_like").innerText = `Feels like: ${(feels_like - 273).toFixed()} °C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity} %`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".pressure").innerText = `Pressure: ${(pressure / 1.333).toFixed()} mmHg`;
}

document.querySelector(".search__button").addEventListener("click", function () {
    search();
});

document.querySelector(".search__button").addEventListener("click", function () {
    search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            search();
        }
    });

fetchWeather("Samara");
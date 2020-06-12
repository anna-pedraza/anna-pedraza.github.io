
//variables
let cityName = document.querySelector(".city-name");
let weatherImg = document.querySelector(".weather-img");
let weatherDescription = document.querySelector(".weather-description");
let tempValue = document.querySelector(".temp-value");

let lat;
let lon;

const KEY = "eea0cfcb64bd4ab6303d456bf5271a7f";

//weather object
const weather = {};

//location ask and api call?
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const API =  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`;

    fetch(API)
    .then(response =>{
        let data = response.json();
        return data;
    })
    //creating properties in weather object.
    .then(function(data) {
weather.city = data.name;
weather.image = data.weather[0].icon;
weather.country = data.sys.country;
weather.description = data.weather[0].description;
weather.tempV = Math.round(data.main.temp - 273.15)*9/5+32; 

   

 

    })
    //UI DISPLAY
    .then(function displayWeather(){
        cityName.innerHTML = `${weather.city}, ${weather.country}`;
        weatherImg.innerHTML = `<img src="icons/${weather.image}.png"/>`;
        weatherDescription.innerHTML = `${weather.description}`
        tempValue.innerHTML =  `${weather.tempV} °F`
            })
    .then(displayWeather())
   
});

}
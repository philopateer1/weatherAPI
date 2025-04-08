const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const apiKey = "f42e68451723484da9c161647251803";

form.addEventListener("submit", async e => {
    e.preventDefault();
    const city = cityInput.value;
    if(city){
        try {
            const data = await getWeather(city);
            displayWeather(data);
        } catch (error) {
            displayError();
        }
        
    }else{
        console.error();
    }
})

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json();
}

function displayWeather(data){
    const cities = data.location ? data.location.name : "Unknown City";
    const countryName = data.location ? data.location.country : "Unknown Country";
    const { temp_c: temperature, condition: { text: condition, icon: icon } } = data.current;

    const weatherElement = document.getElementById("weather");
    weatherElement.classList.remove("noDisplay");
    const h1 = document.getElementById("h1");
    const h2 = document.getElementById("h2");
    const country = document.getElementById("countryName");
    const h3 = document.getElementById("h3");
    const img = document.getElementById("img");
    const weatherInfo = document.getElementById("weather-info");
    h1.textContent = `${cities}`;
    h2.textContent = `Temperature: ${temperature}°C`;
    country.textContent = `the city is from ${countryName}`;
    h3.textContent = `Condition: ${condition}`;
    img.src = icon;
    if(condition.toUpperCase() == "SUNNY" || condition.toUpperCase() == "CLEAR"){
        weatherInfo.classList.remove("partly-cloudy");
        weatherInfo.classList.remove("cloudy");
        weatherInfo.classList.remove("light-snow");
        weatherInfo.classList.remove("light-rain");
        weatherInfo.classList.remove("other");
        weatherInfo.classList.add("sunny")
    }else if (condition.toUpperCase() == "PARTLY CLOUDY"){
        weatherInfo.classList.remove("sunny");
        weatherInfo.classList.remove("cloudy");
        weatherInfo.classList.remove("light-rain");
        weatherInfo.classList.remove("light-snow");
        weatherInfo.classList.remove("other");
        weatherInfo.classList.add("partly-cloudy");
    }else if(condition.toUpperCase() == "LIGHT RAIN"){
        weatherInfo.classList.remove("sunny");
        weatherInfo.classList.remove("partly-cloudy");
        weatherInfo.classList.remove("light-snow");
        weatherInfo.classList.remove("cloudy");
        weatherInfo.classList.remove("other");
        weatherInfo.classList.add("light-rain");
    }else if(condition.toUpperCase() == "CLOUDY"){
        weatherInfo.classList.remove("sunny");
        weatherInfo.classList.remove("partly-cloudy");
        weatherInfo.classList.remove("light-rain");
        weatherInfo.classList.remove("light-snow");
        weatherInfo.classList.remove("other");
        weatherInfo.classList.add("cloudy");
    }else if(condition.toUpperCase() == "LIGHT SNOW"){
        weatherInfo.classList.remove("sunny");
        weatherInfo.classList.remove("partly-cloudy");
        weatherInfo.classList.remove("light-rain");
        weatherInfo.classList.remove("cloudy");
        weatherInfo.classList.remove("other");
        weatherInfo.classList.add("light-snow");
    }else{
        weatherInfo.classList.remove("sunny");
        weatherInfo.classList.remove("partly-cloudy");
        weatherInfo.classList.remove("light-rain");
        weatherInfo.classList.remove("cloudy");
        weatherInfo.classList.remove("light-snow");
        weatherInfo.classList.add("other");
    }
}
function displayError(){
    const weatherElement = document.getElementById("weather");
    weatherElement.classList.remove("noDisplay");
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.classList.remove("sunny");
    weatherInfo.classList.remove("partly-cloudy");
    weatherInfo.classList.remove("cloudy");
    weatherInfo.classList.remove("light-rain");
    weatherInfo.classList.remove("light-snow")
    weatherInfo.classList.add("error");
    const h1 = document.getElementById("h1");
    const h2 = document.getElementById("h2");
    const country = document.getElementById("countryName");
    const h3 = document.getElementById("h3");
    const img = document.getElementById("img");
    h1.textContent = "Error";
    h2.textContent = "invalid city input";
    country.textContent = "";
    h3.textContent = "";
    img.src = "";
}
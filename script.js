const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "5e47fb65627e78fe755df84a8a46c0e4";
const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const current_weather = document.querySelector(".current_weather");
const bgvideo = document.querySelector(".bgvideo source");
const weather_video = {
    bgvideo:"videos/bgvideo1.mp4",
    Clouds: "videos/cloudy2.mp4",
    Clear: "videos/clear2.mp4",
    Drizzle: "videos/drizzle2.mp4",
    Mist: "videos/mist2.mp4",
    Rain: "videos/rain3.mp4",
    Snow: "videos/snow2.mp4",
    Haze: "videos/mist2.mp4"
}

async function checkweather(city){
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        bgvideo.src = weather_video["bgvideo"]
        document.querySelector(".bgvideo").load();
    }
    else{
        var data = await response.json();
        const weatherCondition = data.weather[0].main;
        console.log(`${weatherCondition} -> weather Condition`)
    console.log(data);

    document.querySelector(".weather_status").innerHTML = data.weather[0].main
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    
    if(data.weather[0].main == "Clouds"){
        current_weather.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        current_weather.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        current_weather.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        current_weather.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        current_weather.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        current_weather.src = "images/snow.png";
    }

    bgvideo.src = weather_video[weatherCondition]
    document.querySelector(".bgvideo").load();

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }
}

searchBtn.addEventListener("click", () => {
    checkweather(search.value);
})
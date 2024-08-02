const apiKey  = 'DR3FUXSQ7A8DZKXDY73765JVS';
const overlay = document.querySelector('.overlay');
const city = document.querySelector('.city');
const date = document.querySelector('.date')
const temp = document.querySelector('.tmp');
const maxtemp = document.querySelector('.upper');
const mintemp = document.querySelector('.lower');
const description = document.querySelector('.description');
const condition = document.querySelector('.conditions');
const userInput = document.querySelector('.location').value;
const searchBtn = document.querySelector('.search-btn');
const descImg = document.querySelector('.img-desc');


// searchBtn.addEventListener('click', ()=>{
//     getWeather(userInput);
// })


const currentHour = new Date().getHours();
if(currentHour > 18){
    overlay.style.backgroundImage = 'url(Assets/night.jpg)';
    temp.classList.add('tmp-night');

}else{
    overlay.style.backgroundImage = 'url(Assets/day.jpg)';
    temp.classList.add('tmp-day');
};

async function getWeather(country){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=${apiKey}`);

        
        const data = await response.json();
        const {currentConditions, days} = data;
        console.log(data);

        city.textContent = data.address;
        date.textContent = formatDate();
        temp.textContent = `${convertToCelsius(days[0].temp)}°C`;
        maxtemp.textContent = `↑${convertToCelsius(days[0].tempmax)}°C`;
        mintemp.textContent = `↓${convertToCelsius(days[0].tempmin)}°C`;
        descImg.src = `Assets/weather-icons/${currentConditions.icon}.png`;
        description.textContent = data.description;
        condition.textContent = currentConditions.conditions;

    }catch(err){
        console.log(err);
    }
};

getWeather('japan');

function convertToCelsius(tmp){
    return ((tmp - 32) * 5 /9).toFixed(1);
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function formatDate() {
    const date = new Date();
    const month = new Intl.DateTimeFormat('en-US', { 
        month: 'long' 
    }).format(date);
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    
    return `Today, ${month} ${day}${daySuffix}`;
}
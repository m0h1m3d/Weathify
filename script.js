const apiKey = 'DR3FUXSQ7A8DZKXDY73765JVS';
const overlay = document.querySelector('.overlay');
const condition = document.querySelector('.conditions');
const userInput = document.querySelector('.location');
const searchBtn = document.querySelector('.search-btn');
const leftContainer = document.querySelector('.left-info');
const middleContainer = document.querySelector('.middle-info');
const hourContainer = document.querySelector('.hour-container');
const tomorContainer = document.querySelector('.info');

const currentHour = new Date().getHours();
currentHour >= 18 ? overlay.style.backgroundImage = 'url(Assets/night.jpg)' : overlay.style.backgroundImage = 'url(Assets/day.jpg)';


async function getWeather(country) {
    try {
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(country)) throw new Error('Please use a valid city/country name');

        renderSpinner();

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=${apiKey}`, {
            mode: 'cors',
        });

        if (response.status == 400) throw new Error('could not find city/country. Try Again');

        const data = await response.json();
        const { currentConditions, days } = data;
        console.log(data);


        condition.textContent = currentConditions.conditions;
        renderLeftContainerMarkup(data, currentConditions, days);
        renderMiddleContainerMarkup(days);
        renderHourlyContainerMarkup(days);
        renderTomorrowCountainerMarkup(days);

    } catch (err) {
        console.log(err);
        alert(err);
    } finally {
        removeSpinner();
    }
};

searchBtn.addEventListener('click', () => {
    clearContainers();
    getWeather(userInput.value);
});

function renderLeftContainerMarkup(data, currentConditions, days) {
    const markup = `
            <p class="city">${data.address}</p>
            <p class="date">${formatDate()}</p>
            <p class="tmp ${currentHour >= 18 ? 'tmp-night' : 'tmp-day'
        }">${convertToCelsius(days[0].temp)}°</p>
            <div class="upper-lower">
                <p class="upper">↑${convertToCelsius(days[0].tempmax)}°</p>
                <p class="lower">↓${convertToCelsius(days[0].tempmin)}°</p>
            </div>
            <div class="desc-container">
                <img class="img-desc" src="Assets/weather-icons/${currentConditions.icon}.png" height="40" width="40">
                <p class="description">${data.description}</p>
            </div>
        `;
    leftContainer.insertAdjacentHTML('beforeend', markup);
};

function renderMiddleContainerMarkup(days) {
    const markup = `
        <div class="info1">
        <img src="Assets/weather-icons/feelslike.png" alt="" height="40">
        Feels-like
        <span>${convertToCelsius(days[0].feelslike)}°</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/humidity.png" alt="" height="40">
        Humidity
        <span>${days[0].humidity} g/kg</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/precip.png" alt="" height="40">
        Precip
        <span>${days[0].precip} mm</span>
        </div>

        <div class="info1"><img src="Assets/weather-icons/snow.png" alt="" height="40">
        Snow
        <span>${days[0].snow} cm</span>
        </div>

        <div class="info1"><img src="Assets/weather-icons/wind.png" alt="" height="40">
        Windspeed
        <span>${days[0].windspeed} kt</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/winddir.png" alt="" height="40">
        Wind-dir
        <span>${days[0].winddir}°</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/pressure.png" alt="" height="40">
        Pressure
        <span>${days[0].pressure} Pa</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/solarenergy.png" alt="" height="40">
        solarenergy
        <span>${days[0].solarenergy} W/m²</span>
        </div>

        <div class="info1">
        <img src="Assets/weather-icons/uv.png" alt="" height="40">
        Uv-Index
        <span>${days[0].uvindex}</span>
        </div>
        `;
    middleContainer.insertAdjacentHTML('beforeend', markup);
};

function renderHourlyContainerMarkup(days) {
    days[0].hours.forEach(hour => {
        const markup = `
        <div class="item">
        <span class="hour-icon"><img src="Assets/weather-icons/${hour.icon}.png" alt="" height="40"></span>
        <div class="hour-degree">
        <p class="hour">${hour.datetime}</p>
        <p class="degree">${convertToCelsius(hour.temp)}<span>°</span></p>
        </div>
        </div>
        `;

        hourContainer.insertAdjacentHTML('beforeend', markup);
    });
};

function renderTomorrowCountainerMarkup(days) {
    const Markup = `
            <span class="tomorr-icon"><img src="Assets/weather-icons/${days[1].icon}.png" height='40' alt=""></span>
                <div class="tomor-pred">
                    <div class="upper-lower-tomorrow">
                        <p>Tomorrow</p>
                        <p class="t-upper">↑${convertToCelsius(days[1].tempmax)}°</p>
                        <p class="t-lower">↓${convertToCelsius(days[1].tempmin)}°</p>
                    </div>
                    <p class="pred">${days[1].conditions}</p>
                </div>
        `;
    tomorContainer.insertAdjacentHTML('beforeend', Markup);
};

function clearContainers() {
    leftContainer.innerHTML = '';
    middleContainer.innerHTML = '';
    tomorContainer.innerHTML = '';
    hourContainer.innerHTML = '';
};

function convertToCelsius(tmp) {
    return ((tmp - 32) * 5 / 9).toFixed(1);
};

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

function formatDate() {
    const date = new Date();
    const month = new Intl.DateTimeFormat('en-US', {
        month: 'long'
    }).format(date);
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);

    return `Today, ${month} ${day}${daySuffix}`;
};

function renderSpinner() {
    const markup = `
      <span class="loader"></span>
    `;
    leftContainer.insertAdjacentHTML('beforeend', markup);
    middleContainer.insertAdjacentHTML('beforeend', markup);
    tomorContainer.insertAdjacentHTML('beforeend', markup);
    hourContainer.insertAdjacentHTML('beforeend', markup);
};

function removeSpinner() {
    leftContainer.querySelector('.loader').remove();
    middleContainer.querySelector('.loader').remove();
    tomorContainer.querySelector('.loader').remove();
    hourContainer.querySelector('.loader').remove();
};
const apiKey  = 'DR3FUXSQ7A8DZKXDY73765JVS';


const currentHour = new Date().getHours()
if(currentHour > 12){
    document.querySelector('.overlay').style.backgroundImage = 'url(Assets/night.jpg)';
}else{
    document.querySelector('.overlay').style.backgroundImage = 'url(Assets/day.jpg)';
}

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kassala?key=${apiKey}`).then(response => response.json()).then(data => {
    console.log(data);
})


alert(45)

// Date Output here
let  dateOutput = document.querySelector(".date")
let dayList =["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"]
var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

function dateFunc(){
let date = new Date();
let day = date.getDate();
let month = monthList[date.getMonth()];
let weekDay = dayList[date.getDay()];


dateOutput.innerHTML = ` <i class="fa-regular fa-calendar-days"></i> ${day} ${month}, ${weekDay}`


setInterval(clock,1000);
}

dateFunc()

//Time Output here
let clockOutput = document.querySelector(".time");

function clock(){
let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();

//hour = timeF(hour)
minute = timeF(minute)
second = timeF(second)

clockOutput.innerHTML = '<i class="fa-regular fa-clock"></i> ' + hour+" : "+minute+ " : " + second


setInterval(clock,1000);
}


function timeF(value){
    if (value<10){
        value = "0"+value;
      }  
        return value
    }
    
clock()

//box Data here

let tempField = document.querySelector(".temp h1");
let cityField = document.querySelector(".city");
let countryField = document.querySelector(".country");
let searchField = document.querySelector("input");
let searchBtn = document.querySelector("button");
let weather = document.querySelector(".weather-value");
let feelsLike = document.querySelector(".feels-value");

//Api Calling

let apiKey = "&APPID=" +"fa45244ecec24c4b733abb9cb8e97665"

async function getData(city){

let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

    let response = await fetch(apiUrl+apiKey);

// Error Handle in if
if (response.status == 404){
    let errorDiv = document.querySelector(".error");
    errorDiv.style.display = "grid";
    tempField.style.display = "none";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".feels").style.display = "none";
    document.querySelector(".city-country").style.display = "none";
}

else{
    let data = await response.json();
    
    tempField.innerHTML =  Math.round(data.main.temp) + "°C";
    
    cityField.innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + data.name;
    
    countryField.innerHTML = '<i class="fa-solid fa-flag"></i> ' + data.sys.country

    weather.innerHTML = data.weather[0].main

    feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";

    // error handle
    let errorDiv = document.querySelector(".error");
    errorDiv.style.display = "none";
    tempField.style.display = "grid";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".feels").style.display = "block";
    document.querySelector(".city-country").style.display = "flex";
}
   
}

getData('Dhaka')

searchBtn.addEventListener("click",function(){
    
    getData(searchField.value)
})

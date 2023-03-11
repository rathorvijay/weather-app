const yourweather=document.querySelector(".yourweather");
const searchweather=document.querySelector(".searchweather");
const grandaccess=document.querySelector(".grandaccess");
const yourweatherinfo=document.querySelector(".yourweatherinfo");
const searchformbox=document.querySelector(".searchformbox");
const button=document.querySelector("[location]");
const serarchform=document.querySelector("[searchform]");
const weathericon=document.querySelector("[weathericon]");
const countryicon=document.querySelector("[countryicon]");
const citydisplay=document.querySelector("[city]");
const hazedisplay=document.querySelector("[haze]");
const tempreturedisplay=document.querySelector("[tempreture]");
const windspeeddisplay=document.querySelector("[windspeed]");
const humiditydisplay=document.querySelector("[humidity]");
const cloudsdisplay=document.querySelector("[clouds]");
const loadingdisplay=document.querySelector("[loadingimg]");
const showerror=document.querySelector(".showerror");
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

let currenttap=yourweather;
tap(currenttap);

// function for switching tap
function tap(currenttap){
    showerror.classList.remove("active");
    if(currenttap==yourweather)
    {
        searchformbox.classList.remove("active");
        yourweather.classList.add("active");
        searchweather.classList.remove("active");
        yourweatherinfo.classList.remove("active");
        grandaccess.classList.add("active");
    }
    else{
        yourweather.classList.remove("active");
        searchformbox.classList.add("active");
        searchweather.classList.add("active"); 
        yourweatherinfo.classList.remove("active");
        grandaccess.classList.remove("active");
    }
}

// when click on yourweather text heading
yourweather.addEventListener("click",()=>{
currenttap=yourweather;
tap(currenttap);
})
// when click on searchweather text heading
searchweather.addEventListener("click",()=>{
currenttap=searchweather;
tap(currenttap);
})

// longitude and latitude fetching
function display(weatherinfo)
{
    console.log(weatherinfo);

    // text.innerHTML=`temp=${weatherinfo.main.temp}<br>speed=${weatherinfo.wind.speed}<br>huminity=${weatherinfo.main.humidity}<br>cloud=${weatherinfo.main.humidity}<br>city=${weatherinfo.name}<br>weater=${weatherinfo.weather[0].main}<br>discrition=${weatherinfo.weather[0].description}<br>icon=${weatherinfo.weather[0].icon}`;

    weathericon.src=`http://openweathermap.org/img/w/${weatherinfo.weather[0].icon}.png`;
    countryicon.src =`https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;

    tempreturedisplay.innerText=weatherinfo.main.temp;
    windspeeddisplay.innerText=weatherinfo.wind.speed;
    humiditydisplay.innerText=weatherinfo.main.humidity;
    cloudsdisplay.innerText=weatherinfo.clouds.all;
    citydisplay.innerText=weatherinfo.name;
    hazedisplay.innerText=weatherinfo.weather[0].main;
    yourweatherinfo.classList.add("active");
}

// when click on access geo location button
button.addEventListener("click",()=>{
    // check geolocation is support or not
    showerror.classList.remove("active");
    grandaccess.classList.remove("active");
    if(navigator.geolocation){
        //give latitude and longutude    allow is a fuction those give position
       navigator.geolocation.getCurrentPosition(allow);
    }
    else
    {
        alert("geo location is not supporting");
         grandaccess.classList.add("active");
    }
})

// function call line no 34 give parameter position
const allow=(position)=>{
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;

    async function Api(){
        loadingdisplay.classList.add("active");
        const Apidata=await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const jsondata=await Apidata.json();
        return jsondata;
    }
    
    Api().then((jsondata)=>{
        loadingdisplay.classList.remove("active");
        grandaccess.classList.remove("active");
        display(jsondata);
    }).catch((error)=>{
        loadingdisplay.classList.remove("active");
        yourweatherinfo.classList.remove("active");
        // grandaccess.classList.remove("active");
        showerror.classList.add("active");
        console.log(`error Api not fetch ${error}`);
    });
}

// city Api serach data 

let city="";
const cityinput=document.querySelector("[inputcity]");
const searchform=document.querySelector("[searchform]");

searchform.addEventListener("submit",(e)=>{
    showerror.classList.remove("active");
    yourweatherinfo.classList.remove("active");
    e.preventDefault();
    city=cityinput.value;

   async function cityApi(){
    loadingdisplay.classList.add("active");
   const cityresponse= await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
   const citydata= await cityresponse.json();
   return citydata;
   }

    cityApi().then((citydata)=>{
        loadingdisplay.classList.remove("active");
        display(citydata);
    }).catch((error)=>{
        loadingdisplay.classList.remove("active");
        yourweatherinfo.classList.remove("active");
        showerror.classList.add("active");
        console.log("erorr is occruing in city ");
    });

})

const SetDateTime = document.getElementById("dateTime");
const SetDateDays = document.getElementById("dateDays");
const FajrTime = document.getElementById("FstTime");
const DhuhrTime = document.getElementById("SndTime");
const AsrTime = document.getElementById("TrdTime");
const MaghribTime = document.getElementById("FthTime");
const IshaTime = document.getElementById("SthTime");
const cityName = document.getElementById("citys")

function UpdateDate(){
    const Datenow = new Date();
    const timeString  = Datenow.toLocaleTimeString();
    SetDateTime.innerText = timeString;
}
UpdateDate();
setInterval(UpdateDate , 1000);

function UpdateDatedays(){
    const datedays = new Date();
    const dateString = datedays.toDateString();
    SetDateDays.innerText = dateString;
}
UpdateDatedays();
setInterval(UpdateDatedays , 60000);

function convertTo12Hour(time24) {
    const [hour, minute] = time24.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'م' : 'ص';
    const hour12 = hourNum % 12 || 12; 
    return `${hour12}:${minute} ${ampm}`;
}


async function getPrayers(city){

    const country = "Egypt";
    const url = `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`;

    let responce = await fetch(url);
    let data = await responce.json();
    
    let timeing = data.data.timings;
    // console.log(data.data)

    FajrTime.innerText = convertTo12Hour(timeing.Fajr);
    DhuhrTime.innerText = convertTo12Hour(timeing.Dhuhr);
    AsrTime.innerText = convertTo12Hour(timeing.Asr);
    MaghribTime.innerText = convertTo12Hour(timeing.Maghrib);
    IshaTime.innerText = convertTo12Hour(timeing.Isha);

} 
getPrayers(cityName.value);

cityName.addEventListener("change" , function(){
    getPrayers(cityName.value);
})
let selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
let content = document.querySelector(".content");
let setAlarmButton = document.querySelector("button");
let timeUpAlert = document.querySelector("div.wrapper");

let alarmTime, isAlarmSet = false;

let ringtone = new Audio("hridayam_ringtone.mp3");

console.log(selectMenu)

for(let i = 12; i > 0; i--)
{
    i = (i < 10) ? "0"+i: i;
    let option = `<option value = "${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i >= 0; i--)
{
    i = (i < 10) ? "0"+i: i;
    let option = `<option value = "${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i >= 0; i--)
{
    i = (i < 10) ? "0"+i: i;
    let option = `<option value = "${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i > 0; i--)
{
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value = "${am_pm}">${am_pm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    am_pm = "AM";

    if(h >= 12)
    {
        am_pm = "PM";
    }

    h = h%12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s: s;

    currentTime.innerText = `${h}:${m}:${s} ${am_pm}`;

    if(alarmTime == `${h}:${m}:${s} ${am_pm}`)
    {
        timeUpAlert.insertAdjacentHTML("afterend", '<br><div class="time_up"><h1>Time Up!</h1></div>');
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm(){
    if(isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        location.reload();
        content.classList.remove("disable");
        setAlarmButton.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`
    
    if(time.includes("Hour") || time.includes("Minute") || time.includes("Seconds") || time.includes("AM/PM")){
        return window.alert("Please select a valid time to set the Alarm!!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmButton.innerText = "Clear Alarm";
}

setAlarmButton.addEventListener("click", setAlarm);
const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];
const bodyBg = document.body;

let isPlay = false;
let isReset = false;
let minCounter = 0;
let secCounter = 0;
let centiSecCounter = 0;
let min;
let sec;
let centiSec;
let lapItem = 0;

const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
};

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        bodyBg.classList.remove("animation-bg");

        min = setInterval(() => {
            minute.innerHTML = `${formatNumber(minCounter)} :`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
                minCounter++;
                minute.innerHTML = `${formatNumber(minCounter)} :`;
            }
            second.innerHTML = `&nbsp;${formatNumber(secCounter++)} :`;
        }, 1000);

        centiSec = setInterval(() => {
            if (centiSecCounter === 100) {
                centiSecCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${formatNumber(centiSecCounter++)}`;
        }, 10);

        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        bg.classList.remove("animation-bg");
        bodyBg.classList.add("animation-bg");
    }
    toggleButton();
};

const reset = () => {
    isReset = false;
    playButton.innerHTML = 'Play';
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);

    minCounter = 0;
    secCounter = 0;
    centiSecCounter = 0;

    minute.innerHTML = `00 :`;
    second.innerHTML = `&nbsp;00 :`;
    centiSecond.innerHTML = `&nbsp;00`;

    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    bg.classList.remove("animation-bg");
    bodyBg.classList.add("animation-bg");
    isPlay = false;
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapItem}`;
    timeStamp.innerHTML = `${formatNumber(minCounter)} : ${formatNumber(secCounter)} : ${formatNumber(centiSecCounter)}`;

    li.append(number, timeStamp);
    laps.append(li);
    clearButton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    lapItem = 0;
    clearButton.classList.add("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);

bodyBg.classList.add("animation-bg");
minute.innerHTML = `00 :`;
second.innerHTML = `&nbsp;00 :`;
centiSecond.innerHTML = `&nbsp;00`;
clearButton.classList.add("hidden");

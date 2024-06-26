"use strict";

const player1Div = document.getElementById("player1");
const player2Div = document.getElementById("player2");
const player1clock = document.querySelector("#player1 span");
const player2clock = document.querySelector("#player2 span");

const resetBtn = document.querySelector("#icons i:nth-child(1)");
const playAndPauseBtn = document.querySelector("#icons i:nth-child(2)");
const setTimeBtn = document.querySelector(".fa-pen-to-square");

const stopScreen = document.getElementById("stop-screen");

const modalbtn = document.querySelector("#icons button");
const dialog = document.querySelector("dialog");

const modalform = document.getElementById("modify-time-form");
const player1Input = document.getElementById("player1-input");
const player2Input = document.getElementById("player2-input");
const player1ExtraCountInput = document.getElementById("player1-extra-count");
const player2ExtraCountInput = document.getElementById("player2-extra-count");

let player1ExtraCount = 0;
let player2ExtraCount = 0;

let min = 1;
let sec = 0;
let milisec = 100;

let min2 = 1;
let sec2 = 0;
let milisec2 = 100;

let timerId1;
let timerId2;

let check_player1 = 0;
let check_player2 = 0;

function clockText(player, min, sec) {
    player.innerText = `${min}:${String(sec).padStart(2, "0")}`;
}


function flowtime() {
    if (check_player1 == 1) {
        if (milisec > 0) {
            milisec--;
        }
        else if (sec > 0) {
            milisec = 99;
            sec--;
           
        }
        else if (min > 0) {
            milisec = 99;
            sec = 59;
            min--;
        }

        clockText(player1clock, min, sec);
        player1Div.classList.add("time-on");
        player2Div.classList.remove("time-on");
    }
    else if (check_player2 == 1) {

        if (milisec2 > 0) {
            milisec2--;
        }
        else if (sec2 > 0) {
            milisec2 = 99;
            sec2--;
        }
        else if (min2 > 0) {
            milisec2 = 99;
            sec2 = 59;
            min2--;
        }

        clockText(player2clock, min2, sec2);
        player2Div.classList.add("time-on");
        player1Div.classList.remove("time-on");
    }

    if (min == 0 && sec == 0 || min2 == 0 && sec2 == 0) {
        clearInterval(timerId1);
        clearInterval(timerId2);
        stopScreen.classList.add("stop-game");
    }

    if (min == 0 && sec == 0) {
        player1Div.classList.add("time-over");
    }
    else {
        player1Div.classList.remove("time-over");

    }

    if (min2 == 0 && sec2 == 0) {
        player2Div.classList.add("time-over");
    }
    else {
        player2Div.classList.remove("time-over");

    }


}

player1Div.addEventListener("click", () => {
    if (check_player2 == 0) { 
        check_player2 = 1;
        timerId1 = setInterval(flowtime, 10);
        clearInterval(timerId2);
        check_player1 = 0;
        //extra count
        sec += player1ExtraCount;
        if(sec > 59){
            sec = 0;
            min++;
        }
        clockText(player1clock, min, sec);
        //console.log(min,sec);
    }
})
player2Div.addEventListener("click", () => {
    if (check_player1 == 0) {
        check_player1 = 1;
        timerId2 = setInterval(flowtime, 10);
        clearInterval(timerId1);
        check_player2 = 0;
        //extra count
        sec2 += player2ExtraCount;
        if(sec2 > 59){
            sec2 = 0;
            min2++;
        }
        clockText(player2clock, min2, sec2);

        //console.log(min2,sec2);
    }
})

function timerinit(){
    check_player1 = 0;
    check_player2 = 0;
    clearInterval(timerId1);
    clearInterval(timerId2);
    player1Div.classList.remove("time-on");
    player1Div.classList.remove("time-over");
    player2Div.classList.remove("time-on");
    player2Div.classList.remove("time-over");
}

playAndPauseBtn.addEventListener("click", () => {
    playAndPauseBtn.classList.toggle("fa-pause");
    playAndPauseBtn.classList.toggle("fa-play");
    stopScreen.classList.toggle("stop-game");
    stopScreen.classList.toggle("stopScreen");
    timerinit();

})
resetBtn.addEventListener("click", () => {
    min = player1Input.value;
    sec = 0;
    milisec = 100;
    min2 = player2Input.value;
    sec2 = 0;
    milisec2 = 100;
    clockText(player1clock, min, sec, milisec);
    clockText(player2clock, min2, sec2, milisec2);
    stopScreen.classList.remove("stop-game");
    stopScreen.classList.remove("stopScreen");
    playAndPauseBtn.classList.add("fa-pause");
    playAndPauseBtn.classList.remove("fa-play");
    timerinit();
})

modalbtn.addEventListener("click",()=>{
    dialog.showModal();
})

modalform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (player1Input.value < 1 || player1Input.value == NaN || player2Input.value < 1 || player2Input.value == NaN) {

        player1Input.value = 1;
        player2Input.value = 1;
        console.log("wrong");

    }
    else{
        player1ExtraCount = Number(player1ExtraCountInput.value);
        player2ExtraCount = Number(player2ExtraCountInput.value);
        min = player1Input.value;
        min2 = player2Input.value;
        sec = 0;
        sec2 = 0;
        dialog.close();
        clockText(player1clock, min, sec);
        clockText(player2clock, min2, sec2);
        timerinit();

    }
})



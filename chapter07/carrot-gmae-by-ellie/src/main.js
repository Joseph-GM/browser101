'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');



let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
})

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener((item) => onItemClick);
function onItemClick(item) {
    if (!started) {
        return;
    }
    // const target = event.target;
    if(item === 'carrot') {
        //Carrot!!
        // target.remove();
        score++;
        // playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(item === 'bug') {
        //Bug!!
        finishGame(false);
    }
}




// field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', ()=> {
    console.log('log')
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

// popUpRefresh.addEventListener('click', () => {
//     startGame();
// })

function stopGame() {
    started = false;
    stopGameTimer();
    hideGamebutton();
    gameFinishBanner.showWithText('REPLAY?');
    // showPopUpWithText('REPLAY');
    // playSound(alertSound);
    // stopSound(bgSound);
    sound.playAlert();
    sound.stopBackground();
    
}

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
    
}

function finishGame(win){
    started = false;
    hideGamebutton();
    if(win) {
        // playSound(winSound);
        sound.playWin();
    } else {
        // playSound(bugSound);
        sound.playBug();
    }
    stopGameTimer();
    gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOST');
    stopSound(bgSound);
}

function stopGameTimer() {
    clearInterval(timer);
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-solid');
    console.log(icon)
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGamebutton() {
    gameBtn.style.visibility = 'hidden';
}

// function showPopUpWithText(text) {
//     popUpText.innerText = text;
//     popUp.classList.remove('pop-up--hide');
// }

// function hidePopup() {
//     popUp.classList.add('pop-up--hide');
// }

function initGame() {
    // Add bugs and carrots in field
    // field.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    score = 0;
    // addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    // addItem('bug', BUG_COUNT, 'img/bug.png');
    gameField.init();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}




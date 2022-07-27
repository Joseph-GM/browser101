import {Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win:'win',
    lose: 'lose',
    cancel: 'cancel',
});

export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');

        this.gameBtn.addEventListener('click', ()=> {
            if(this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });


        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);    

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGamebutton();
        sound.stopBackground();
        
        this.onGameStop && this.onGameStop(reason);
        
    }

    
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
        
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.scoren ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    showStopButton() {
        const icon = this.gameBtn.querySelector('.fa-solid');
        console.log(icon)
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGamebutton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    initGame() {
        // Add bugs and carrots in field
        // field.innerHTML = '';
        this.gameScore.innerHTML = this.carrotCount;
        this.score = 0;
        // addItem('carrot', CARROT_COUNT, 'img/carrot.png');
        // addItem('bug', BUG_COUNT, 'img/bug.png');
        this.gameField.init();
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }

    onItemClick = item => {
        console.log(`main.js onItemClick called, item = ${item}`)
        if (!this.started) {
            return;
        }
        // const target = event.target;
        console.log(`main.js onItemClick called, item = ${item}`)
        if(item === ItemType.carrot) {
            //Carrot!!
            // target.remove();
            console.log(`main.js onItemClick called, item = ${item}`)
            this.score++;
            // playSound(carrotSound);
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if(item === ItemType.bug) {
            //Bug!!
            console.log(`main.js onItemClick called, item = ${item}`)
            this.stop(Reason.lose);
        }
    }

    }

   
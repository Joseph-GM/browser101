import Field from './field.js';
import * as sound from './sound.js';

export default class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotcount(num) {
        this.carrotcount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotcount,
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
                this.stop();
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

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGamebutton();
        // this.gameFinishBanner.showWithText('REPLAY?');
        // showPopUpWithText('REPLAY');
        // playSound(alertSound);
        // stopSound(bgSound);
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
        
    }
    
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
        
    }
    
    finish(win){
        this.started = false;
        this.hideGamebutton();
        if(win) {
            sound.playWin();
        } else {
            sound.playBug();
        }
        this.stopGameTimer();
        // gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOST');
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win? 'win' : 'lose');
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
                this.finish(this.carrotCount === this.score);
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
        if(item === 'carrot') {
            //Carrot!!
            // target.remove();
            console.log(`main.js onItemClick called, item = ${item}`)
            this.score++;
            // playSound(carrotSound);
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finish(true);
            }
        } else if(item === 'bug') {
            //Bug!!
            console.log(`main.js onItemClick called, item = ${item}`)
            this.finish(false);
        }
    }

    }

   
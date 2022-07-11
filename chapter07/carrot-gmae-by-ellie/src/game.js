
export default class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);    

        this.started = false;
        this.score = 0;
        this.timer = undefined;
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
            if (score === CARROT_COUNT) {
                this.finishGame(true);
            }
        } else if(item === 'bug') {
            //Bug!!
            console.log(`main.js onItemClick called, item = ${item}`)
            this.finishGame(false);
        }
    }
}
'use strict'

export default class Game {
    constructor() {
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

}
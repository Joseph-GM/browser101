'use strict';

import PopUp from './popup.js';
import {GameBuilder,  Reason } from './game.js';
import * as sound from './sound.js';



const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;


const gameFinishBanner = new PopUp();


const game = new GameBuilder()
    .withGameDuration(GAME_DURATION_SEC)
    .withCarrotCount(CARROT_COUNT)
    .withBugCount(BUG_COUNT)
    .build()

game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Won 🍺 ';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You Lost 💩';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason ')
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})











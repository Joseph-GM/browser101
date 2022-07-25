'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';



const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;


const gameFinishBanner = new PopUp();


const game = new GameBuilder()
    .gameDuration(GAME_DURATION_SEC)
    .carrotcount(CARROT_COUNT)
    .bugCount(BUG_COUNT)
    .build()
    
game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case 'cancel':
            message = 'Replay?';
            break;
        case 'win':
            message = 'You Won 🍺 ';
            break;
        case 'lose':
            message = 'You Lost 💩'
            break;
        default:
            throw new Error('not valid reason ')
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})











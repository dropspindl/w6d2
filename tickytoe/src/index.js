const View = require './ttt-view.js'
const Game = require '/Users/appacademy/Desktop/W6D2/solution/game.js'

  $(() => {
    const game = new Game();
    let $container = $('.ttt');
    new View(game, $container)
    
  });

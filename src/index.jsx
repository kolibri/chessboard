require('../sass/chessboard.scss');
import React from 'react'
import ReactDOM from 'react-dom'
import Game from './Game.jsx'

document.addEventListener('DOMContentLoaded', function ()
{
    let games = document.querySelectorAll('.pgn').forEach(function(game, key){
        ReactDOM.render(
            <Game 
            pgn={game.innerHTML}
            player={game.dataset.player}
            disableCustomMoves={game.dataset.disableCustomMoves === "true"}
            pieceNames={{'k': 'K', 'q': 'D', 'b': 'L', 'n': 'S', 'r': 'T', 'p': ''}}
            key={key} />, 
            game
        )
    });
})

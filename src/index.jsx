require('../sass/chessboard.scss');
import React from 'react'
import ReactDOM from 'react-dom'
import Pgn from './Pgn.jsx'

document.addEventListener("DOMContentLoaded", function ()
{
    let pgns = document.querySelectorAll('.pgn').forEach(function(pgn, key){
        ReactDOM.render(<Pgn key={key} pgn={pgn.innerHTML} ply={24} /> , pgn)
    });
})

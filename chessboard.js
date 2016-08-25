window.onload=function(){

var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};
var cols = ['a','b','c','d','e','f','g','h'];
var rows = [8,7,6,5,4,3,2,1];

function getPieceClass(piece) {
    if (!piece || !piece.color || !piece.type) {
        return;
    }

    return piece.color + piece.type;
}

function drawPieces(board, chess) {
    for(y in rows) {
        for (x in cols) {
            var fieldname = cols[x] + rows[y];
            var field = board.querySelector('.' + fieldname);
            var piece = chess.get(fieldname);
            field.classList.remove('wk','wq','wr','wb','wn','wp','bk','bq','br','bb','bn','bp');
            if (pieceClass = getPieceClass(piece)) {
                field.classList.add(pieceClass);
            }
        }
    }
}

function formatMove(move) {
    var moveString = '';
    if (0 <= move.flags.indexOf('k')) { 
        moveString = 'O-O';
    } else if (0 <= move.flags.indexOf('q')) {
        moveString = 'O-O-O';
    } else {
        moveString = 
            (('p' != move.piece) ? move.piece.toUpperCase() : '') +                        // piece name
            move.from  +                                                                   // from field
            ((0 <= move.flags.indexOf('c') || 0 <= move.flags.indexOf('e')) ? 'x' : '-') + // capture sign
            move.to +                                                                      // target field
            ((0 <= move.flags.indexOf('e')) ? 'ep': '') +                                  // en passant
            ((0 <= move.flags.indexOf('p')) ? move.promotion : '' );                       // promotion
        }

    // add check and checkmate flags
    if (0 <= move.san.indexOf('+')) {
        moveString = moveString + '+';
    }
    if (0 <= move.san.indexOf('#')) {
        moveString = moveString + '#';
    }

    return moveString;
}

forEach(document.querySelectorAll('.pgn'), function (index, pgn) {
    var chess = new Chess()

    if (!chess.load_pgn(pgn.innerHTML.trim())) {
        return
    }
    pgn.innerHTML = ''

    var moves = chess.history({ verbose: true })
    var currentMoveIndex = moves.length;
    var filter = ['White', 'Black', 'Date', 'Event', 'Result']
    var infos = document.createElement('dl')
    pgn.appendChild(infos)
    infos.classList.add('info')

    for (filterName in filter) {
        var infoDt = document.createElement('dt')
        infoDt.appendChild(document.createTextNode(filter[filterName]))
        var infoDd = document.createElement('dd')
        var header = chess.header()
        infoDd.appendChild(document.createTextNode(header[filter[filterName]]))
        infos.appendChild(infoDt)
        infos.appendChild(infoDd)
    }

    var board = document.createElement('div');
    board.classList.add('board');
    pgn.appendChild(board);
    // draw board
    var color = 'black' // starts at a8
    for(y in rows) {
        var row = document.createElement('div');
        for (x in cols) {
            var field = document.createElement('div');
            var fieldname = cols[x] + rows[y];
            field.classList.add('field');
            field.classList.add(fieldname);
            field.classList.add(color);
            color = (color == 'white') ? 'black' : 'white';
            row.appendChild(field);
        }
        color = (color == 'white') ? 'black' : 'white';
        board.appendChild(row);
    }
    drawPieces(board, chess);

    // draw moves
    var movesList = document.createElement('ol');
    movesList.classList.add('moves');
    for (m in moves) {
        if ('w' == moves[m].color) {
            var moveLi = document.createElement('li');
            movesList.appendChild(moveLi);
        }

        var moveSpan = document.createElement('span');
        moveSpan.dataset.move = m;

        moveSpan.addEventListener('click', function(){
            chess.reset();
            for (n = 0; n <= this.dataset.move; n++) {
                chess.move(moves[n]);
            }
            currentMoveIndex = parseInt(this.dataset.move) + 1;
            drawPieces(board, chess);
        });

        moveSpan.appendChild(document.createTextNode(formatMove(moves[m])));
        moveLi.appendChild(moveSpan);
    }

    pgn.appendChild(movesList);

    var resetButton = document.createElement('button')
    resetButton.appendChild(document.createTextNode('reset'));
    resetButton.addEventListener('click', function(){
        chess.reset();
        drawPieces(board, chess);
        currentMoveIndex = 0;
    });
    pgn.appendChild(resetButton);

    var backButton = document.createElement('button')
    backButton.appendChild(document.createTextNode('back'));
    backButton.addEventListener('click', function(){
        if (!currentMoveIndex > 0) {
            return;
        }
        chess.undo();
        currentMoveIndex = currentMoveIndex -1;
        drawPieces(board, chess);
    });
    pgn.appendChild(backButton);

    var nextButton = document.createElement('button')
    nextButton.appendChild(document.createTextNode('next'));
    nextButton.addEventListener('click', function(){
        if (!(currentMoveIndex <= moves.length)) {
            return;
        }
        currentMoveIndex = currentMoveIndex + 1;
        chess.reset();
        for (n = 1; n <= currentMoveIndex; n++) {
            chess.move(moves[n-1])
        }
        drawPieces(board, chess);
    });
    pgn.appendChild(nextButton);
});

}

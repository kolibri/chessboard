window.onload=function(){
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]) // passes back stuff we need
        }
    }


    var Chessboard = function(pgnDiv) {
        var that = this
        var cols = ['a','b','c','d','e','f','g','h']
        var rows = [8,7,6,5,4,3,2,1]

        var pgn = pgnDiv
        var showMoves = pgn.dataset.showMoves ? (pgn.dataset.showMoves === 'true') : true
        var showHeader = pgn.dataset.showHeader ? (pgn.dataset.showHeader === 'true') : true
        var showButtons = pgn.dataset.showButtons ? (pgn.dataset.showButtons === 'true') : true
        var labelNext = pgn.dataset.labelNext ? pgn.dataset.labelNext : 'next'
        var labelBack = pgn.dataset.labelBack ? pgn.dataset.labelBack : 'back'
        var labelReset = pgn.dataset.labelReset ? pgn.dataset.labelReset : 'reset'
        var startAtPly = pgn.dataset.ply ? pgn.dataset.ply : false
        var headers = pgn.dataset.headers ? pgn.dataset.headers.split(',') : ['White', 'Black', 'Date', 'Event', 'Result']

        var chess = new Chess()
        var board = document.createElement('div')

        if (!chess.load_pgn(pgn.innerHTML.trim())) {
            return
        }
        pgn.innerHTML = ''

        var moves = chess.history({ verbose: true })
        var currentMoveIndex = startAtPly ? startAtPly : moves.length

        function drawPieces() {
            for(y in rows) {
                for (x in cols) {
                    var fieldname = cols[x] + rows[y]
                    var field = board.querySelector('.' + fieldname)
                    var piece = chess.get(fieldname)
                    field.classList.remove('wk','wq','wr','wb','wn','wp','bk','bq','br','bb','bn','bp')
                    if (piece && piece.color && piece.type) {
                        field.classList.add(piece.color + piece.type)
                    }
                }
            }
        }

        function formatMove(move) {
            var moveString = ''
            if (0 <= move.flags.indexOf('k')) { 
                moveString = 'O-O'
            } else if (0 <= move.flags.indexOf('q')) {
                moveString = 'O-O-O'
            } else {
                moveString = 
                    (('p' != move.piece) ? move.piece.toUpperCase() : '') +                        // piece name
                    move.from  +                                                                   // from field
                    ((0 <= move.flags.indexOf('c') || 0 <= move.flags.indexOf('e')) ? 'x' : '-') + // capture sign
                    move.to +                                                                      // target field
                    ((0 <= move.flags.indexOf('e')) ? 'ep': '') +                                  // en passant
                    ((0 <= move.flags.indexOf('p')) ? move.promotion : '' )                       // promotion
                }

            // add check and checkmate flags
            if (0 <= move.san.indexOf('+')) {
                moveString = moveString + '+'
            }
            if (0 <= move.san.indexOf('#')) {
                moveString = moveString + '#'
            }

            return moveString
        }

        function drawBoard() {
            board = document.createElement('div')
            board.classList.add('board')
            pgn.appendChild(board)
            // draw board
            var color = 'black' // starts at a8
            for(y in rows) {
                var row = document.createElement('div')
                for (x in cols) {
                    var field = document.createElement('div')
                    var fieldname = cols[x] + rows[y]
                    field.classList.add('field')
                    field.classList.add(fieldname)
                    field.classList.add(color)
                    color = (color == 'white') ? 'black' : 'white'
                    row.appendChild(field)
                }
                color = (color == 'white') ? 'black' : 'white'
                board.appendChild(row)
            }
        }

        function drawHeader() {
            //var filter = ['White', 'Black', 'Date', 'Event', 'Result']
            var infos = document.createElement('dl')
            pgn.appendChild(infos)
            infos.classList.add('info')
            var header = chess.header()
            console.log(header,headers)
            for (filterName in headers) {
                var headerName = headers[filterName]
                var infoDt = document.createElement('dt')
                infoDt.appendChild(document.createTextNode(headerName))
                var infoDd = document.createElement('dd')
                infoDd.appendChild(document.createTextNode(header[headerName]))
                infos.appendChild(infoDt)
                infos.appendChild(infoDd)
            }
        }

        function drawMoves() {
            var movesList = document.createElement('ol')
            movesList.classList.add('moves')
            for (m in moves) {
                if ('w' == moves[m].color) {
                    var moveLi = document.createElement('li')
                    movesList.appendChild(moveLi)
                }

                var moveSpan = document.createElement('span')
                moveSpan.dataset.move = m

                moveSpan.addEventListener('click', function(){
                    gotoMove(parseInt(this.dataset.move) + 1)
                    drawPieces()
                })

                if (currentMoveIndex - 1 == moveSpan.dataset.move) {
                    moveSpan.classList.add('current')
                }

                moveSpan.appendChild(document.createTextNode(formatMove(moves[m])))
                moveLi.appendChild(moveSpan)
            }

            pgn.appendChild(movesList)
        }

        function drawButtons() {
            var buttons = document.createElement('div')
            buttons.classList.add('buttons')
            pgn.appendChild(buttons)
            function addButton(label, callback) {
                var button = document.createElement('button')
                button.appendChild(document.createTextNode(label))
                button.addEventListener('click', callback)
                buttons.appendChild(button)
            }

            addButton(labelReset, function(){
                chess.reset()
                drawPieces(board, chess)
                currentMoveIndex = 0
            })

            addButton(labelBack, function(){
                if (!currentMoveIndex > 0) {
                    return
                }
                chess.undo()
                currentMoveIndex = currentMoveIndex -1
                drawPieces(board, chess)
            })

            addButton(labelNext, function(){
                gotoMove(currentMoveIndex + 1)
                drawPieces(board, chess)
            })
        }

        function gotoMove(moveIndex) {
            if (moveIndex > moves.length) {
                return
            }
            chess.reset()
            for (n = 0; n < moveIndex; n++) {
                chess.move(moves[n])
            }
            currentMoveIndex = moveIndex
        }

        this.render = function() {

            if (true == showHeader) {
                drawHeader()
            }

            gotoMove(currentMoveIndex)
            drawBoard()
            drawPieces()

            if (true == showMoves) {
                drawMoves()
            }

            if (true == showButtons) {
                drawButtons()
            }
        }
    }

    forEach(document.querySelectorAll('.pgn'), function (index, pgn) {
        board = new Chessboard(pgn)
        board.render()
    })

}

/*!
 * Copyright (c) 2016 Lukas Sadzik <entengelb@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
window.onload=function(){
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i])
        }
    }

    var Chessboard = function(pgn) {
        var that = this
        
        var chess = new Chess()
        var cols = ['a','b','c','d','e','f','g','h']
        var rows = [8,7,6,5,4,3,2,1]
        var headers = {}

        var showMoves = pgn.dataset.showMoves 
            ? (pgn.dataset.showMoves === 'true') 
            : true
        var showHeader = pgn.dataset.showHeader 
            ? (pgn.dataset.showHeader === 'true') 
            : true
        var showButtons = pgn.dataset.showButtons 
            ? (pgn.dataset.showButtons === 'true') 
            : true
        var reversed = pgn.dataset.reversed 
            ? (pgn.dataset.reversed === 'true') 
            : false
        var labelNext = pgn.dataset.labelNext 
            ? pgn.dataset.labelNext 
            : 'next'
        var labelBack = pgn.dataset.labelBack 
            ? pgn.dataset.labelBack 
            : 'back'
        var labelReset = pgn.dataset.labelReset 
            ? pgn.dataset.labelReset 
            : 'reset'
        var labelTurn = pgn.dataset.labelTurn 
            ? pgn.dataset.labelTurn 
            : 'turn'
        var startAtPly = pgn.dataset.ply 
            ? parseInt(pgn.dataset.ply) 
            : false
        var displayHeaders = pgn.dataset.headers 
            ? pgn.dataset.headers.split(',') 
            : ['White', 'Black', 'Date', 'Event', 'Result']

        if (!chess.load_pgn(pgn.innerHTML.trim())) {
            return
        }

        if (reversed) {
            rows.reverse()
            cols.reverse()
        }

        var moves = chess.history({ verbose: true })
        var currentMoveIndex = (false !== startAtPly) 
            ? startAtPly 
            : moves.length

        function drawPieces(board) {
            for(y in rows) {
                for (x in cols) {
                    var fieldname = cols[x] + rows[y]
                    var field = board.querySelector('.' + fieldname)
                    var piece = chess.get(fieldname)
                    field.classList.remove(
                        'wk','wq','wr','wb','wn','wp',
                        'bk','bq','br','bb','bn','bp'
                    )
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
                    ((0 <= move.flags.indexOf('p')) ? move.promotion : '' )                        // promotion
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

        function getBoard() {
            board = document.createElement('div')
            board.classList.add('board')
            var color = 'white'
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

            return board
        }

        function importHeaders() {
            var importedHeaders = chess.header()
            
            for (filterName in displayHeaders) {
                var name = displayHeaders[filterName]
                var value = importedHeaders[name]

                headers[name] = value
            }
        }

        function drawHeader() {
            var infos = document.createElement('dl')
            infos.classList.add('info')
            for (headerName in headers) {
                var infoDt = document.createElement('dt')
                infoDt.appendChild(document.createTextNode(headerName))
                var infoDd = document.createElement('dd')
                infoDd.appendChild(document.createTextNode(headers[headerName]))
                infos.appendChild(infoDt)
                infos.appendChild(infoDd)
            }

            return infos
        }

        function getMoves(board) {
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
                    drawPieces(board)
                })

                if (currentMoveIndex - 1 == moveSpan.dataset.move) {
                    moveSpan.classList.add('current')
                }

                moveSpan.appendChild(
                    document.createTextNode(formatMove(moves[m]))
                )
                moveLi.appendChild(moveSpan)
            }

            return movesList
        }

        function getButtons(board) {
            var buttons = document.createElement('div')
            buttons.classList.add('buttons')
            function addButton(label, callback) {
                var button = document.createElement('button')
                button.appendChild(document.createTextNode(label))
                button.addEventListener('click', callback)
                buttons.appendChild(button)
            }

            addButton(labelReset, function(){
                chess.reset()
                drawPieces(board)
                currentMoveIndex = 0
            })

            addButton(labelBack, function(){
                if (!currentMoveIndex > 0) {
                    return
                }
                chess.undo()
                currentMoveIndex = currentMoveIndex -1
                drawPieces(board)
            })

            addButton(labelNext, function(){
                gotoMove(currentMoveIndex + 1)
                drawPieces(board)
            })

            addButton(labelTurn, function(){
                reversed = !reversed
                rows.reverse()
                cols.reverse()
                render()
            })

            return buttons
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

        function render() {
            pgn.innerHTML = ''
            if (true == showHeader) {
                pgn.appendChild(drawHeader())
            }
            gotoMove(currentMoveIndex)
            var board = getBoard()
            drawPieces(board)

            pgn.appendChild(board)

            if (true == showMoves) {
                pgn.appendChild(getMoves(board))
            }

            if (true == showMoves) {
                pgn.appendChild(getButtons(board))
            }
        }

        this.init = function() {
            importHeaders()
            render()
        }
    }

    forEach(document.querySelectorAll('.pgn'), function (index, pgn) {
        board = new Chessboard(pgn)
        board.init()
    })
}

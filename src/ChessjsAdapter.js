import Chess from 'chess.js';

export default class ChessjsAdapter {
    constructor(pgn) {
        this.chess = new Chess();

        if (!this.chess.load_pgn(pgn.trim().replace(/^\s+/gm, ''))) {
            console.log('Error loading pgn');
        }

        this.moves = this.chess.history({ verbose: true });
        this.currentMoveIndex = this.moves.length;
    }

    fields(ply) {
        if (typeof ply === 'undefined') { 
            ply = this.currentMoveIndex;
        }

        this.gotoMove(ply);

        return this.fieldNames().map((fieldName) => ({ 
            key: fieldName,
            piece: this.chess.get(fieldName) 
        }))        
    }

    formatedMoves() {
        return this.chess.history({ verbose: true }).map(move => this.formatMove(move));
    }

    info() {
        return this.chess.header();
    }

    gotoMove(moveIndex) {
            let moves = this.moves;

            if (moveIndex > moves.length) {
                return
            }

            this.chess.reset()
            for (let n = 0; n < moveIndex; n++) {
                console.log('move: ' +  moves[n]);
                this.chess.move(moves[n]);
            }
            
            console.log('gotoMove2');
            this.currentMoveIndex = moveIndex;
    }

    fieldNames() {
        let i = 0;
        let fieldNames = [];
        for (let r of ['8', '7', '6', '5', '4', '3', '2', '1']) {
            for (let c of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
                fieldNames[i] = c+r;
                i++;
            }
        }
        return fieldNames;
    }

    formatMove(move) {            
        if (!move) {
            return;
        }

        let pieceNames = {'k': 'K', 'q': 'Q', 'b': 'B', 'n': 'N', 'r': 'R', 'p': ''};
        var moveString = ''

        if (0 <= move.flags.indexOf('k')) { 
            moveString = 'O-O'
        } else if (0 <= move.flags.indexOf('q')) {
            moveString = 'O-O-O'
        } else {
            moveString = pieceNames[move.piece] +                                              // piece name
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
}

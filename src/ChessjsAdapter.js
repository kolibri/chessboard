import Chess from 'chess.js';

export default class ChessjsAdapter {
    constructor(pgn) {
        this.chess = new Chess();

        if (!this.chess.load_pgn(pgn.trim().replace(/^\s+/gm, ''))) {
            console.log('Error loading pgn');
        }

        this.moves = this.chess.history({ verbose: true });
        // console.log(this.moves);
    }

    info() {
        return this.chess.header();
    }

    // ply = -1 will return start position
    fields(ply) {
        if (ply > this.moves.length) {
            console.log('ply to high');
            return;
        }        

        this.chess.reset();
        console.log(ply);
        console.log('condition', !(ply < 0));
        if (!(ply < 0)) {
        console.log('true');
            for (let n = 0; n < ply+1; n++) {
                // console.log('move: ' +  this.moves[n]);
                this.chess.move(this.moves[n]);
            }
        }

        let i = 0;
        let fieldNames = [];
        for (let r of ['8', '7', '6', '5', '4', '3', '2', '1']) {
            for (let c of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
                fieldNames[i] = c+r;
                i++;
            }
        }

        return fieldNames.map((fieldName) => ({ 
            key: fieldName,
            piece: this.chess.get(fieldName) 
        }))        
    }

    getMove(ply){
        return this.moves[ply] ? this.moves[ply] : null;
    }

    formatedMoves() {
        function formatMove(move) {            
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
        return this.chess.history({ verbose: true }).map(move => formatMove(move));
    }
}

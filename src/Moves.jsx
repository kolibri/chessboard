import React from 'react';

export default class Moves extends React.Component {

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
                moveString = 
                    pieceNames[move.piece] +                                                       // piece name
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

    render() {
        let moves = this.props.moves;
        let movePairs = [];

        for (let i=0; i < moves.length; i=i+2) {
            movePairs.push({ w: moves[i], b: moves[i+1] ? moves[i+1]: null });
        }

        return (
            <ol className="moves">
                {movePairs.map((pair, key) => <li key={key}><span>{this.formatMove(pair.w)}</span><span>{this.formatMove(pair.b)}</span></li>)}
            </ol>
        )
    }
}


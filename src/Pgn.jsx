import React from 'react';
import Chess from 'chess.js';
import Board from './Board.jsx';
import Info from './Info.jsx';
import Moves from './Moves.jsx';


export default class Pgn extends React.Component {
    constructor(props) {
        super(props)

        let chess = new Chess();

        if (!chess.load_pgn(this.props.pgn.trim().replace(/^\s+/gm, ''))) {
            console.log('Error loading pgn');
        }

        this.state = {
            fields: this.fieldNames().map((fieldName) => ({ 
                key: fieldName,
                piece: chess.get(fieldName) 
            })),
            infos: chess.header(),
            moves: chess.history({ verbose: true }),
            chess: chess
        }

        // console.log(this.state);
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

    render() {
        // console.log(this.props.pgn);
        // console.log(this.state.infos);

        return (
            <div>
                <Board fields={this.state.fields} key="board"/>
                <Info infos={this.state.infos} key="info"/>
                <Moves moves={this.state.moves} key="moves"/>
            </div>
        )
    }
}

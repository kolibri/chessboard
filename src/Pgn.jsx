import React from 'react';
import ChessjsAdapter from './ChessjsAdapter.js';
import Board from './Board.jsx';
import Info from './Info.jsx';
import Moves from './Moves.jsx';

export default class Pgn extends React.Component {
    constructor(props) {
        super(props)
        this.adapter = new ChessjsAdapter(this.props.pgn);

        let moves = this.adapter.formatedMoves();

        this.state = {
            moves: moves,
            info: this.adapter.info(),
            ply: this.props.ply ? parseInt(this.props.ply) : moves.length
        }

        this.gotoMove = this.gotoMove.bind(this);
        // console.log(this.state);
    }

    gotoMove(moveIndex) {
        console.log('gotomove moveindex: ', moveIndex);
        console.log('gotomove state before: ', this.state);
        this.setState({ply: moveIndex});
        console.log('gotomove state afterwards: ', this.state);
    }

    render() {
        // console.log(this.props.pgn);
        // console.log(this.state.infos);

        return (
            <div>
                <Board fields={this.adapter.fields(this.state.ply)} key="board"/>
                <Info infos={this.state.info} key="info"/>
                <Moves moves={this.state.moves} onClickHandler={this.gotoMove} key="moves"/>
            </div>
        )
    }
}

import React from 'react';
import ChessjsAdapter from './ChessjsAdapter.js';
import Board from './Board.jsx';
import Info from './Info.jsx';
import Moves from './Moves.jsx';
import Controls from './Controls.jsx';

export default class Pgn extends React.Component {
    constructor(props) {
        super(props)
        this.adapter = new ChessjsAdapter(this.props.pgn);

        let moves = this.adapter.formatedMoves();

        this.state = {
            moves: moves,
            info: this.adapter.info(),
            ply: this.props.ply ? parseInt(this.props.ply) : moves.length,
            reverse: this.props.reverse ? this.props.reverse : false
        }
        
        this.gotoMove = this.gotoMove.bind(this);
        this.reverse = this.reverse.bind(this);
    }

    gotoMove(moveIndex) {
        this.setState({ply: moveIndex});
    }

    reverse(){
        this.setState({reverse: !this.state.reverse});
    }

    render() {
        return (
            <div>
                <Board 
                    fields={this.adapter.fields(this.state.ply)} 
                    move={this.adapter.getMove(this.state.ply)}
                    reverse={this.state.reverse}
                    key="board"/>
                <Controls 
                    ply={this.state.ply} 
                    total={this.state.moves.length} 
                    gotoMoveHandler={this.gotoMove}
                    reverseHandler={this.reverse}
                    key="controls" />
                <Info infos={this.state.info} key="info"/>
                <Moves 
                    moves={this.state.moves} 
                    onClickHandler={this.gotoMove}
                    currentMove={this.state.ply}
                    key="moves"/>
            </div>
        )
    }
}

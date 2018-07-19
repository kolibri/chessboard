import React from 'react';
import Piece from './Piece.jsx';

export default class Field extends React.Component {


    render() {
        let piece = piece 

        return (
            <div className={"field " + this.props.name} >
                {this.props.piece && <Piece color={this.props.piece.color} type={this.props.piece.type} />}
            </div>
        )
    }
}


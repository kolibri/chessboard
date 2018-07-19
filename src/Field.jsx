import React from 'react';
import Piece from './Piece.jsx';

export default class Field extends React.Component {
    render() {
        let piece = piece 
        let isFromClassname = this.props.move.from === this.props.name ? 'from ' : '' ;
        let isToClassname = this.props.move.to === this.props.name? 'to ' : '' ;
        let classes = "field " + isFromClassname + isToClassname + this.props.name;

        return (
            <div className={classes} >
                {this.props.piece && <Piece color={this.props.piece.color} type={this.props.piece.type} />}
            </div>
        )
    }
}


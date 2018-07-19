import React from 'react';
import Piece from './Piece.jsx';

export default class Field extends React.Component {
    render() {
        let piece = piece 

        let classNames = [
            'field',
            this.props.name,
            (this.props.move ? (this.props.move.from === this.props.name ? 'from ' : '') : ''),
            (this.props.move ? (this.props.move.to === this.props.name? 'to ' : '') : '' )
        ];

        let classes = classNames.join(' ');

        return (
            <div className={classes} >
                {this.props.piece && <Piece color={this.props.piece.color} type={this.props.piece.type} />}
            </div>
        )
    }
}


import React from 'react';

export default class Moves extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        let action = e.target.dataset.action;
        let moveIndex = 0;

        if ('back' === action) {
            moveIndex =  (this.props.ply > -1) ? this.props.ply - 1 : -1;
        }

        if ('next' === action) {
            moveIndex =  (this.props.ply < this.props.total - 1) ? this.props.ply + 1 : this.props.total -1;
        }
        if ('start' === action) {
            moveIndex = -1;
        }
        if ('end' === action) {
            moveIndex = this.props.total - 1;
        }
        
        this.props.gotoMoveHandler(moveIndex);
    }

    render() {
        return (
            <div>
            <button onClick={this.clickHandler} data-action="back">back</button>
            <button onClick={this.clickHandler} data-action="next">next</button>
            <button onClick={this.clickHandler} data-action="start">start</button>
            <button onClick={this.clickHandler} data-action="end">end</button>
            </div>
        )
    }
}


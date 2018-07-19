import React from 'react';

export default class Piece extends React.Component {


    render() {
        let pieceName = this.props.color + this.props.type;

        let codeMap = {
            wk: '\u2654',
            wq: '\u2655',
            wr: '\u2656',
            wb: '\u2657',
            wn: '\u2658',
            wp: '\u2659',
            bk: '\u265A',
            bq: '\u265B',
            br: '\u265C',
            bb: '\u265D',
            bn: '\u265E',
            bp: '\u265F'
        }
 //'\u03A9';
        return (<span className={"piece " + pieceName} >{codeMap[pieceName]}</span>)
    }
}

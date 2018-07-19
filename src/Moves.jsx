import React from 'react';

export default class Moves extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        this.props.onClickHandler(parseInt(e.target.dataset.index));
    }

    render() {
        let moves = this.props.moves;
        let movePairs = [];

        for (let i=0; i < moves.length; i=i+2) {
            movePairs.push({ 
                w: {index: i+1, move: moves[i] }, 
                b: moves[i+1] ? {index: i+2, move: moves[i+1] }: null 
            });
        }

        return (
            <ol className="moves">
                {movePairs.map((pair, key) => 
                    <li key={key}>
                    <span onClick={this.clickHandler} data-index={pair.w.index}>
                        {pair.w.move}
                    </span>
                    {pair.b !== null &&             
                        <span onClick={this.clickHandler} data-index={pair.b.index}>
                            {pair.b.move}
                        </span>
                    }                    
                    </li>)}
            </ol>
        )
    }
}


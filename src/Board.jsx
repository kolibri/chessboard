import React from 'react';
import Field from './Field.jsx';

export default class Board extends React.Component {
    render() {
        return (
            <div className="board">
                {this.props.fields.map((field) => <Field piece={field.piece} name={field.key} key={field.key} />)}
            </div>
        )
    }
}

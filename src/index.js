import React from 'react';
import ReactDOM from 'react-dom';

const Input = ({
    value,
}) => {
    return (
        <input 
        value={ value }
        />
    );
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            offers: [],
            inputValue: 'First Commit!',
        };
    }

    render() {
        const { offers, inputValue } = this.state;
        return (
            <div>
                <Input 
                    value={ inputValue }
                    />
                <button> 
                    Here is a sample button
                </button>
            </div>
        );
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
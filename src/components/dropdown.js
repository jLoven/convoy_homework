'use strict';

//  Adapted from:
//  https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/src/components/Dropdown.js

import React, { Component } from 'react';
import './../styles/dropdown.css';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
        this.close = this.close.bind(this);
    }

    componentDidUpdate() {
        const { listOpen } = this.state;
        setTimeout(() => {
            if(listOpen) {
                window.addEventListener('click', this.close);
            }
            else {
                window.removeEventListener('click', this.close);
            }
        }, 0);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.close);
    }

    close(timeOut) {
        this.setState({ listOpen: false });
    }

    selectItem(title, id) {
        this.setState({
            headerTitle: title,
            listOpen: false
        }, this.props.selectDropdownItem(id));
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    render() {
        const { list } = this.props;
        const { listOpen, headerTitle } = this.state;
        return (
            <div>
                <div onClick={() => this.toggleList()}>
                    { headerTitle } { '\u2304' }
                </div>
                { listOpen && <ul className='dropdown-content' onClick={ e => e.stopPropagation() }>
                    {list.map((item)=> (
                        <li className='dropdown-content-links dropdown-title-label'
                            key={ item.id }
                            onClick={() => this.selectItem(item.title, item.id)}>
                                {item.title}
                        </li>
                    ))}
                </ul>}
            </div>
        );
    }
}

export default Dropdown;

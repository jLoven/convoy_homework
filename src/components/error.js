'use strict';

import React, { Component } from 'react';
import TortoiseImage from '../images/russki_the_tortoise.png';
import '../styles/errorpage.css';

class Error extends Component {
	render() {
		return(
			<div className='error-text'>
                <div className='error-image'>
                    <img src={ TortoiseImage } alt='Russki the Tortoise is sorry' />
                </div>
                Sorry, something went wrong. Please refresh the page.
            </div>
        );
	}
}

export default Error;
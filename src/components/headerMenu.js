'use strict';

import React, { Component } from 'react';
import ConvoyLogoImage from '../images/convoy_logo.png';
import '../styles/offers.css';
import '../styles/header.css';

class HeaderMenu extends Component {
	render() {
		return(
			<div className='list-background header-text subheading-text'>
				<div>
	                <img src={ConvoyLogoImage} alt='Convoy Logo' className='logo' />
	            </div>
	            <div className='header-tab'>
	                Offers
	            </div>
            </div>
        );
	}
}

export default HeaderMenu;


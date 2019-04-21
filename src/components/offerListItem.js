'use strict';

import React, { Component } from 'react';
import LocationConnectingLineImage from './../images/location_connecting_line.png';
import './../styles/offers.css';

class OfferListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { offerDataUi } = this.props;
        return (
            <li className='list-separator flex-container'>
                <div className='location-connecting-line-wrapper'>
                    <img 
                        src={ LocationConnectingLineImage }
                        alt='Line between two dots'
                        className='location-connecting-line' />
                </div>
                <div className='location-and-date-flex-div '>
                    <div className='location-text wide-letter-spacing'>{ offerDataUi.originDisplayString }</div>
                    <div className='date-text subheading-text'>{ offerDataUi.pickupTimeRangeDisplayString }</div>
                    <div className='location-text wide-letter-spacing'>{ offerDataUi.destinationDisplayString }</div>
                    <div className='date-text subheading-text'>{ offerDataUi.dropoffTimeRangeDisplayString }</div>
                </div>
                <div className='large-hidden-flex-div'></div>
                <div className='wide-letter-spacing'>{ offerDataUi.distanceDisplayString }</div>
                <div className='hidden-flex-div'></div>
                <div className='price-text wide-letter-spacing'>{ offerDataUi.priceDisplayString }</div>
            </li>
        );
    }
}

export default OfferListItem;
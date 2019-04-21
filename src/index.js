'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for items in Offers list
var fetch = require('fetch-retry');

import Dropdown from './components/dropdown.js';
import HeaderMenu from './components/headerMenu.js';
import Error from './components/error.js';

import { DROPDOWN_VALUES, RETRY_CONDITIONS } from './constants/constants.js';
import { getOfferDataUiList } from './extractor/dataExtractor.js';
import { getApiEndpointWithQueryParams, getNextPaginationStart } from './provider/apiEndpointProvider.js';

import './styles/offers.css';
import './styles/dropdown.css';

import LocationConnectingLineImage from './images/location_connecting_line.png';


class App extends Component {
    constructor() {
        super();
        this.state = {
            offers: [],
            error: null,
            isLoaded: false,
            paginationStart: 0,
            sortParam: 'pickupDate',
            sortType: DROPDOWN_VALUES,
        };
    }

    /*
     * Updates the state to include the newest batch of offers, retrieved with retries.
     * Offers are updated to include the newest batch of paginated results,
     * and the array is replaced with one batch of paginated results if a new sort type is selected.
     */
    getNextPaginatedOffers(endpoint, shouldReplaceCurrentResultsOnUi) {
        const { offers, paginationStart } = this.state;
        const newPaginationStart = getNextPaginationStart(paginationStart);

        fetch(endpoint, RETRY_CONDITIONS)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    offers: shouldReplaceCurrentResultsOnUi ? result : offers.concat(result),
                    paginationStart: newPaginationStart,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    componentDidMount() {
        const { paginationStart, sortParam } = this.state;
        const endpoint = getApiEndpointWithQueryParams(paginationStart, sortParam);
        this.getNextPaginatedOffers(endpoint, false);
    }

    selectDropdownItem = (id) => {
        this.setState({
            paginationStart: 0,
            sortParam: DROPDOWN_VALUES[id].sortParam }, () => {
                const { paginationStart, sortParam} = this.state;
                const endpoint = getApiEndpointWithQueryParams(paginationStart, sortParam);
                this.getNextPaginatedOffers(endpoint, true);
            });
    }

    render() {
        const { error, isLoaded, offers, inputValue, paginationStart, sortParam } = this.state;
        const offerDataUiList = getOfferDataUiList(offers);
        if (error) {
            console.log('Error in rendering Convoy Homework: ', error.message);
            return <Error />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <HeaderMenu />
                        <div className='rounded-corner-boundary dropdown-text dropdown list-element-margin'>
                            Sort by: <Dropdown
                                title={ DROPDOWN_VALUES[0].title }
                                list={ this.state.sortType }
                                selectDropdownItem={ this.selectDropdownItem } />
                        </div>
                        <ul className='list-background list-boundary rounded-corner-boundary list-element-margin'>
                            {offerDataUiList.map(offerDataUi => (
                                <li className='list-separator flex-container' key={ shortid.generate() }>
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
                            ))}
                        </ul>
                        <button className='show-more-button rounded-corner-boundary subheading-text' onClick={() =>
                            this.getNextPaginatedOffers(
                                getApiEndpointWithQueryParams(paginationStart, sortParam),
                                false)
                        }>Show More</button>
                    </div>
                    <div className='name-text'>Jackie Loven's Homework</div>
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
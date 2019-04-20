'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Generate unique key for items in Offers list
var fetch = require('fetch-retry');

import Dropdown from './components/dropdown.js';
import HeaderMenu from './components/headerMenu.js';
import Error from './components/error.js';

import { OFFERS_API, OFFERS_PER_REQUEST, DROPDOWN_VALUES, RETRY_CONDITIONS } from './constants/constants.js';
import { formatTimestamp, formatPriceInUsd, formatDistance, formatTimestampRange } from './format/formatter.js';

import './styles/offers.css';
import './styles/dropdown.css';

/*
 * Extracts fields from the offer to construct an object holding values for use in the UI.
 * Assumes that there will always be offer.origin.pickup.start and end and offer.destination.dropoff.start and end.
 */
function constructOfferDataUi(offer) {
    var offerDataUi = {};
    offerDataUi.priceDisplayString = formatPriceInUsd(offer.offer);
    if (offer.origin !== null) {
        offerDataUi.originDisplayString = offer.origin.city + ', ' + offer.origin.state;
    }
    if (offer.destination !== null) {
        offerDataUi.destinationDisplayString = offer.destination.city + ', ' + offer.destination.state;
    }

    offerDataUi.pickupTimeRangeDisplayString = formatTimestampRange(offer.origin.pickup.start, offer.origin.pickup.end);
    offerDataUi.dropoffTimeRangeDisplayString = formatTimestampRange(offer.destination.dropoff.start, offer.destination.dropoff.end);
    offerDataUi.distanceDisplayString = formatDistance(offer.miles);

    return offerDataUi;
}

/*
 * Returns a list of offerDataUi objects given a list of JSON offers objects.
 */
function getOfferDataUiList(offers) {
    return offers.map(offer => constructOfferDataUi(offer));
}

/*
 * Returns a string containing the full offers API endpoint, 
 * given a sort type and an index from which to offset results.
 */
function getApiEndpointWithQueryParams(paginationStart, sortParam) {
    return OFFERS_API 
        + 'limit=' + OFFERS_PER_REQUEST 
        + '&offset=' + paginationStart
        + '&sort=' + sortParam;
}

function getNextPaginationStart(previousPaginationStart, addToOffset) {
    return previousPaginationStart + (addToOffset ? OFFERS_PER_REQUEST : 0);
}

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
     * Updates the state to include the newest batch of offers.
     * Offers are updated to include the newest batch of paginated results,
     * and the array is replaced with one batch of paginated results if a new sort type is selected.
     * API call is made with retries.
     */
    getNextPaginatedOffers(endpoint, addToOffset, replaceCurrentResultsOnUi) {
        const { offers, paginationStart } = this.state;
        const newPaginationStart = getNextPaginationStart(paginationStart, addToOffset);

        fetch(endpoint, RETRY_CONDITIONS)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    offers: replaceCurrentResultsOnUi ? result : offers.concat(result),
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
        this.getNextPaginatedOffers(endpoint, true, false);
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]));
        this.setState({ 
            [key]: temp,
            paginationStart: 0,
            sortParam: temp[id].sortParam }, () => {
                const { paginationStart, sortParam} = this.state;
                const endpoint = getApiEndpointWithQueryParams(paginationStart, sortParam);
                this.getNextPaginatedOffers(endpoint, true, true);
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
                    <div className='page-background'>
                        <HeaderMenu />
                        <div className='rounded-corner-boundary dropdown-text dropdown'>
                            Sort by: <Dropdown
                                title={ DROPDOWN_VALUES[0].title }
                                list={ this.state.sortType }
                                resetThenSet={ this.resetThenSet } />
                        </div>
                        <ul className='list-background list-boundary rounded-corner-boundary'>
                            {offerDataUiList.map(offerDataUi => (
                                <li className='list-separator' key={ shortid.generate() }>
                                    <div>{ offerDataUi.priceDisplayString }</div>
                                    <div>From: { offerDataUi.originDisplayString }</div>
                                    <div>Pickup time: { offerDataUi.pickupTimeRangeDisplayString }</div>
                                    <div>To: { offerDataUi.destinationDisplayString }</div>
                                    <div>Dropoff time: { offerDataUi.dropoffTimeRangeDisplayString }</div>
                                    <div>Distance: { offerDataUi.distanceDisplayString }</div>
                                </li>
                            ))}
                        </ul>
                        <button className='show-more-button rounded-corner-boundary' onClick={() =>
                            this.getNextPaginatedOffers(
                                getApiEndpointWithQueryParams(paginationStart, sortParam), 
                                true,
                                false)
                        }>Show More</button>
                    </div>
                    <div className='name-text'>Jackie's Homework</div>
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
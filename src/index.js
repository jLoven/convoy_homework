'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var fetch = require('fetch-retry');
import shortid from 'shortid'; //  Used to generate unique key for items in Offers list

import Dropdown from './components/dropdown.js';
import HeaderMenu from './components/headerMenu.js';
import Error from './components/error.js';
import OfferListItem from './components/offerListItem.js';

import { DROPDOWN_VALUES, RETRY_CONDITIONS, SORT_BY_TEXT, LOADING_TEXT, SHOW_MORE_TEXT } from './constants/constants.js';
import { getOfferDataUiList } from './extractor/dataExtractor.js';
import { getApiEndpointWithQueryParams, getNextPaginationStart } from './provider/apiEndpointProvider.js';

import './styles/offers.css';
import './styles/dropdown.css';

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

    /*
     * Adds the first page of offers with default sort to the page when it loads.
     */
    componentDidMount() {
        const { paginationStart, sortParam } = this.state;
        const endpoint = getApiEndpointWithQueryParams(paginationStart, sortParam);
        this.getNextPaginatedOffers(endpoint, false);
    }

    /*
     * Retrieves a new page of offers when a new dropdown sort option is selected,
     * given a dropdown sortType id.
     */
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
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return (
                <div>
                    <HeaderMenu />
                    <div className='rounded-corner-boundary dropdown-text dropdown list-element-margin subheading-text'>
                        <span className='dropdown-sortby-text'>{ SORT_BY_TEXT }</span>
                        <Dropdown
                                title={ DROPDOWN_VALUES[0].title }
                                list={ this.state.sortType }
                                selectDropdownItem={ this.selectDropdownItem } />
                    </div>
                    <ul className='list-background list-boundary rounded-corner-boundary list-element-margin shadow'>
                        {offerDataUiList.map(offerDataUi => (
                            <OfferListItem offerDataUi={ offerDataUi } key={ shortid.generate() } />
                        ))}
                    </ul>
                    <button 
                        className='show-more-button rounded-corner-boundary subheading-text'
                        onClick={() => this.getNextPaginatedOffers(
                                getApiEndpointWithQueryParams(paginationStart, sortParam),
                                false)}
                    >{ SHOW_MORE_TEXT }</button>
                    <div className='name-text list-background'>Jackie Loven's Homework</div>
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
'use strict';

//  Location of offers API
const OFFERS_API = 'https://convoy-frontend-homework-api.herokuapp.com/offers?';

//  Date format used to display dates on the UI
const DATE_FORMAT = 'ddd M/D hh:mma';

//  Offers retreived per page during pagination on the UI
const OFFERS_PER_REQUEST = 3;

//  Values to populate the sort option dropdown menu with their displayable titles.
const DROPDOWN_VALUES = [
    {
        id: 0,
        key: 'sortType',
        sortParam: 'pickupDate',
        title: 'Pickup Date',
    },
    {
        id: 1,
        key: 'sortType',
        sortParam: 'dropoffDate',
        title: 'Dropoff Date',
    },
    {
        id: 2,
        key: 'sortType',
        sortParam: 'price',
        title: 'Price',
    },
    {
        id: 3,
        key: 'sortType',
        sortParam: 'origin',
        title: 'Origin',
    },
    {
        id: 4,
        key: 'sortType',
        sortParam: 'destination',
        title: 'Destination',
    },
    {
        id: 5,
        key: 'sortType',
        sortParam: 'miles',
        title: 'Miles',
    },
];

/*
 * Settings for the 'fetch-retry' Ajax call.
 * retries: number of retries
 * retryDelay: milliseconds between requests
 * retryOn: List of HTTP status codes to trigger a retry.
 */
const RETRY_CONDITIONS = { 
	retries: 3,
	retryDelay: 250,
	retryOn: [500],
};

const SORT_BY_TEXT = 'Sort by:';
const LOADING_TEXT = 'Loading...';
const SHOW_MORE_TEXT = 'Show More';

export {
    OFFERS_API,
    DATE_FORMAT,
    OFFERS_PER_REQUEST,
    DROPDOWN_VALUES,
    RETRY_CONDITIONS,
    SORT_BY_TEXT,
    LOADING_TEXT,
    SHOW_MORE_TEXT,
};
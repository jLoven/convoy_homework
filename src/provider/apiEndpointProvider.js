'use strict';

import { OFFERS_API, OFFERS_PER_REQUEST } from '../constants/constants.js';

/*
 * Returns a string containing the full offers API endpoint, 
 * given a sort type and an index from which to offset results.
 * API documentation: https://convoy-frontend-homework-api.herokuapp.com/
 */
function getApiEndpointWithQueryParams(paginationStart, sortParam) {
    return OFFERS_API 
        + 'limit=' + OFFERS_PER_REQUEST 
        + '&offset=' + paginationStart
        + '&sort=' + sortParam;
}

function getNextPaginationStart(previousPaginationStart) {
    return previousPaginationStart + OFFERS_PER_REQUEST;
}

export {
    getApiEndpointWithQueryParams,
    getNextPaginationStart,
};
'use strict';

import { DATE_FORMAT } from '../constants/constants.js';
var moment = require('moment');

/*  
 * Formats a timestamp as 'Mon 4/30 02:00am' given a timestamp in the format '2018-04-30T09:00:00.000Z'
 */
function formatTimestamp(timestampString) {
    return moment(timestampString).format(DATE_FORMAT);
}

/* 
 * Formats a price as a string in USD. Example: '2500' is formatted as '$2,500.00'
 * TODO: Internationalize this to support other currencies of user's preference.
 */
function formatPriceInUsd(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price);
}

/*
 * Formats a given number as a distance in miles. Example: '1000' is formatted as '1,000 miles'.
 */
function formatDistance(miles) {
    return miles.toLocaleString() + ' miles';
}

/* 
 * Takes two timestamps and returns a string containing both formatted.
 * TODO: Utilize library such as Twix (http://isaaccambron.com/twix.js/) to format timestamp ranges.
 */
function formatTimestampRange(startTimestamp, endTimestamp) {
    if (startTimestamp === endTimestamp) {
        return formatTimestamp(startTimestamp);
    } else {
        return formatTimestamp(startTimestamp) + ' — ' + formatTimestamp(endTimestamp);
    }
}

export {
    formatTimestamp,
    formatPriceInUsd,
    formatDistance,
    formatTimestampRange,
};
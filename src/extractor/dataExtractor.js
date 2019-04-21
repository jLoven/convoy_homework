'use strict';

import { formatPriceInUsd, formatDistance, formatTimestampRange } from '../format/formatter.js';

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

export {
    constructOfferDataUi,
    getOfferDataUiList,
};
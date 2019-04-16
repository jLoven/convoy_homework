import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Generate unique key for items in Offers list
var moment = require('moment');
const DATE_FORMAT = 'ddd M/D hh:mma';

const Input = ({
    value,
}) => {
    return (
        <input 
        value={ value }
        />
    );
};

/*  
** Formats a timestamp as 'Mon 4/30 02:00am' given a timestamp in the format '2018-04-30T09:00:00.000Z'
*/
function formatTimestamp(timestampString) {
    return moment(timestampString).format(DATE_FORMAT);
}

/* 
** Formats a price as a string in USD. Example: '2500' is formatted as '$2,500.00'
** TODO: Internationalize this to support other currencies of user's preference.
*/
function formatPriceInUsd(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price);
}

function formatDistance(miles) {
    return miles.toLocaleString() + ' miles';
}

/* 
** Takes two timestamps and returns a string containing both formatted.
** TODO: Utilize library such as Twix (http://isaaccambron.com/twix.js/) to format timestamp ranges.
*/
function formatTimestampRange(startTimestamp, endTimestamp) {
    return formatTimestamp(startTimestamp) + ' — ' + formatTimestamp(endTimestamp);
}

/*
** Extracts fields from the offer to construct an object holding values for use in the UI.
** Assumes that there will always be offer.origin.pickup.start and end and offer.destination.dropoff.start and end.
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

function getOfferDataUiList(offers) {
    return offers.map(offer => constructOfferDataUi(offer));
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            offers: [],
            error: null,
            isLoaded: false,
            inputValue: 'First Commit!',
        };
    }

    componentDidMount() {
        fetch("https://convoy-frontend-homework-api.herokuapp.com/offers?limit=20")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    offers: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, offers, inputValue } = this.state;
        const offerDataUiList = getOfferDataUiList(offers);
        if (error) {
            console.log('Error in rendering Convoy Homework: ', error.message)
            return <div>Sorry, something went wrong. Please refresh the page.</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {offerDataUiList.map(offerDataUi => (
                        <li key={ shortid.generate() }>
                            <div>{ offerDataUi.priceDisplayString }</div>
                            <div>From: { offerDataUi.originDisplayString }</div>
                            <div>Pickup time range: { offerDataUi.pickupTimeRangeDisplayString }</div>
                            <div>To: { offerDataUi.destinationDisplayString }</div>
                            <div>Dropoff time range: { offerDataUi.dropoffTimeRangeDisplayString }</div>
                            <div>Distance: { offerDataUi.distanceDisplayString }</div>
                        </li>
                    ))}
                </ul>
            );
        }

        /*return (
            <div>
                <Input 
                    value={ inputValue }
                    />
                <button> 
                    Here is a sample button
                </button>
            </div>
        );*/
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
Author: Jackie Loven
Date: 21 April 2019

#### View Convoy Frontend Homework: http://jackieloven.com/convoy-homework/

## Open questions for PMs + designers
- What are customers' preferred browsers? *Currently, the design does not support Internet Explorer 10 and older.*
- How do mocks for a mobile experience differ? *Current [desktop experience](https://github.com/jLoven/convoy_homework/blob/master/src/screenshots/screenshot_desktop.png) and [mobile experience](https://github.com/jLoven/convoy_homework/blob/master/src/screenshots/screenshot_mobile.png) screenshots.*
- What is the ideal pagination behavior when clicking ‘Show More’? *Currently, 3 offers at a time appear below existing offers.*
- What is a typical flow for making an offer `REQUESTED`?
- What is the preferred timestamp range format? *Current implementation: `Mon 4/29 05:00am — Mon 4/29 10:00am`, `Mon 4/29 05:00am — Mon 4/30 10:00am`, and `Mon 4/29 05:00am`.*
- When a time range for pickup or dropoff is saved by a shipper, will it always contain a start and end time?
- What is the preferred money format? *Current implementation examples: `$906.00` and `$2,089.50`.*
- What should be shown to users if the service is down? *Current implementation if the service call fails more than 4 times in 1 second: [error page](https://github.com/jLoven/convoy_homework/blob/master/src/screenshots/screenshot_error_page.png).*
- Do a customer’s sort settings and/or pagination need to be saved for subsequent page loads? *Currently, they are not saved.*

## Remaining Work/ Known Issues
Project statement: Deliver a web app that queries a JSON API from the browser and renders the resulting shipment offers according to the provided [design](http://bit.ly/fe-hw-design). The app should allow the user to paginate through offers and sort them based upon `pickupDate` (default), `dropoffDate`, `price`, `origin`, `destination`, or `miles`.


### Remaining work
[Project planning board](https://trello.com/invite/b/dCSvHQb6/eb56018e1c9fe606fd905e03008d12f0/convoy-homework)
- Usability testing of implementation
- JavaScript unit tests
- Accessibility review (test for blind/ low-sighted users) 
- Internationalization (allow users to select currency and language)
- Latency improvements if needed (users may have slow networks)
- Use Proxima Nova typeface when it is licensed + icons when assets are received
### Known issues
- Sort/ pagination settings are not saved on page reload (see question for PMs above)
- When image of two dots with connecting line doesn't load fast enough, the alt text shows and pushes flex box items to the right for a moment. On mobile, the timestamp range takes up two lines (can be fixed with a library like [Twix](http://isaaccambron.com/twix.js/) to shorten the range), so the two dots and connecting line doesn't actually connect the two location names.
- Typeface is currently Montserrat (free) and not Proxima Nova, icons are approximations.
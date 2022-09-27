# natex-api
Ticket finder library for National Express UK

#### fyi, this currently does not display connections correctly, only the first journey

<details><summary>Changelog</summary>

- **0.0.2** - 🐛 whoops. forgot to fix date and time on routesearch
- **0.0.1** - :tada: Released with all core features
</details>


# EXAMPLES
```js
import * as natex from 'natex-api';
natex.stationSearch('london'); // Expected input: a place
/* Expected output:
[
{
  locationName: 'LONDON (Most Popular)',
  locationCode: '57000',
  isAirport: false,
  latitude: null, // these are null as the location is not a specific location. most locations will have a latitude and longitude
  longitude: null,
},
{
  locationName: 'London Central (LONDON VICTORIA Coach Station',
  locationCode: '57366',
  isAirport: false,
  latitude: '51.492670', // these are null as the location is not a specific location. most locations will have a latitude and longitude
  longitude: '-0.149220',
},
{
...
}
]
*/

natex.routeSearch(41000, 57000, { // Expected input: Departure ID, Arrival ID, optional: options (specified below)
  leaving: {
    departAfterOrArriveBy: 'DEPART_AFTER' // options: DEPART_AFTER, ARRIVE_BY default: DEPART_AFTER
    date: "20/09/2022", // default: Date.now()
    time: "00:00" // default: Date.now()
  },
  passengers: {
    adults: 1, // default: 1
    children: 0, // default: 0
    infants: 0 // default: 0
  },
  coachCards: {
    youthCoachcard: 0, // default: 0
    seniorCoachard: 0, // default: 0
    disabledCoachcard: 0 // default: 0
  }
});
/* Expected output:
[
{
  departureID: "41065",
  departureName: "BRISTOL Bus & Coach Station",
  destinationID: "57366",
  destinationName: "LONDON VICTORIA Coach Station",
  busNumber: "040",
  isAvailable: true
  departureDateTime: "2022-09-20T12:00:00"
  arrivalDateTime: "2022-09-20T15:00:00"
  fare: {
    amount: "8.90" // Will always be pounds
    discount: "0"
  },
  seats: {
    lowAvailability: false
    seatStock: 29,
    maxCapacity: 72,
    unbookReason: null
  }
},
{
  departureID: "41065",
  departureName: "BRISTOL Bus & Coach Station",
  destinationID: "57286",
  destinationName: "HEATHROW Airport London T2,3 (LHR)",
  busNumber: "201",
  isAvailable: false
  departureDateTime: "2022-09-20T13:00:00"
  arrivalDateTime: "2022-09-20T15:05:00"
  fare: {
    amount: "54" // Will always be pounds
    discount: "0"
  },
  seats: {
    lowAvailability: false
    seatStock: 0,
    maxCapacity: 53,
    unbookReason: "Seat Availability"
  }
},
{
...
}
]

*/
```

# TODO
### core features
- [x] Station Search
- [x] Route search
### additional core feature
- [ ] Display multiple connections for Route Search
### additional features
- [ ] Bypass ratelimit of route search of 3req/m
- [ ] Ability to search for return journeys
  - afaik National Express dont have a discount on returns
- [ ] Look for all Journey stops

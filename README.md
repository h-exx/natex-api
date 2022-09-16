# ⚠️⚠️⚠️ WORK IN PROGRESS

# natex-api
Ticket finder library for National Express UK


# EXAMPLES
```js
import * as natex from 'natex-api';
natex.stationSearch('london'); // Expected input: a place
/* Expected output:
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
},{
...
}
*/

natex.routeSearch(43345, 57366, { // Expected input: Departure ID, Arrival ID
  leaving: {
    departAfterOrArriveBy: 'DEPART_AFTER' // options: DEPART_AFTER, ARRIVE_BY default: DEPART_AFTER
    date: "16/09/2022", // default: Date.now()
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
{
  departureID: "43345",
  departureName: "PLYMOUTH Coach Station, Armada Way",
  destinationID: "57366",
  destinationName: "LONDON VICTORIA Coach Station"
}
*/
```

# TODO
### core features
- [x] Station Search
- [ ] Route search
### additional features
- [ ] Bypass ratelimit of route search of 3req/m
- [ ] Ability to search for return journeys
  - afaik National Express dont have a discount on returns
- [ ] Check Journey

# ⚠️⚠️⚠️ WORK IN PROGRESS

# natex-api
Ticket finder library for National Express UK


# EXAMPLES
```js
import * as natex from 'natex-api';
natex.stationSearch('london');
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
```

# TODO
### core features
- [x] Station Search
- [ ] Route search
### additional features
- [ ] Bypass ratelimit of route search of 3req/m
- [ ] Check Journey

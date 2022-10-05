import fetch from 'node-fetch';

export default function async (place) {
    return new Promise ((resolve) => {
        fetch(`https://www.nationalexpress.com/umbraco/api/stationsapi/search?term=${encodeURI(place)}&isorigin=true&disableGeoSearch=True`, {
            method: 'GET',
            headers: {'User-Agent': `natex-api/0.0.5`, 'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate, br'}
        }).then(async res => {
            let response = await res.json();
            let stations = [];
            await response[0].Stations.forEach((station) => {
                stations.push({locationName: station.LocationName, locationCode: station.LocationCode, isAirport: station.IsAirport, latitude: station.Latitude, longitude: station.Longitude});
            });
            resolve(stations);
        });
    });
}


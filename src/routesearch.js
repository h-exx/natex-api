import fetch from 'node-fetch';

export default function async (from, to, options) {
    const nowdate = new Date().toISOString().split('T')
    options = options || {
        leaving: {
            departAfterOrArriveBy: 'DEPART_AFTER',
            date: nowdate[0].replace(/-/g,"/"),
            time: `${nowdate[1].split(':')[0]}:${nowdate[1].split(':')[1]}`,
        },
        passengers: {
            adults: 1,
            children: 0,
            infants: 0,
        },
        coachCards: {
            youthCoachcard: 0,

        }
    }
    let 
    if (!options.coachCards) {}
    return new Promise (async (resolve, reject) => {
        await fetch(`https://book.nationalexpress.com/nxrest/journey/search/OUT`, {
            method: 'POST',
            headers: {'User-Agent': `natex-api/0.0.1`, 'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate, br'},
            body: {
                coachCard: 
            }
        }).then(async res => {
            let response = await res.json();
            let route = [];
            await response[0].Stations.forEach((station) => {
                stations.push({locationName: station.LocationName, locationCode: station.LocationCode, isAirport: station.IsAirport, latitude: station.Latitude, longitude: station.Longitude});
            });
            resolve(route);
        });
    });
};
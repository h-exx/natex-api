import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export default function async (from, to, options) {
    if (!options) {options = {leaving:{},passengers:{},coachCards:{}};}
    const nowdate = new Date().toISOString().split('T')
    let haveCoachCard = false
    if (options.coachCards) {haveCoachCard = true};

    return new Promise (async (resolve, reject) => {
        await fetch(`https://book.nationalexpress.com/nxrest/journey/search/OUT`, {
            method: 'POST',
            headers: {'User-Agent': `natex-api/0.0.1`, 'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br', 'content-type': 'application/json'},
            body: JSON.stringify({
                coachCard: haveCoachCard,
                campaignId: "DEFAULT",
                partnerId: "NX",
                outboundArriveByOrDepartAfter: options.departAfterOrArriveBy || "DEPART_AFTER",
                journeyType: "SINGLE",
                operatorType: "DOMESTIC",
                leaveDateTime: {
                    date: options.leaving.date || nowdate[0],
                    time: options.leaving.time || nowdate[1]
                },
               passengerNumbers: {
                    numberOfAdults: options.passengers.adults || 1,
                    numberOfBabies: options.passengers.infants || 0,
                    numberOfChildren: options.passengers.children || 0,
                    numberOfDisabled: 0,
                    numberOfSeniors: 0,
                    numberOfEuroAdults: 0,
                    numberOfEuroSeniors: 0,
                    numberOfEuroYoungPersons: 0,
                    numberOfEuroChildren: 0
               },
               coachCardNumbers: {
                    numberOnDisabledCoachcard: options.coachCards.disabledCoachcard || 0,
                    numberOnSeniorCoachcard: options.coachCards.seniorCoachcard || 0,
                    numberOnYouthCoachcard: options.coachCards.youthCoachcard || 0,
               },
               returnDateTime: {
                    date: null,
                    time: null
               },
               fromToStation: {
                    fromStationId: from.toString(),
                    toStationId: to.toString()
               },
               onDemand: false,
               fromStationName: null,
               toStationName: null,
               languageCode: "en",
               channelsKey: "DESKTOP",
               searchKey: uuidv4()
            })
        }).then(async res => {
            let response = await res.text();
            if (response.includes('<META NAME="robots" CONTENT="noindex,nofollow">')) return reject(new Error('Rate limited/IP Blocked'));
            const responseJSON = JSON.parse(response);
            //console.log(responseJSON);
            if (responseJSON.errorMessage) {
                switch(responseJSON.errorMessage) {
                    case 'errors.noResults':
                        return resolve([]);
                };
            }
            let route = [];
            responseJSON.journeyCommand.forEach((journey) => {
                //console.log(journey);
                let temproute = {
                    departureID: journey.legs[0].departureStopId,
                    departureName: journey.legs[0].departureStop,
                    destinationID: journey.legs[0].destinationStopId,
                    destinationName: journey.legs[0].destinationStop,
                    busNumber: journey.legs[0].serviceId,
                    isAvailable: journey.hasAvailability,
                    departureDateTime: journey.legs[0].departureDateTime,
                    arrivalDateTime: journey.legs[0].arrivalDateTime,
                    fare: {
                        amount: (journey.fare.grossAmountInPennies/100)||null,
                        discount: (journey.fare.discountInPennies/100)||null,
                    },
                    seats: {
                        lowAvailability: journey.isLowAvailability,
                        seatStock: journey.seatStock,
                        maxCapacity: journey.maxCapacity,
                        unbookReason: journey.unbookReason||null
                    }
                };
                route.push(temproute);
            });
            resolve(route);
        }).catch(err => {return reject(err);});
    });
};
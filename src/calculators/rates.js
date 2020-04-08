import {isEmpty, arrayAverage, sumDay} from './basics';

export function calculateRates(data) {
    var firstKey = true;
    var previousDayData = [0, 0, 0];
    var confirmedRates = [];
    var recovRates = [];
    var deathsRates = [];

    if (isEmpty(data))
        return {DeathsRate: 0, RecoveredRate: 0, ConfirmedRate: 0};
    for (var key in data) {
        if (data[key] === null)
            continue;
        let res = sumDay(data[key]);
        if (firstKey === true) {
            firstKey = false;
            previousDayData[0] = res.TotalConfirmed;
            previousDayData[1] = res.TotalDeaths;
            previousDayData[2] = res.TotalRecovered;
            continue;
        }
        confirmedRates.push(Math.abs(res.TotalConfirmed - previousDayData[0]));
        deathsRates.push(Math.abs(res.TotalDeaths - previousDayData[1]));
        recovRates.push(Math.abs(res.TotalRecovered - previousDayData[2]));
        previousDayData[0] = res.TotalConfirmed;
        previousDayData[1] = res.TotalDeaths;
        previousDayData[2] = res.TotalRecovered;
    }
    return { 
        DeathsRate: arrayAverage(deathsRates),
        RecoveredRate: arrayAverage(recovRates),
        ConfirmedRate: arrayAverage(confirmedRates)
    };
}
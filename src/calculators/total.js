import {isEmpty, sumDay} from './basics';

export function calculateTotalValue(data) {
    let lastDay = null;

    if (isEmpty(data))
        return {TotalDeaths: 0, TotalConfirmed: 0, TotalRecovered: 0};
    for (var key in data) {
        if (data[key] === null)
            continue;
        lastDay = key;
    }
    return sumDay(data[lastDay]);
}

export function calculateTotalForEachDay(data) {
    let res = {
        days: [],
        Recovered: [],
        Deaths: [],
        Infected: [],
        Active: []
    }
    if (isEmpty(data))
        return res;
    for (let key in data) {
        if (data[key] === null)
            continue;
        let tmp = sumDay(data[key]);

        res.days.push(key);
        res.Infected.push(tmp.TotalConfirmed);
        res.Active.push(tmp.TotalConfirmed - tmp.TotalDeaths - tmp.TotalDeaths);
        res.Deaths.push(tmp.TotalDeaths);
        res.Recovered.push(tmp.TotalRecovered);
    }
    return res;
}
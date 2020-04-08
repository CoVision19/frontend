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
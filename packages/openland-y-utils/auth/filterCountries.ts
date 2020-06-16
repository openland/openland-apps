import { US_LABEL, CountryItem } from './constants';

export const filterCountries = (searchValue: string, countries: CountryItem[]) => {
    let input = searchValue.toLowerCase();
    let firstRank = countries.filter(x => {
        let label = x.label.toLowerCase();
        if (label === US_LABEL.toLowerCase() && ['usa', 'america', 'united states of america', 'u.s.'].some(y => y.startsWith(input))) {
            return true;
        }
        return label.startsWith(input);
    });
    let secondRank = countries.filter(x => {
        let label = x.label.toLowerCase();
        return label.includes(input) || x.value.replace(/\+/g, '').startsWith(input);
    });
    return firstRank.concat(secondRank.filter(x => !firstRank.some(y => y.label === x.label)));
};

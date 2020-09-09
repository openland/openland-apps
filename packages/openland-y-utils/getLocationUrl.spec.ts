import { getLocationUrl as f } from './getLocationUrl';

describe('Location URL creator', () => {
    it('Should remove emojis and garbage, parse cyrillic and diacritic chars', () => {
        expect(f('🌌Kaluga🛰️')).toEqual('https://google.com/maps/place/Kaluga');
        expect(f('🌌Калуга🛰️')).toEqual('https://google.com/maps/place/%D0%9A%D0%B0%D0%BB%D1%83%D0%B3%D0%B0');
        expect(f('!@#$^🌌Калуга🛰️^&%()+')).toEqual('https://google.com/maps/place/%D0%9A%D0%B0%D0%BB%D1%83%D0%B3%D0%B0');
        expect(f('🇷🇺Санкт-Петербург🇷🇺')).toEqual('https://google.com/maps/place/%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3');
        expect(f('🇳🇴Gjøvik🇳🇴')).toEqual('https://google.com/maps/place/Gjovik');
        expect(f('🇫🇮Ylöjärvi🇫🇮')).toEqual('https://google.com/maps/place/Ylojarvi');
        expect(f('🇺🇸Los Angeles, CA🇺🇸')).toEqual('https://google.com/maps/place/Los-Angeles-CA');
    });
});
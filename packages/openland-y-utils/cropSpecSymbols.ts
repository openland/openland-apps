export const cropSpecSymbols = (text: string, symbol: string) => {
    let res = text;

    if (res.startsWith(symbol) && res.endsWith(symbol)) {
        // remove first symbol
        res = res.replace(symbol, '');
        // remove last symbol
        res = res.substr(0, res.lastIndexOf(symbol));
        // remove first line-breaker
        if (res.charAt(0) === '\n') {
            res = res.replace('\n', '');
        }
    }

    return res;
};
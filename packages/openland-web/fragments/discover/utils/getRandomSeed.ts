import { getClientToken } from 'openland-api/auth';

export const getRandomSeed = (): number => {
    const token = getClientToken()!;
    const tokenSymbols = token.split('');
    let sum = 0;

    tokenSymbols.forEach(symbol => {
        const charCode = symbol.charCodeAt(0);
        sum += charCode;
    });

    return sum;
};

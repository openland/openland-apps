import { getClientToken } from 'openland-api/auth';
import UUID from 'uuid/v4';

export const getRandomSeed = (): number => {
    const token = getClientToken() || UUID();
    const tokenSymbols = token.split('');
    let sum = 0;

    tokenSymbols.forEach(symbol => {
        const charCode = symbol.charCodeAt(0);
        sum += charCode;
    });

    return sum;
};

type CardBrandsType = 'amex' | 'diners' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' | 'apple-pay' | 'google-pay';
const CardBrandsName: { [key in CardBrandsType]: string } = {
    'amex': 'American Express',
    'diners': 'Diners Club',
    'discover': 'Discover',
    'jcb': 'JCB',
    'mastercard': 'MasterCard',
    'unionpay': 'UnionPay',
    'visa': 'Visa',
    'apple-pay': 'Apple Pay',
    'google-pay': 'Google Pay',
};

export const getPayhmentMethodName = (brand: string) => CardBrandsName[brand] || 'Unknown';
export const getBrandSafe = (brand: string) => (Object.keys(CardBrandsName).indexOf(brand) >= 0 ? brand : 'unknown') as CardBrandsType | 'unknown';
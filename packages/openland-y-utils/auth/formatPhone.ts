import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatPhone = (phone: string) => {
    let formatted = parsePhoneNumberFromString(phone);
    if (formatted) {
        return formatted.formatInternational();
    }
    return phone;
};

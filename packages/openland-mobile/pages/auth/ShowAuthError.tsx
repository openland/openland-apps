import { NamedError } from 'openland-y-forms/errorHandling';
import { ACTIVATION_CODE_LENGTH } from './EmailAuth';

export const GetAuthError = (error: NamedError) => {
    if (error.name === 'no_email_or_phone') {
        return 'Please enter your email address';
    } else if (error.name === 'invalid_email') {
        return 'The email you entered is incorrect';
    } else if (error.name === 'wrong_code' || error.name === 'wrong_code_length') {
        return 'Wrong code';
    } else if (error.name === 'no_code') {
        return 'Please enter the ' + ACTIVATION_CODE_LENGTH + '-digit code we\'ve just sent to your email';
    } else {
        return 'An unexpected error occurred';
    }
};
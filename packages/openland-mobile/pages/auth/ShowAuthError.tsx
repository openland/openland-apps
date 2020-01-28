import Toast from 'openland-mobile/components/Toast';
import { NamedError } from 'openland-y-forms/errorHandling';

export const ShowAuthError = (error: NamedError) => {
    if (error.name === 'no_email_or_phone') {
        Toast.failure({ text: 'Enter email address', duration: 1000 }).show();
    } else if (error.name === 'invalid_email') {
        Toast.failure({ text: 'Incorrect email', duration: 1000 }).show();
    } else if (error.name === 'wrong_code' || error.name === 'wrong_code_length') {
        Toast.failure({ text: 'Wrong code', duration: 1000 }).show();
    } else if (error.name === 'no_code') {
        Toast.failure({ text: 'Enter code', duration: 1000 }).show();
    } else if (error.name === 'code_expired') {
        Toast.failure({ text: 'Code expired', duration: 1000 }).show();
    } else {
        Toast.failure({ text: 'Unexpected error', duration: 1000 }).show();
    }
};
import Toast from 'openland-mobile/components/Toast';
import { NamedError } from 'openland-y-forms/errorHandling';

const textByError = {
    'no_email_or_phone': 'Enter email address',
    'invalid_email': 'Incorrect email',
    'wrong_code': 'Wrong code',
    'no_code': 'Enter code',
    'code_expired': 'Code expired',
};

export const ShowAuthError = (error: NamedError, processErrors?: boolean) => {
    const text = processErrors === false ? error.message : (textByError[error.name] || 'Unexpected error');
    Toast.failure({ text, duration: 1000, hideKeyboardOnOpen: false }).show();
};
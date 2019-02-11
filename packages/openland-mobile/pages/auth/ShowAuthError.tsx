import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { NumberedError, NamedError } from 'openland-y-forms/errorHandling';

export const ShowAuthError = (error: NumberedError | NamedError) => {
    if (error.name === 'no_email_or_phone' || error.code === 5) {
        Alert.builder()
            .title('Please enter your email address')
            .button('GOT IT!').show();
    } else if (error.name === 'invalid_email' || error.code === 9) {
        Alert.builder()
            .title('The email you entered is incorrect')
            .message('Please check your email address and try again.')
            .button('TRY AGAIN').show();
    } else if (error.name === 'wrong_code' || error.code === 4) {
        Alert.builder()
            .title('The code you entered is incorrect')
            .message('Please check the code in the email and try again.')
            .button('TRY AGAIN').show();
    } else if (error.name === 'no_code' || error.code === 7) {
        Alert.builder()
            .title('Please enter the 6-digit code we\'ve just sent to your email')
            .button('GOT IT!').show();
    } else {
        Alert.builder()
            .title('An unexpected error occurred')
            .button('TRY AGAIN').show();
    }
}
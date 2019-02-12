import * as React from 'react';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { NamedError } from 'openland-y-forms/errorHandling';
import { ACTIVATION_CODE_LENGTH } from './EmailAuth';

export const ShowAuthError = (error: NamedError) => {
    if (error.name === 'no_email_or_phone') {
        Alert.builder()
            .title('Please enter your email address')
            .button('GOT IT!').show();
    } else if (error.name === 'invalid_email') {
        Alert.builder()
            .title('The email you entered is incorrect')
            .message('Please check your email address and try again.')
            .button('TRY AGAIN').show();
    } else if (error.name === 'wrong_code' || error.name === 'wrong_code_length') {
        Alert.builder()
            .title('The code you entered is incorrect')
            .message('Please check the code in the email and try again.')
            .button('TRY AGAIN').show();
    } else if (error.name === 'no_code') {
        Alert.builder()
            .title('Please enter the ' + ACTIVATION_CODE_LENGTH + '-digit code we\'ve just sent to your email')
            .button('GOT IT!').show();
    } else {
        Alert.builder()
            .title('An unexpected error occurred')
            .button('TRY AGAIN').show();
    }
}
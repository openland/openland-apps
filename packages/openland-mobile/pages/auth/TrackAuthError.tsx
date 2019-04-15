import { NamedError } from 'openland-y-forms/errorHandling';
import { trackEvent } from 'openland-mobile/analytics';

export const TrackAuthError = (error: NamedError) => {
    if (['code_expired', 'wrong_code', 'wrong_code_length', 'no_code'].includes(error.name)) {
        let e = (error.name === 'wrong_code_length') ? 'wrong_code' : error.name;

        trackEvent('signup_code_error', { error_type: e });
    } else {
        trackEvent('signup_error', { error_type: error.name});
    }
}
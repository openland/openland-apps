import { API_AUTH_ENDPOINT } from 'openland-api/endpoint';
import { trackEvent } from 'openland-x-analytics';

export const trackError = (error: string) => {
    if (
        [
            'code_expired',
            'invalid_user_password',
            'wrong_code',
            'wrong_code_length',
            'no_code',
        ].includes(error)
    ) {
        let e =
            error === 'wrong_code_length' || error === 'invalid_user_password'
                ? 'wrong_code'
                : error;

        trackEvent('code_error', { error_type: e });
    } else {
        trackEvent('signup_error', { error_type: error });
    }
};

export class AuthError extends Error {}
export const checkCode = async (codeValue: string, isPhone?: boolean) => {
    const checkCodePath = !!isPhone ? '/phone/checkCode' : '/checkCode';
    const getAccessTokenPath = !!isPhone ? '/phone/getAccessToken' : '/getAccessToken';
    let res = await (
        await fetch(API_AUTH_ENDPOINT + checkCodePath, {
            body: JSON.stringify({
                session: localStorage.getItem('authSession'),
                code: codeValue,
            }),
            headers: [['Content-Type', 'application/json']],
            method: 'POST',
        })
    ).json();
    if (!res.ok) {
        throw new AuthError(res.errorText || 'Something went wrong');
    }
    let res2 = await (
        await fetch(API_AUTH_ENDPOINT + getAccessTokenPath, {
            body: JSON.stringify({
                session: localStorage.getItem('authSession'),
                authToken: res.authToken,
            }),
            headers: [['Content-Type', 'application/json']],
            method: 'POST',
        })
    ).json();
    if (!res2.ok) {
        throw new AuthError(res2.errorText || 'Something went wrong');
    }
    return res2.accessToken as string;
};

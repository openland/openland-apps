import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import RNRestart from 'react-native-restart';
import { NamedError, UserError } from 'openland-y-forms/errorHandling';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { API_HOST } from 'openland-y-utils/api';
import { AppStorage as Storage } from 'openland-y-runtime-native/AppStorage';
import { SubmitLoginForm } from './SubmitLoginForm';
import { SubmitCodeForm } from './SubmitCodeForm';

let userAuthData = '';
let userPhoneData = '';
let session = '';
let photoSrc: string | null = null;
let photoCrop: { w: number; h: number; x: number; y: number } | null = null;

const http = async (params: { url: string; body?: any; method: 'POST' | 'GET' }) => {
    let res = await fetch(params.url, {
        method: params.method,
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify(params.body),
    });
    if (!res.ok) {
        throw new UserError(res.statusText || 'Unexpected error');
    } else {
        let body = await res.json();
        if (body.ok === false) {
            if (typeof body.errorCode === 'string') {
                throw new NamedError(body.errorCode);
            } else {
                throw new UserError(body.errorText || 'Unexpected error');
            }
        } else {
            return body;
        }
    }
};

const requestActivationCode = async (isPhone: boolean) => {
    const host = isPhone ? '/auth/phone/sendCode' : '/auth/sendCode';
    const body = isPhone ? { phone: userAuthData } : { email: userAuthData };
    let res = await http({
        url: 'https://' + API_HOST + host,
        body: body,
        method: 'POST',
    });

    session = res.session;
    photoSrc = res.pictureId ? res.pictureId : null;
    photoCrop = res.pictureCrop ? res.pictureCrop : null;
};

const AuthStartComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;
    const countryShortname = props.router.params.countryShortname as string;

    const handleSubmit = React.useCallback(async (formData: string, phoneData: string) => {
        userPhoneData = phoneData;
        userAuthData = formData;
        await requestActivationCode(isPhoneAuth);
    }, [isPhoneAuth]);
    const handleSuccess = React.useCallback(() => {
        props.router.push('AuthCode', { phone: isPhoneAuth });
    }, []);

    return (
        <SubmitLoginForm
            isPhone={isPhoneAuth}
            countryShortname={countryShortname}
            eventTitle={isPhoneAuth ? 'signup_phone_view' : 'signup_email_view'}
            title={isPhoneAuth ? 'What’s your phone?' : 'What’s your email?'}
            subtitle="We’ll send you a login code"
            router={props.router}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
        />
    );
});

export const AuthStart = withApp(AuthStartComponent, {
    navigationAppearance: 'small-hidden',
});

const AuthCodeComponent = React.memo((props: PageProps) => {
    const isPhoneAuth = !!props.router.params.phone;

    const handleResend = React.useCallback(async () => {
        await requestActivationCode(isPhoneAuth);
    }, []);
    const handleSubmit = React.useCallback(async (code: string) => {
        const checkCodeHost = isPhoneAuth ? '/auth/phone/checkCode' : '/auth/checkCode';
        const getTokenHost = isPhoneAuth
            ? '/auth/phone/getAccessToken'
            : '/auth/getAccessToken';

        let res = await http({
            url: 'https://' + API_HOST + checkCodeHost,
            body: {
                session: session,
                code,
            },
            method: 'POST',
        });
        let res2 = await http({
            url: 'https://' + API_HOST + getTokenHost,
            body: {
                session: session,
                authToken: res.authToken,
            },
            method: 'POST',
        });

        await AppStorage.setToken(res2.accessToken);
        // hotfix, spacex cache reset needed
        await Storage.writeKey('user_refetch_needed', true);
        RNRestart.Restart();
    }, []);

    return (
        <SubmitCodeForm
            formData={isPhoneAuth ? userPhoneData : userAuthData}
            photoSrc={photoSrc}
            photoCrop={photoCrop}
            onSubmit={handleSubmit}
            onResend={handleResend}
        />
    );
});

export const AuthCode = withApp(AuthCodeComponent, {
    navigationAppearance: 'small-hidden',
});
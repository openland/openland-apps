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
import { useText } from 'openland-mobile/text/useText';

let userAuthData = '';
let userPhoneData = '';
let session = '';
let profileExists = false;
let photoSrc: string | null = null;
let photoCrop: { w: number; h: number; x: number; y: number } | null = null;
let avatarPlaceholder: { hash: number, initials: string };

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
    profileExists = res.profileExists;
    avatarPlaceholder = { hash: res.pictureHash, initials: res.initials };
};

const AuthStartComponent = React.memo((props: PageProps) => {
    const { t } = useText();
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
            title={isPhoneAuth ? t('loginPhoneQuestion', 'What’s your phone?') : t('loginEmailQuestion', 'What’s your email?')}
            subtitle={t('loginCodeDescription', 'We’ll send you a sign-in code')}
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
    const { t } = useText();
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
            title={profileExists
                ? t('loginSigninCode', 'Enter sign-in code')
                : t('loginSignupCode', 'Enter sign-up code')}
            formData={isPhoneAuth ? userPhoneData : userAuthData}
            photoSrc={photoSrc}
            photoCrop={photoCrop}
            buttonTitle={profileExists ? t('next', 'Next') : t('createAccount', 'Create account')}
            avatarPlaceholder={avatarPlaceholder}
            profileExists={profileExists}
            onSubmit={handleSubmit}
            onResend={handleResend}
        />
    );
});

export const AuthCode = withApp(AuthCodeComponent, {
    navigationAppearance: 'small-hidden',
});

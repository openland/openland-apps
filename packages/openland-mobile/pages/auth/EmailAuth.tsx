import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZInput } from '../../components/ZInput';
import RNRestart from 'react-native-restart';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { UserError, NamedError } from 'openland-y-forms/errorHandling';
import { ShowAuthError } from './ShowAuthError';
import Alert from 'openland-mobile/components/AlertBlanket';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';
import { TrackAuthError } from './TrackAuthError';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SScrollView } from 'react-native-s/SScrollView';
import Toast from 'openland-mobile/components/Toast';

export const ACTIVATION_CODE_LENGTH = 6;

const styles = StyleSheet.create({
    hint: {
        ...TypeStyles.body,
        paddingHorizontal: 16,
        marginTop: 15,
        marginBottom: 26,
    } as TextStyle,
});

let email = '';
let session = '';

const Loader = Toast.loader();

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

const requestActivationCode = async () => {
    let res = await http({
        url: 'https://api.openland.com/auth/sendCode',
        body: {
            email: email,
        },
        method: 'POST',
    });

    session = res.session;
};

const EmailStartComponent = (props: PageProps) => {
    const form = useForm();
    const emailField = useField('email', '', form);

    const validateEmail = (value?: string) => {
        if (!value) {
            throw new NamedError('no_email_or_phone');
        }

        let lastAtPos = value.lastIndexOf('@');
        let lastDotPos = value.lastIndexOf('.');
        let isEmailValid = lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2 && !value.includes(' ');

        if (!isEmailValid) {
            throw new NamedError('invalid_email');
        }
    };

    const submitForm = () =>
        form.doAction(async () => { 
            try {
                validateEmail(emailField.value);

                email = emailField.value;

                await requestActivationCode();
                props.router.push('EmailCode');
            } catch (e) {
                ShowAuthError(e);
            }
        });

    return (
        <ZTrack event="signup_email_view">
            <SHeader title="Email" />
            <SHeaderButton title="Next" onPress={submitForm} />

            <SScrollView>
                <Text style={styles.hint}>
                    Enter your email address to sign in or create a{'\u00A0'}new{'\u00A0'}account
                </Text>
                <ZInput
                    field={emailField}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={submitForm}
                />
            </SScrollView>
        </ZTrack>
    );
};

export const EmailStart = withApp(EmailStartComponent);

const EmailCodeComponent = (props: PageProps) => {
    const form = useForm();
    const codeField = useField('code', '', form);

    const validateCode = (value?: string) => {
        if (!value) {
            throw new NamedError('no_code');
        }

        if (value.length !== ACTIVATION_CODE_LENGTH) {
            throw new NamedError('wrong_code_length');
        }

        if (!value.match(/^[0-9]+$/)) {
            throw new NamedError('wrong_code');
        }
    };

    const resendCode = async () => {
        trackEvent('code_resend_action');

        await requestActivationCode();

        codeField.input.onChange('');
    };

    const submitForm = () => 
        form.doAction(async () => {
            try {
                validateCode(codeField.value);

                let res = await http({
                    url: 'https://api.openland.com/auth/checkCode',
                    body: {
                        session: session,
                        code: codeField.value,
                    },
                    method: 'POST',
                });
                let res2 = await http({
                    url: 'https://api.openland.com/auth/getAccessToken',
                    body: {
                        session: session,
                        authToken: res.authToken,
                    },
                    method: 'POST',
                });

                await AppStorage.setToken(res2.accessToken);

                RNRestart.Restart();
            } catch (e) {
                TrackAuthError(e);

                if (e.name === 'code_expired') {
                    Alert.builder()
                        .title('This code has expired')
                        .message('Please click Resend and we\'ll send you a new verification email.')
                        .button('Cancel', 'cancel')
                        .action('Resend Code', 'default', resendCode)
                        .show();
                    
                    return;
                }

                ShowAuthError(e);
            }
        });

    React.useEffect(() => {
        if (codeField.value.length === ACTIVATION_CODE_LENGTH) {
            submitForm();
        }
    }, [codeField.value]);

    React.useEffect(() => {
        if (form.loading) {
            Loader.show();
        } else {
            Loader.hide();
        }
    }, [form.loading]);

    return (
        <ZTrack event="code_view">
            <SHeader title="Confirm email" />
            <SHeaderButton title="Next" onPress={submitForm} />

            <SScrollView>
                <Text style={styles.hint}>
                    Enter activation code that was just sent to {email}
                </Text>
                <ZInput
                    field={codeField}
                    placeholder="Activation Code"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={submitForm}
                    maxLength={ACTIVATION_CODE_LENGTH}
                />
            </SScrollView>
        </ZTrack>
    );
};

export const EmailCode = withApp(EmailCodeComponent);

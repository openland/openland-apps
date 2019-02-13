import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZTextInput } from '../../components/ZTextInput';
import { signupStyles } from './SignupUser';
import { ZForm } from '../../components/ZForm';
import RNRestart from 'react-native-restart';
import { AsyncStorage, Text, StyleSheet, TextStyle, Keyboard } from 'react-native';
import { UserError, NamedError } from 'openland-y-forms/errorHandling';
import { ShowAuthError } from './ShowAuthError';
import { Alert } from 'openland-mobile/components/AlertBlanket';

export const ACTIVATION_CODE_LENGTH = 6;

const styles = StyleSheet.create({
    hint: {
        paddingHorizontal: 16,
        fontSize: 16,
        marginTop: 15,
        marginBottom: 26,
        lineHeight: 24,
        fontWeight: '400',
        color: '#000',
        opacity: 0.9,
    } as TextStyle,
});

let email = '';
let session = '';

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
}

class EmailStartComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();

    private submitForm = () => {
        this.ref.current!.submitForm();
    };

    private validateEmail = (value?: string) => {
        if (!value) {
            throw new NamedError('no_email_or_phone');
        }

        let lastAtPos = value.lastIndexOf('@');
        let lastDotPos = value.lastIndexOf('.');
        let isEmailValid = lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2 && !value.includes(' ');

        if (!isEmailValid) {
            throw new NamedError('invalid_email');
        }
    }

    render() {
        return (
            <>
                <SHeader title="Email" />
                <SHeaderButton title="Next" onPress={this.submitForm} />

                <ZForm
                    ref={this.ref}
                    action={async src => {
                        this.validateEmail(src.email);

                        Keyboard.dismiss();
                        email = src.email;

                        await requestActivationCode();
                    }}
                    onError={(e) => {
                        ShowAuthError(e);
                    }}
                    onSuccess={() => this.props.router.push('EmailCode')}
                >
                    <Text style={styles.hint}>
                        Enter your email address to sign in or create a{'\u00A0'}new{'\u00A0'}account
                    </Text>
                    <ZTextInput
                        field="email"
                        style={signupStyles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoFocus={true}
                        width="100%"
                        returnKeyType="next"
                        onSubmitEditing={this.submitForm}
                    />
                </ZForm>
            </>
        );
    }
}

export const EmailStart = withApp(EmailStartComponent);

class EmailCodeComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();

    private submitForm = () => {
        this.ref.current!.submitForm();
    };

    private validateCode = (value?: string) => {
        if (!value) {
            throw new NamedError('no_code');
        }

        if (value.length !== ACTIVATION_CODE_LENGTH) {
            throw new NamedError('wrong_code_length');
        }

        if (!value.match(/^[0-9]+$/)) {
            throw new NamedError('wrong_code');
        }
    }

    private resendCode = async () => {
        await requestActivationCode();

        this.ref.current!.setField('fields.code');
    }

    render() {
        return (
            <>
                <SHeader title="Confirm email" />
                <SHeaderButton title="Next" onPress={this.submitForm} />
                <ZForm
                    ref={this.ref}
                    action={async src => {
                        this.validateCode(src.code);

                        Keyboard.dismiss();
                        let res = await http({
                            url: 'https://api.openland.com/auth/checkCode',
                            body: {
                                session: session,
                                code: src.code,
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

                        await AsyncStorage.setItem('openland-token', res2.accessToken);
                    }}
                    onError={(e: Error) => {
                        if (e.name === 'code_expired') {
                            Alert.builder()
                                .title('This code has expired')
                                .message('Please click Resend and we\'ll send you a new verification email.')
                                .button('Cancel', 'cancel')
                                .action('Resend Code', 'default', this.resendCode)
                                .show();
                            
                            return;
                        }

                        ShowAuthError(e);
                    }}
                    onSuccess={() => RNRestart.Restart()}
                >
                    <Text style={styles.hint}>
                        Enter activation code that was just sent to {email}
                    </Text>
                    <ZTextInput
                        field="code"
                        style={signupStyles.input}
                        placeholder="Activation Code"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        autoFocus={true}
                        width="100%"
                        returnKeyType="next"
                        onSubmitEditing={this.submitForm}
                    />
                </ZForm>
            </>
        );
    }
}

export const EmailCode = withApp(EmailCodeComponent);

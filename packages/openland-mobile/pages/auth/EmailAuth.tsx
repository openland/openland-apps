import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZTextInput } from '../../components/ZTextInput';
import { signupStyles } from './SignupUser';
import { ZForm } from '../../components/ZForm';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { AsyncStorage, Text, StyleSheet, TextStyle, Keyboard } from 'react-native';
import { UserError } from 'openland-y-forms/errorHandling';

const styles = StyleSheet.create({
    hint: {
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        opacity: 0.9
    } as TextStyle
});

let email = '';
let session = '';

const http = async (params: { url: string, body?: any, method: 'POST' | 'GET' }) => {
    let res = await fetch(params.url, {
        method: params.method,
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify(params.body)
    });
    if (!res.ok) {
        throw new UserError(res.statusText || 'Unexpected error');
    } else {
        let body = await res.json();
        if (body.ok === false) {
            throw new UserError(body.errorText || 'Unexpected error');
        } else {
            return body;
        }
    }
};

class EmailStartComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();

    private submitForm = () => {
        this.ref.current!.submitForm();
    }

    render() {
        return (
            <>
                <SHeader title="Enter your email" />
                <SHeaderButton title="Next" onPress={this.submitForm} />

                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        Keyboard.dismiss();
                        email = src.email;
                        let res = await http({
                            url: 'https://api.openland.com/auth/sendCode',
                            body: {
                                email: email,
                            },
                            method: 'POST'
                        });
                        session = res.session;
                    }}
                    onSuccess={() => this.props.router.push('EmailCode')}
                >
                    <Text style={styles.hint}>
                        Enter your email address to sign in or create a new account
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
    }

    render() {
        return (
            <>
                <SHeader title="Enter code" />
                <SHeaderButton title="Next" onPress={this.submitForm} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        Keyboard.dismiss();
                        let res = await http({
                            url: 'https://api.openland.com/auth/checkCode',
                            body: {
                                session: session,
                                code: src.code
                            },
                            method: 'POST'
                        });
                        let res2 = await http({
                            url: 'https://api.openland.com/auth/getAccessToken',
                            body: {
                                session: session,
                                authToken: res.authToken
                            },
                            method: 'POST'
                        });

                        await AsyncStorage.setItem('openland-token', res2.accessToken);

                    }}
                    onSuccess={() => AppUpdateTracker.restartApp()}
                >

                    <Text style={styles.hint}>Please enter 5-digit activation code that was sent to your email</Text>
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

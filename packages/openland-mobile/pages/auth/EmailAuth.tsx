import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZTextInput } from '../../components/ZTextInput';
import { signupStyles } from '../signup/SignupUser';
// import { Auth0 } from 'react-native-auth0-s/Auth0';
import { ZForm } from '../../components/ZForm';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { AsyncStorage } from 'react-native';
import { UserError } from 'openland-y-forms/errorHandling';

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

    render() {
        return (
            <>
                <SHeader title="Enter your email" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
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
                    <ZTextInput field="email" style={signupStyles.input} placeholder="email" width="100%" />
                </ZForm>
            </>
        );
    }
}

export const EmailStart = withApp(EmailStartComponent);

class EmailCodeComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();

    render() {
        return (
            <>
                <SHeader title="Enter code" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
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
                    <ZTextInput field="code" style={signupStyles.input} placeholder="code" width="100%" />
                </ZForm>
            </>
        );
    }
}

export const EmailCode = withApp(EmailCodeComponent);

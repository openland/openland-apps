import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZTextInput } from '../../components/ZTextInput';
import { signupStyles } from '../signup/SignupUser';
import { Auth0 } from 'react-native-auth0-s/Auth0';
import { ZForm } from '../../components/ZForm';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { AsyncStorage } from 'react-native';
import { UserError } from 'openland-y-forms/errorHandling';

let email = '';

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
                        let res = await Auth0.requestEmailAuth(src.email);
                        if (res.error) {
                            throw res.error.message ? new UserError(res.error.message) : res.error;
                        }
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
                        let res = await Auth0.completeEmailAuth(email, src.code);
                        if (res.error) {
                            throw res.error.message ? new UserError(res.error.message) : res.error;
                        }
                        await AsyncStorage.setItem('openland-token', res.credentials!.accessToken!);

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

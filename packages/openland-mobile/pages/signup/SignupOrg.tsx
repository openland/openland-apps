import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button, Alert, Image } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ActionButtonAndroid } from 'react-native-s/navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from 'react-native-s/navigation/buttons/ActionButtonIOS';
import { ZLoader } from '../../components/ZLoader';
import { getClient } from '../../utils/apolloClient';
import { ProfileCreateMutation, CreateOrganizationMutation } from 'openland-api';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { getSignupModel } from './signup';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { delay } from 'openland-y-utils/timer';
import { signupStyles } from './SignupUser';

class SignupOrgComponent extends React.PureComponent<PageProps & { onComplete: () => void }, { name: string, loading: boolean }> {
    private ref = React.createRef<ZForm>();

    render() {
        return (
            <>
                <SHeader title="Your organization" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />
                <YMutation mutation={CreateOrganizationMutation}>
                    {create => (
                        <ZForm
                            ref={this.ref}
                            action={async (src) => {
                                await delay(1000);
                                // await create({ variables: { input: { name: src.input.name} } })
                                this.props.router.push(await getSignupModel().next());
                            }}
                        >
                            <ZTextInput field="input.firstName" placeholder="Name" style={signupStyles.input} width="100%" />
                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}
export const SignupOrg = withApp(SignupOrgComponent);
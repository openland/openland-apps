import * as React from 'react';
import { ZTextInput } from '../../components/ZTextInput';
import { CreateOrganizationMutation } from 'openland-api';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { getSignupModel } from './signup';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { delay } from 'openland-y-utils/timer';
import { signupStyles } from './SignupUser';
import { Alert } from 'react-native';

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
                            defaultData={{ input: { name: '' } }}
                            action={async (src) => {
                                // await delay(1000);
                                await create({ variables: { input: { name: src.input.name , personal: false } } });
                                this.props.router.push(await getSignupModel().next());
                            }}
                        >
                            <ZTextInput field="input.name" placeholder="Name" style={signupStyles.input} width="100%" />
                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}
export const SignupOrg = withApp(SignupOrgComponent);
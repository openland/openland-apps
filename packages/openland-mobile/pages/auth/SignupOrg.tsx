import * as React from 'react';
import { ZTextInput } from '../../components/ZTextInput';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZForm } from '../../components/ZForm';
import { signupStyles } from './SignupUser';
import { next } from './signup';
import { getClient } from 'openland-mobile/utils/apolloClient';

class SignupOrgComponent extends React.PureComponent<PageProps & { onComplete: () => void }, { name: string, loading: boolean }> {
    private ref = React.createRef<ZForm>();

    render() {
        return (
            <>
                <SHeader title="Your organization" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />
                <ZForm
                    ref={this.ref}
                    defaultData={{ input: { name: '' } }}
                    action={async (src) => {
                        await getClient().mutateCreateOrganization({ input: { name: src.input.name, personal: false } });
                        await next(this.props.router);
                    }}
                >
                    <ZTextInput field="input.name" placeholder="Name" style={signupStyles.input} width="100%" />
                </ZForm>
            </>
        );
    }
}
export const SignupOrg = withApp(SignupOrgComponent);
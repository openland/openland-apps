import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SilentError } from 'openland-y-forms/errorHandling';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

class NewOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        return (
            <>
                <SHeader title="New organization" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        if (!src.input.name) {
                            Alert.builder().title('Name can\'t be empty').button('GOT IT!').show();
                            throw new SilentError();
                        }
                        let client = getClient();
                        await client.mutateCreateOrganization({ input: { name: '', personal: false, ...src.input }, });
                        await getClient().refetchAccount();
                        await client.refetchAccountSettings();
                    }}
                    onSuccess={async () => {
                        this.props.router.params.action ? await this.props.router.params.action(this.props.router) : this.props.router.back();
                    }}
                >

                    <View>
                        <View alignSelf="center" marginTop={30} marginBottom={31}>
                            <ZAvatarPicker field="input.photoRef" />
                        </View>
                        <ZListItemGroup
                            divider={false}
                            footer="Please, provide organization name and optional logo"
                        >
                            <ZTextInput placeholder="Organization name" field="input.name" />
                        </ZListItemGroup>
                    </View>

                </ZForm>
            </>
        );
    }
}

export const NewOrganization = withApp(NewOrganizationComponent);
import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { View, Text, Alert } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { CreateOrganizationMutation, AccountSettingsQuery } from 'openland-api';

class NewOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        return (
            <>
                <SHeader title="New organization" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={CreateOrganizationMutation} refetchQueries={[AccountSettingsQuery]}>
                    {create => (
                        <ZForm
                            ref={this.ref}
                            action={(src) => { return create({ variables: { input: { name: '', personal: false, ...src.input }, } }); }}
                            onSuccess={async () => {
                                this.props.router.params.action ? await this.props.router.params.action(this.props.router) : this.props.router.back();
                            }}
                        >

                            <View>
                                <View alignSelf="center" marginTop={30} marginBottom={10}>
                                    <ZAvatarPicker field="input.photoRef" />
                                </View>
                                <ZTextInput marginLeft={16} marginTop={21} placeholder="Organization name" field="input.name" height={44} style={{ fontSize: 16 }} />
                                <View marginLeft={16} height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                <Text style={{ color: '#666666', opacity: 0.8, fontSize: 13, lineHeight: 17, marginTop: 8, marginLeft: 16}}>Please, provide organization name and optional logo</Text>
                            </View>

                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}

export const NewOrganization = withApp(NewOrganizationComponent);
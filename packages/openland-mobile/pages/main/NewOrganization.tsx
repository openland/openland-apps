import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { View, Text } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { CreateOrganizationMutation } from 'openland-api';

class NewOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        return (
            <>
                <SHeader title="New organization" />
                <SHeaderButton title="Next" onPress={() => { this.ref.current!.submitForm(); }} />
                <YMutation mutation={CreateOrganizationMutation}>
                    {create => (
                        <ZForm ref={this.ref} action={(src) => { return create({ variables: { input: { name: '', personal: false, ...src.input }, } }); }} onSuccess={() => { this.props.router.back(); }}>
                            <ZListItemGroup>
                                <ZListItemBase height={96} separator={false}>
                                    <View padding={15}>
                                        <ZAvatarPicker field="input.photoRef" />
                                    </View>
                                    <View flexDirection="column" flexGrow={1} flexBasis={0} paddingVertical={4} alignContent="center">
                                        <ZTextInput placeholder="Organization name" field="input.name" height={44} style={{ fontSize: 16 }} />
                                        <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                        <Text>Please, provide organization name and optional logo</Text>
                                    </View>
                                </ZListItemBase>
                            </ZListItemGroup>
                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}
export const NewOrganization = withApp(NewOrganizationComponent);
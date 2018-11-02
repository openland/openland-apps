import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { ZQuery } from '../../components/ZQuery';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ProfileUpdateMutation, AccountQuery } from 'openland-api';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

class ListItemEdit extends React.PureComponent<{ autoFocus?: boolean, title: string, value?: string, valueStoreKey?: string, field?: string, onChange?: (val: string) => void, placehodler?: string }> {
    render() {
        return (
            <ZListItemBase separator={false}>
                <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                    <Text style={{ width: 104, color: '#8a8a8f', fontSize: 13, lineHeight: 22, marginLeft: 16, alignSelf: 'center' }}>{this.props.title}</Text>
                    <ZTextInput
                        placeholder={this.props.placehodler}
                        flexGrow={1}
                        value={this.props.value}
                        onChangeText={this.props.onChange}
                        style={{ paddingRight: 15 }}
                        field={this.props.field}
                        valueStoreKey={this.props.valueStoreKey}
                        autoFocus={this.props.autoFocus}
                    />
                </View>
            </ZListItemBase>
        );
    }
}

class SettingsProfileComponent extends React.Component<PageProps, { loaded: boolean }> {

    private ref = React.createRef<ZForm>();

    constructor(props: PageProps) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    handleSave = () => {
        if (this.ref.current) {
            this.ref.current!!.submitForm();
        }
    }

    render() {
        return (
            <>
                <SHeader title="Edit profile" />
                <SHeaderButton title="Save" onPress={this.handleSave} />
                <YMutation mutation={ProfileUpdateMutation} refetchQueries={[AccountQuery]}>
                    {(save) => (
                        <ZQuery query={ProfileQuery} fetchPolicy="network-only">
                            {(resp) => (
                                <ZForm
                                    action={async (args) => {
                                        await save({ variables: args });
                                    }}
                                    onSuccess={() => this.props.router.back()}
                                    ref={this.ref}
                                    defaultData={{
                                        input: {
                                            firstName: resp.data.profile!!.firstName,
                                            lastName: resp.data.profile!!.lastName,
                                            photoRef: sanitizeIamgeRef(resp.data.profile!!.photoRef),
                                            phone: resp.data.profile!!.phone,
                                            email: resp.data.profile!!.email,
                                            website: resp.data.profile!!.website,
                                            alphaLinkedin: resp.data.profile!!.linkedin
                                        }
                                    }}
                                >
                                    <ZListItemBase height={96} separator={false}>
                                        <View paddingHorizontal={16} marginTop={15}>
                                            <ZAvatarPicker field="input.photoRef" />
                                        </View>
                                        <View flexDirection="column" flexGrow={1} flexBasis={0} marginTop={15}>
                                            <ZTextInput placeholder="First name" field="input.firstName" height={44} style={{ fontSize: 16 }} />
                                            <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                            <ZTextInput placeholder="Last name" field="input.lastName" height={44} style={{ fontSize: 16 }} />
                                            <View height={1} alignSelf="stretch" backgroundColor={AppStyles.separatorColor} />
                                        </View>
                                    </ZListItemBase>
                                    <View marginTop={31} />
                                    <ZListItemGroup >
                                        <ListItemEdit title="Phone" field="input.phone" placehodler="123-456-7890" />
                                        <ListItemEdit title="Email" field="input.email" placehodler="your@email.com" />
                                        <ListItemEdit title="Website" field="input.website" placehodler="yoursite.com" />
                                        <ListItemEdit title="Linkedin" field="input.alphaLinkedin" placehodler="linkedin.com/in/you"/>
                                    </ZListItemGroup>
                                </ZForm>
                            )}
                        </ZQuery>
                    )}
                </YMutation>
            </>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent);
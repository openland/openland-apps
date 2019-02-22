import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, Text, Platform } from 'react-native';
import { ZForm } from '../../components/ZForm';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZTextInput } from '../../components/ZTextInput';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput2 } from 'openland-mobile/components/ZTextInput2';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';

export class ListItemEdit extends React.PureComponent<{
    autoFocus?: boolean;
    title: string;
    value?: string;
    valueStoreKey?: string;
    field?: string;
    onChange?: (val: string) => void;
    placeholder?: string;
}> {
    render() {
        return (
            <ZListItemBase separator={false}>
                <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                    <Text
                        style={{
                            width: 104,
                            color: '#8a8a8f',
                            fontSize: 13,
                            lineHeight: 22,
                            marginLeft: 16,
                            alignSelf: 'center',
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <ZTextInput
                        placeholder={this.props.placeholder}
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

const AvatarPickerInputGroup = (props: { avatarField: string; children?: any }) => {
    if (Platform.OS === 'android') {
        return (
            <View style={{ marginTop: -2, paddingLeft: 16, height: 100, flexDirection: 'row' }}>
                <View style={{ marginTop: 14 }}>
                    <ZAvatarPicker field={props.avatarField} size={86} />
                </View>
                <View
                    flexDirection="column"
                    flexGrow={1}
                    flexBasis={0}
                >
                    {props.children}
                </View>
            </View>
        );
    }

    return (
        <View style={{ paddingLeft: 16, height: 88, marginTop: 15, flexDirection: 'row' }}>
            <ZAvatarPicker field={props.avatarField} />
            <View
                flexDirection="column"
                flexGrow={1}
                flexBasis={0}
            >
                {props.children}
            </View>
        </View>
    );
}

const SettingsProfileContent = XMemo<PageProps>((props) => {
    let profile = getClient().useProfile().profile;
    let me = getClient().useAccount().me;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    await getClient().mutateProfileUpdate(args);
                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    input: {
                        firstName: profile!.firstName,
                        lastName: profile!.lastName,
                        photoRef: sanitizeImageRef(
                            profile!.photoRef,
                        ),
                        about: profile!.about,
                        phone: profile!.phone,
                        email: profile!.email,
                        location: profile!.location,
                        website: profile!.website,
                        alphaLinkedin: profile!.linkedin,
                    },
                }}
            >
                <AvatarPickerInputGroup avatarField="input.photoRef">
                    <ZTextInput2
                        placeholder="First name"
                        field="input.firstName"
                    />
                    <ZTextInput2
                        placeholder="Last name"
                        field="input.lastName"
                    />
                </AvatarPickerInputGroup>
                <View height={20} />
                <View>
                    <ZTextInput2
                        field="input.about"
                        placeholder="Add your bio"
                        multiline={true}
                    />
                </View>
                <View height={30} />
                <ZListItemGroup>
                    <ZListItem text="Username" description={'@' + me!.shortname} path="SetUserShortname" />
                    <ZListItem text="Primary organization" description={me!.primaryOrganization!.name} path="SelectPrimaryOrganization" />
                </ZListItemGroup>
                <View height={30} />
                <View>
                    <ZTextInput2
                        title="Phone"
                        field="input.phone"
                        placeholder="Add your phone"
                    />
                    <ZTextInput2
                        title="Email"
                        field="input.email"
                        placeholder="Add your email"
                    />
                    <ZTextInput2
                        title="Location"
                        field="input.location"
                        placeholder="Add your location"
                    />
                    <ZTextInput2
                        title="Website"
                        field="input.website"
                        placeholder="Add your website"
                    />
                    <ZTextInput2
                        title="LinkedIn"
                        field="input.alphaLinkedin"
                        placeholder="Add your LinkedIn account"
                    />
                </View>
            </ZForm>
        </>
    )
});

class SettingsProfileComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Edit profile" />
                <SettingsProfileContent {...this.props} />
            </>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent, { navigationAppearance: 'small' });

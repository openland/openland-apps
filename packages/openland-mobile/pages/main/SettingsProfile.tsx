import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View } from 'react-native';
import { ZForm } from '../../components/ZForm';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';

const SettingsProfileContent = XMemo<PageProps>((props) => {
    let profile = getClient().useProfile({ fetchPolicy: 'network-only' }).profile;
    let me = getClient().useAccount({ fetchPolicy: 'network-only' }).me;
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
                <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                    <ZTextInput
                        placeholder="First name"
                        field="input.firstName"
                    />
                    <ZTextInput
                        placeholder="Last name"
                        field="input.lastName"
                    />
                </ZAvatarPickerInputsGroup>
                <View height={20} />
                <ZTextInput
                    field="input.about"
                    placeholder="Add your bio"
                    multiline={true}
                />
                <View height={30} />
                <ZListItemGroup>
                    <ZListItem text="Username" description={me!.shortname ? '@' + me!.shortname : 'Create'} path="SetUserShortname" />
                    <ZListItem text="Primary organization" description={me!.primaryOrganization!.name} path="SelectPrimaryOrganization" />
                </ZListItemGroup>
                <View height={30} />
                <View>
                    <ZTextInput
                        title="Phone"
                        field="input.phone"
                        placeholder="Add your phone"
                    />
                    <ZTextInput
                        title="Email"
                        field="input.email"
                        placeholder="Add your email"
                    />
                    <ZTextInput
                        title="Location"
                        field="input.location"
                        placeholder="Add your location"
                    />
                    <ZTextInput
                        title="Website"
                        field="input.website"
                        placeholder="Add your website"
                    />
                    <ZTextInput
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

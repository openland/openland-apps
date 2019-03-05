import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View } from 'react-native';
import { ZForm } from '../../components/ZForm';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput2 } from 'openland-mobile/components/ZTextInput2';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';

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
                <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                    <ZTextInput2
                        placeholder="First name"
                        field="input.firstName"
                        border={true}
                    />
                    <ZTextInput2
                        placeholder="Last name"
                        field="input.lastName"
                        border={true}
                    />
                </ZAvatarPickerInputsGroup>
                <View height={20} />
                <View>
                    <ZTextInput2
                        field="input.about"
                        placeholder="Add your bio"
                        multiline={true}
                        border={true}
                    />
                </View>
                <View height={30} />
                <ZListItemGroup>
                    <ZListItem text="Username" description={me!.shortname ? '@' + me!.shortname : 'Create'} path="SetUserShortname" />
                    <ZListItem text="Primary organization" description={me!.primaryOrganization!.name} path="SelectPrimaryOrganization" />
                </ZListItemGroup>
                <View height={30} />
                <View>
                    <ZTextInput2
                        title="Phone"
                        field="input.phone"
                        placeholder="Add your phone"
                        border={true}
                    />
                    <ZTextInput2
                        title="Email"
                        field="input.email"
                        placeholder="Add your email"
                        border={true}
                    />
                    <ZTextInput2
                        title="Location"
                        field="input.location"
                        placeholder="Add your location"
                        border={true}
                    />
                    <ZTextInput2
                        title="Website"
                        field="input.website"
                        placeholder="Add your website"
                        border={true}
                    />
                    <ZTextInput2
                        title="LinkedIn"
                        field="input.alphaLinkedin"
                        placeholder="Add your LinkedIn account"
                        border={true}
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

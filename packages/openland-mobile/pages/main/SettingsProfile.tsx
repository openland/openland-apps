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
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZPickField } from 'openland-mobile/components/ZPickField';

const SettingsProfileContent = XMemo<PageProps>((props) => {
    let profile = getClient().useProfile({ fetchPolicy: 'network-only' }).profile;
    let me = getClient().useAccount({ fetchPolicy: 'network-only' }).me;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    if (!me) {
        return null;
    }

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
                <View alignItems="center" marginTop={10}>
                    <ZAvatarPicker size="xx-large" field="input.photoRef" />
                </View> 

                <ZListItemGroup header="Info" marginTop={0}>
                    <ZInput
                        placeholder="First name"
                        field="input.firstName"
                    />
                    <ZInput
                        placeholder="Last name"
                        field="input.lastName"
                    />
                    <ZPickField
                        label="Primary organization"
                        value={me.primaryOrganization ? me.primaryOrganization.name : undefined}
                        path="SelectPrimaryOrganization"
                    />
                    <ZInput
                        placeholder="About"
                        field="input.about"
                        multiline={true}
                    />
                    <ZInput
                        placeholder="Location"
                        field="input.location"
                    />
                </ZListItemGroup>

                <ZListItemGroup header="Username" marginTop={0}>
                    <ZPickField
                        label="Username"
                        value={me.shortname ? '@' + me.shortname : undefined}
                        path="SetUserShortname"
                    />
                </ZListItemGroup>

                <ZListItemGroup header="Contacts" marginTop={0}>
                    <ZInput
                        placeholder="Phone"
                        field="input.phone"
                    />
                    <ZInput
                        placeholder="Email"
                        field="input.email"
                    />
                    <ZInput
                        placeholder="Website"
                        field="input.website"
                    />
                    <ZInput
                        placeholder="LinkedIn"
                        field="input.alphaLinkedin"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    );
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

import * as React from 'react';
import { withApp } from '../../components/withApp';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

const SettingsProfileContent = XMemo<PageProps>((props) => {
    const { user, profile } = getClient().useProfile({ fetchPolicy: 'network-only' });

    if (!user || !profile) {
        return null;
    }

    const form = useForm();
    const firstNameField = useField('firstName', profile.firstName || '', form);
    const lastNameField = useField('lastName', profile.lastName || '', form);
    const photoField = useField('photoRef', profile.photoRef, form);
    const aboutField = useField('about', profile.about || '', form);
    const phoneField = useField('phone', profile.phone || '', form);
    const emailField = useField('email', profile.email || '', form);
    const locationField = useField('location', profile.location || '', form);
    const websiteField = useField('website', profile.website || '', form);
    const linkedinField = useField('linkedin', profile.linkedin || '', form);
    const instagramField = useField('instagram', profile.instagram || '', form);
    const facebookField = useField('facebook', profile.facebook || '', form);
    const twitterField = useField('twitter', profile.twitter || '', form);

    const handleSave = () =>
        form.doAction(async () => {
            await getClient().mutateProfileUpdate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                    photoRef: sanitizeImageRef(photoField.value),
                    about: aboutField.value,
                    phone: phoneField.value,
                    email: emailField.value,
                    location: locationField.value,
                    website: websiteField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                    facebook: facebookField.value,
                    twitter: twitterField.value,
                },
            });
            await getClient().refetchAccount();

            props.router.back();
        });

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>

                <ZListGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="First name"
                        field={firstNameField}
                    />
                    <ZInput
                        placeholder="Last name"
                        field={lastNameField}
                    />
                    <ZPickField
                        label="Primary organization"
                        value={profile.primaryOrganization ? profile.primaryOrganization.name : undefined}
                        path="SelectPrimaryOrganization"
                    />
                    <ZInput
                        placeholder="About"
                        field={aboutField}
                        multiline={true}
                    />
                    <ZInput
                        placeholder="Location"
                        field={locationField}
                    />
                </ZListGroup>

                <ZListGroup header="Username" headerMarginTop={0}>
                    <ZPickField
                        label="Username"
                        value={user.shortname ? '@' + user.shortname : undefined}
                        path="SetUserShortname"
                    />
                </ZListGroup>

                <ZListGroup header="Contacts" headerMarginTop={0}>
                    <ZInput
                        placeholder="Phone"
                        field={phoneField}
                    />
                    <ZInput
                        placeholder="Email"
                        field={emailField}
                    />
                    <ZInput
                        placeholder="Website"
                        field={websiteField}
                    />
                    <ZInput
                        placeholder="Instagram"
                        field={instagramField}
                    />
                    <ZInput
                        placeholder="Twitter"
                        field={twitterField}
                    />
                    <ZInput
                        placeholder="Facebook"
                        field={facebookField}
                    />
                    <ZInput
                        placeholder="LinkedIn"
                        field={linkedinField}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
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

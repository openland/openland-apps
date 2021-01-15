import * as React from 'react';
import { View, Platform, Text, TouchableWithoutFeedback } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

import { withApp } from 'openland-mobile/components/withApp';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { ZDateInputField } from 'openland-mobile/components/ZDateInput';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';
import { isValidDate } from 'openland-y-utils/wallet/dateTime';

const PrivacyLink = React.memo((props: { router: SRouter }) => {
    const theme = useTheme();
    const onPress = React.useCallback(() => {
        props.router.push('SettingsPrivacy');
    }, []);
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={{ color: theme.accentPrimary }}>Account and privacy</Text>
        </TouchableWithoutFeedback>
    );
});

const SettingsProfileContent = React.memo((props: PageProps) => {
    const theme = useTheme();
    const isIos = Platform.OS === 'ios';
    const { user, profile } = getClient().useProfile({ fetchPolicy: 'network-only' });
    const { phone, email } = getClient().useAuthPoints({ fetchPolicy: 'network-only' }).authPoints;

    if (!user || !profile) {
        return null;
    }

    const birthDay = React.useMemo(() => {
        return profile.birthDay && new Date(Number(profile.birthDay));
    }, [profile.birthDay]);

    const form = useForm();
    const firstNameField = useField('firstName', profile.firstName || '', form);
    const lastNameField = useField('lastName', profile.lastName || '', form);
    const photoField = useField('photoRef', profile.photoRef, form);
    const aboutField = useField('about', profile.about || '', form);
    const phoneField = useField('phone', (phone && formatPhone(phone)) || '', form);
    const emailField = useField('email', email || '', form);
    const birthDayField = useField('input.birthDay', birthDay || null, form, [
        {
            checkIsValid: (value) => !value || isValidDate(value),
            text: 'Please enter valid date',
        },
    ]);
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
                    birthDay: birthDayField.value?.getTime() || null,
                },
            });
            await getClient().refetchAccount();
            await getClient().refetchUser({ userId: user.id });

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
                    <ZInput placeholder="First name" field={firstNameField} />
                    <ZInput placeholder="Last name" field={lastNameField} />

                    <ZPickField
                        label="Primary organization"
                        value={
                            profile.primaryOrganization
                                ? profile.primaryOrganization.name
                                : undefined
                        }
                        path="SelectPrimaryOrganization"
                    />

                    <ZInput placeholder="About" field={aboutField} multiline={true} />
                    <ZInput placeholder="Location" field={locationField} />
                </ZListGroup>

                <ZListGroup header="Username" headerMarginTop={0}>
                    <ZPickField
                        label="Username"
                        value={user.shortname ? '@' + user.shortname : undefined}
                        path="SetUserShortname"
                    />
                </ZListGroup>

                <ZListGroup header="Birthday" headerMarginTop={0}>
                    <ZDateInputField field={birthDayField} />
                </ZListGroup>

                <ZListGroup header="Contacts" headerMarginTop={16}>
                    <ZInput placeholder="Phone" field={phoneField} disabled={true} />
                    <ZInput placeholder="Email" field={emailField} disabled={true} />
                    <Text
                        style={{
                            ...TextStyles.Caption,
                            marginHorizontal: 32,
                            marginBottom: 24,
                            color: theme.foregroundTertiary,
                        }}
                    >
                        {'Edit phone/email and their visibility \nin '}
                        <PrivacyLink router={props.router} />
                    </Text>
                    <ZInput placeholder="Website" field={websiteField} />
                    <ZInput placeholder="Instagram" field={instagramField} />
                    <ZInput placeholder="Twitter" field={twitterField} />
                    <ZInput placeholder="Facebook" field={facebookField} />
                    <ZInput placeholder="LinkedIn" field={linkedinField} />
                    {isIos && theme.type !== 'Light' && <View style={{ height: 88 }} />}
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

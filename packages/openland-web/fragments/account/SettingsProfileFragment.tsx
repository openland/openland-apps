import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { StoredFileT, XAvatarFormFieldComponent } from 'openland-x/XAvatarUpload';
import { XView } from 'react-mental';
import { SelectWithDropdown } from 'openland-web/pages/main/mail/SelectWithDropdown';
import { sanitizeImageRef } from '../../utils/sanitizer';
import { XButton } from 'openland-x/XButton';
import { XTextArea } from 'openland-x/XTextArea';
import { InputField } from 'openland-web/components/InputField';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { FormFooter } from './components/FormFooter';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import EditPhotoIcon from 'openland-icons/ic-edit-photo.svg';
import { AppConfig } from 'openland-y-runtime/AppConfig';

export const SettingsProfileFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const layout = useLayout();
    const shortnameMinLength = AppConfig.isSuperAdmin() ? 3 : 5;
    const shortnameMaxLength = 16;

    const { profile, user } = client.useProfile();
    const organizations = client.useMyOrganizations();

    if (!user || !profile) {
        return null;
    }

    const firstNameField = useField('input.firstName', profile.firstName || '', form, [
        {
            checkIsValid: value => !!value && value.length > 0,
            text: 'Please enter your name',
        },
    ]);
    const lastNameField = useField('input.lastName', profile.lastName || '', form);
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.avatar',
        sanitizeImageRef(profile.photoRef),
        form,
    );
    const primaryOrganizationField = useField(
        'input.primaryOrganization',
        profile.primaryOrganization && profile.primaryOrganization!!.id,
        form,
    );

    const aboutField = useField('input.about', profile.about || '', form);
    const locationField = useField('input.location', profile.location || '', form);
    const usernameField = useField('input.username', user.shortname || '', form, [
        {
            checkIsValid: value => !!value && value.length > 0 ? value.length >= shortnameMinLength : true,
            text: 'Username must have at least ' + shortnameMinLength + ' characters.',
        },
        {
            checkIsValid: value => !!value && value.length > 0 ? value.length < shortnameMaxLength : true,
            text: 'Username must have no more than ' + shortnameMaxLength + ' characters.',
        },
        {
            checkIsValid: value => !!value && value.length > 0 ? !!value.match('^[a-z0-9_]+$') : true,
            text: 'A username can only contain a-z, 0-9, and underscores.',
        },
    ]);
    const phoneNumberField = useField('input.phoneNumber', profile.phone || '', form);
    const emailField = useField('input.email', profile.email || '', form);
    const websiteField = useField('input.website', profile.website || '', form);
    const linkedinField = useField('input.linkedin', profile.linkedin || '', form);
    const instagramField = useField('input.instagram', profile.instagram || '', form);
    const twitterField = useField('input.twitter', profile.twitter || '', form);
    const facebookField = useField('input.facebook', profile.facebook || '', form);

    const doConfirm = () => {
        form.doAction(async () => {
            await client.mutateProfileUpdate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                    primaryOrganization: primaryOrganizationField.value,
                    about: aboutField.value,
                    photoRef: sanitizeImageRef(avatarField.value),
                    email: emailField.value,
                    website: websiteField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                    phone: phoneNumberField.value,
                    location: locationField.value,
                    twitter: twitterField.value,
                    facebook: facebookField.value,
                },
            });

            if (user.shortname !== usernameField.value) {
                await client.mutateSetUserShortname({
                    shortname: usernameField.value,
                });
            }

            await client.refetchAccount();
            await client.refetchMyOrganizations();
        });
    };

    const organizationsWithoutCommunity = organizations.myOrganizations.filter(i => !i.isCommunity);

    // Temp && ugly fix for users with community as primary organizations
    if (
        profile.primaryOrganization &&
        organizationsWithoutCommunity.filter(i => i.id === profile.primaryOrganization!.id)
            .length <= 0
    ) {
        organizationsWithoutCommunity.unshift(profile.primaryOrganization as any);
    }

    const avatarUploadComponent = (
        <XView>
            <XAvatarFormFieldComponent
                {...avatarField.input}
                size="small"
                rounded
                placeholder={{
                    add: 'Add photo',
                    change: 'Change Photo',
                }}
            />
            <XView
                position="absolute"
                right={2}
                bottom={2}
                zIndex={2}
                alignItems="center"
                justifyContent="center"
            >
                <EditPhotoIcon />
            </XView>
        </XView>
    );

    return (
        <Page>
            <UHeader title="Profile" />
            <FormWrapper title="Profile">
                <XView flexDirection="row" flexGrow={1}>
                    <XView flexGrow={1}>
                        {layout === 'mobile' && (
                            <XView alignItems="center">{avatarUploadComponent}</XView>
                        )}
                        <FormSection title="Info">
                            <XView marginBottom={16}>
                                <InputField
                                    title="First name"
                                    field={firstNameField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField
                                    title="Last name"
                                    field={lastNameField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <SelectWithDropdown
                                    {...primaryOrganizationField.input}
                                    size="large"
                                    title="Primary organization"
                                    selectOptions={organizationsWithoutCommunity.map(
                                        (org: any) => ({
                                            value: org.id,
                                            label: org.name,
                                        }),
                                    )}
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <XTextArea
                                    mode="modern"
                                    title="About"
                                    size="large"
                                    {...aboutField.input}
                                    resize={false}
                                />
                            </XView>
                            <InputField title="Location" field={locationField} size="large" />
                        </FormSection>
                        <FormSection title="Username">
                            <InputField
                                title="Username"
                                field={usernameField}
                                size="large"
                                invalid={!!form.error}
                                errorText={form.error}
                            />
                        </FormSection>
                        <FormSection title="Contacts">
                            <XView marginBottom={16}>
                                <InputField
                                    title="Phone number"
                                    field={phoneNumberField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title="Email" field={emailField} size="large" />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title="Website" field={websiteField} size="large" />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title="Instagram" field={instagramField} size="large" />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title="Twitter" field={twitterField} size="large" />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title="Facebook" field={facebookField} size="large" />
                            </XView>
                            <InputField title="LinkedIn" field={linkedinField} size="large" />
                        </FormSection>
                        <FormFooter>
                            <XButton
                                text="Save changes"
                                style="primary"
                                size="large"
                                alignSelf="flex-start"
                                onClick={doConfirm}
                                loading={form.loading}
                                square
                            />
                        </FormFooter>
                    </XView>
                    {layout === 'desktop' && (
                        <XView marginLeft={16} marginTop={48}>
                            {avatarUploadComponent}
                        </XView>
                    )}
                </XView>
            </FormWrapper>
        </Page>
    );
});

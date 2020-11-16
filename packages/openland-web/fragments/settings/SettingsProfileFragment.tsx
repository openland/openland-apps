import * as React from 'react';
import { css, cx } from 'linaria';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-api/useClient';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { UInput, UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { FormFooter } from './components/FormFooter';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { UDateInputField } from 'openland-web/components/unicorn/UDateInput';
import { isValidDate } from 'openland-y-utils/wallet/dateTime';

const privacyText = css`
    margin-bottom: 24px;
    margin-left: 16px;
    color: var(--foregroundSecondary);
`;

export const SettingsProfileFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const layout = useLayout();
    const shortnameMinLength = AppConfig.isSuperAdmin() ? 3 : 5;
    const shortnameMaxLength = 16;

    const { profile, user } = client.useProfile();
    const { phone, email } = client.useAuthPoints().authPoints;

    const organizations = client.useMyOrganizations();

    if (!user || !profile) {
        return null;
    }

    const birthDay = React.useMemo(() => {
        return profile.birthDay && new Date(Number(profile.birthDay));
    }, [profile.birthDay]);

    const firstNameField = useField('input.firstName', profile.firstName || '', form, [
        {
            checkIsValid: (value) => !!value && value.length > 0,
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
        profile.primaryOrganization && profile.primaryOrganization.id,
        form,
    );

    const aboutField = useField('input.about', profile.about || '', form);
    const locationField = useField('input.location', profile.location || '', form);
    const usernameField = useField('input.username', user.shortname || '', form, [
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? value.length >= shortnameMinLength : true,
            text: 'Username must have at least ' + shortnameMinLength + ' characters',
        },
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? value.length < shortnameMaxLength : true,
            text: 'Username must have no more than ' + shortnameMaxLength + ' characters',
        },
        {
            checkIsValid: (value) =>
                !!value && value.length > 0 ? !!value.match('^[a-z0-9_]+$') : true,
            text: 'A username can only contain a-z, 0-9, and underscores',
        },
    ]);
    const birthDayField = useField('input.birthDay', birthDay || null, form, [
        {
            checkIsValid: (value) => !value || isValidDate(value),
            text: 'Please enter valid date',
        },
    ]);
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
                    website: websiteField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                    location: locationField.value,
                    twitter: twitterField.value,
                    facebook: facebookField.value,
                    birthDay: birthDayField.value?.getTime(),
                },
            });

            if (user.shortname !== usernameField.value) {
                await client.mutateSetUserShortname({
                    shortname: usernameField.value,
                });
            }

            await client.refetchAccount();
            await client.refetchMyOrganizations();
            await client.refetchUser({ userId: user.id });
        });
    };

    const organizationsWithoutCommunity = organizations.myOrganizations.filter(
        (i) => !i.isCommunity,
    );

    // Temp && ugly fix for users with community as primary organizations
    if (
        profile.primaryOrganization &&
        organizationsWithoutCommunity.filter((i) => i.id === profile.primaryOrganization!.id)
            .length <= 0
    ) {
        organizationsWithoutCommunity.unshift(profile.primaryOrganization as any);
    }

    const avatarUploadComponent = (
        <XView>
            <UAvatarUploadField field={avatarField} />
        </XView>
    );

    return (
        <Page track="user_profile_edit">
            <UHeader title="Profile" />
            <FormWrapper>
                <XView flexDirection="row" flexGrow={1}>
                    <XView flexGrow={1} flexShrink={1}>
                        {layout === 'mobile' && (
                            <XView alignItems="center">{avatarUploadComponent}</XView>
                        )}
                        <FormSection title="Info">
                            <XView marginBottom={16}>
                                <UInputField label="First name" field={firstNameField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Last name" field={lastNameField} />
                            </XView>
                            <XView marginBottom={16}>
                                <USelectField
                                    field={primaryOrganizationField}
                                    label="Primary organization"
                                    options={organizationsWithoutCommunity.map((org: any) => ({
                                        value: org.id,
                                        label: org.name,
                                    }))}
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <UTextAreaField placeholder="About" field={aboutField} />
                            </XView>
                            <UInputField label="Location" field={locationField} />
                        </FormSection>
                        <FormSection title="Username">
                            <UInputField
                                label="Username"
                                field={usernameField}
                                invalid={!!form.error}
                                errorText={form.error}
                            />
                        </FormSection>
                        <FormSection title="Birthday">
                            <UDateInputField field={birthDayField} />
                        </FormSection>
                        <FormSection title="Contacts">
                            <XView
                                marginBottom={16}
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <UInput
                                    value={phone || ''}
                                    disabled={true}
                                    label="Phone"
                                    flexGrow={1}
                                    flexShrink={0}
                                    flexBasis={0}
                                    marginRight={8}
                                />
                                <UInput
                                    label="Email"
                                    value={email || ''}
                                    disabled={true}
                                    flexGrow={1}
                                    flexShrink={0}
                                    flexBasis={0}
                                    marginLeft={8}
                                />
                            </XView>
                            <div className={cx(privacyText, TextCaption)}>
                                Edit phone/email and their visibility in{' '}
                                <ULink path="/settings/privacy">Account and privacy</ULink>
                            </div>
                            <XView marginBottom={16}>
                                <UInputField label="Website" field={websiteField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Instagram" field={instagramField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Twitter" field={twitterField} />
                            </XView>
                            <XView marginBottom={16}>
                                <UInputField label="Facebook" field={facebookField} />
                            </XView>
                            <UInputField label="LinkedIn" field={linkedinField} />
                        </FormSection>
                        <FormFooter sticky={true}>
                            <UButton
                                text="Save changes"
                                size="large"
                                alignSelf="flex-start"
                                onClick={doConfirm}
                                loading={form.loading}
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

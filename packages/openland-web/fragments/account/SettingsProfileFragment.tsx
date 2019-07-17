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
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import EditPhotoIcon from 'openland-icons/ic-edit-photo.svg';

export const SettingsProfileFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const layout = useLayout();

    const profile = client.useProfile().profile!;
    const user = client.useProfile().user!;
    const organizations = client.useMyOrganizations();

    let firstNameField = useField('input.firstName', profile.firstName || '', form);
    let secondNameField = useField('input.secondName', profile.lastName || '', form);
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.avatar',
        sanitizeImageRef(profile.photoRef),
        form,
    );
    let primaryOrganizationField = useField(
        'input.primaryOrganization',
        profile.primaryOrganization && profile.primaryOrganization!!.id,
        form,
    );

    let aboutField = useField('input.about', profile.about || '', form);
    let locationField = useField('input.location', profile.location || '', form);
    let usernameField = useField('input.username', user.shortname || '', form);
    let phoneNumberField = useField('input.phoneNumber', profile.phone || '', form);
    let emailField = useField('input.email', profile.email || '', form);
    let websiteField = useField('input.website', profile.website || '', form);
    let linkedinField = useField('input.linkedin', profile.linkedin || '', form);

    const doConfirm = () => {
        form.doAction(async () => {
            await client.mutateProfileUpdate({
                input: {
                    firstName: firstNameField.value,
                    lastName: secondNameField.value,
                    alphaPrimaryOrganizationId: primaryOrganizationField.value,
                    about: aboutField.value,
                    photoRef: sanitizeImageRef(avatarField.value),
                    email: emailField.value,
                    website: websiteField.value,
                    alphaLinkedin: linkedinField.value,
                    phone: phoneNumberField.value,
                    location: locationField.value,
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
            <FormWrapper title="Profile">
                <XView flexDirection="row" flexGrow={1}>
                    <XView flexGrow={1}>
                        {layout === 'mobile' && (
                            <XView alignItems="center">{avatarUploadComponent}</XView>
                        )}
                        <FormSection title="Info">
                            <XView marginBottom={16}>
                                <InputField
                                    title={'First name'}
                                    field={firstNameField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField
                                    title={'Second name'}
                                    field={secondNameField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <SelectWithDropdown
                                    {...primaryOrganizationField.input}
                                    size="large"
                                    title={'Primary organization'}
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
                            <InputField title={'Location'} field={locationField} size="large" />
                        </FormSection>
                        <FormSection title="Username">
                            <InputField title={'Username'} field={usernameField} size="large" />
                        </FormSection>
                        <FormSection title="Contacts">
                            <XView marginBottom={16}>
                                <InputField
                                    title={'Phone number'}
                                    field={phoneNumberField}
                                    size="large"
                                />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title={'Email'} field={emailField} size="large" />
                            </XView>
                            <XView marginBottom={16}>
                                <InputField title={'Website'} field={websiteField} size="large" />
                            </XView>
                            <InputField title={'Linkedin'} field={linkedinField} size="large" />
                        </FormSection>
                        <FormFooter>
                            <XButton
                                text="Save changes"
                                style="primary"
                                size="large"
                                alignSelf="flex-start"
                                onClick={doConfirm}
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

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

export const ProfileTab = () => {
    const form = useForm();
    const client = useClient();

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

    const doConfirm = React.useCallback(() => {
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
    }, []);

    return (
        <FormWrapper title="Profile">
            <XView flexDirection="row">
                <XView>
                    <FormSection title="Info">
                        <InputField title={'First name'} field={firstNameField} size="large" />
                        <InputField title={'Second name'} field={secondNameField} size="large" />

                        <SelectWithDropdown
                            {...primaryOrganizationField.input}
                            title={'Primary organization'}
                            selectOptions={organizations.myOrganizations.map((org: any) => ({
                                value: org.id,
                                label: org.name,
                            }))}
                        />

                        <XTextArea
                            mode="modern"
                            title="About"
                            {...aboutField.input}
                            resize={false}
                        />
                        <InputField
                            title={''}
                            placeholder={'Location'}
                            field={locationField}
                            size="large"
                        />
                    </FormSection>
                    <FormSection title="Username">
                        <InputField title={'Username'} field={usernameField} size="large" />
                    </FormSection>
                    <FormSection title="Contacts">
                        <InputField
                            placeholder={'Phone number'}
                            title={''}
                            field={phoneNumberField}
                            size="large"
                        />
                        <InputField title={'Email'} field={emailField} size="large" />
                        <InputField title={'Website'} field={websiteField} size="large" />
                        <InputField
                            placeholder="Linkedin"
                            title={''}
                            field={linkedinField}
                            size="large"
                        />
                    </FormSection>
                    <XButton text="Save changes" style="primary" size="large" onClick={doConfirm} />
                </XView>
                <XAvatarFormFieldComponent
                    {...avatarField.input}
                    size="default"
                    placeholder={{
                        add: 'Add photo',
                        change: 'Change Photo',
                    }}
                />
            </XView>
        </FormWrapper>
    );
};

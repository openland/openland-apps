import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { StoredFileT, XAvatarFormFieldComponent } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { XView } from 'react-mental';
import {
    SelectWithDropdown,
    SelectWithDropdownOption,
} from 'openland-web/pages/main/mail/SelectWithDropdown';
import { XButton } from 'openland-x/XButton';

export const AccountTab = ({ photo }: { photo: string }) => {
    const form = useForm();
    const client = useClient();

    let firstNameField = useField('input.firstName', '', form);
    let secondNameField = useField('input.secondName', '', form);
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.avatar',
        { uuid: photo } as any,
        form,
    );
    let primaryOrganizationField = useField('input.primaryOrganization', '', form);
    let aboutField = useField('input.about', '', form);
    let locationField = useField('input.location', '', form);
    let usernameField = useField('input.username', '', form);
    let phoneNumberField = useField('input.phoneNumber', '', form);
    let emailField = useField('input.email', '', form);
    let websiteField = useField('input.website', '', form);
    let linkedinField = useField('input.linkedin', '', form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            //
        });
    }, []);

    const primaryOrganizationSelectOption: any[] = [];

    return (
        <div>
            <XView>
                <XView>
                    <XInput title={'First name'} {...firstNameField.input} size="large" />
                    <XInput title={'Second name'} {...secondNameField.input} size="large" />

                    <SelectWithDropdown
                        {...primaryOrganizationField.input}
                        title={'Primary organization'}
                        selectOptions={primaryOrganizationSelectOption}
                    />
                    <XInput title={'About'} {...aboutField.input} size="large" />
                    <XInput title={'Location'} {...locationField.input} size="large" />

                    <XInput title={'Username'} {...usernameField.input} size="large" />

                    <XInput title={'Phone number'} {...phoneNumberField.input} size="large" />

                    <XInput title={'Email'} {...emailField.input} size="large" />

                    <XInput title={'Website'} {...websiteField.input} size="large" />

                    <XInput {...linkedinField.input} size="large" />
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
        </div>
    );
};

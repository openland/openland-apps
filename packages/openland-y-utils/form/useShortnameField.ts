import { SForm } from 'openland-form/SForm';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { useField } from 'openland-form/useField';

export const useShortnameField = (title: string, initialShortname: string, form: SForm) => {
    const shortnameMinLength = AppConfig.isSuperAdmin() ? 3 : 5;
    const shortnameMaxLength = 16;
    const shortnameField = useField(title, initialShortname, form, [
        {
            checkIsValid: value =>
                !!value && value.length > 0 ? value.length >= shortnameMinLength : true,
            text: 'Shortname must have at least ' + shortnameMinLength + ' characters.',
        },
        {
            checkIsValid: value =>
                !!value && value.length > 0 ? value.length < shortnameMaxLength : true,
            text: 'Shortname must have no more than ' + shortnameMaxLength + ' characters.',
        },
        {
            checkIsValid: value =>
                !!value && value.length > 0 ? !!value.match('^[a-z0-9_]+$') : true,
            text: 'A shortname can only contain a-z, 0-9, and underscores.',
        },
    ]);

    return shortnameField;
};
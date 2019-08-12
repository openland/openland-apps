import * as React from 'react';
import { SForm } from './SForm';
export interface FormField<T> {
    value: T;
    input: {
        value: T;
        onChange: (value: T) => void;
        invalid: boolean;
        errorText: string;
    };
}

export function useField<T>(
    name: string,
    defaultValue: T,
    form: SForm,
    clientValidation?: {
        checkIsValid: (value: T) => boolean;
        text: string;
    }[],
) {
    let [value, setValue] = React.useState(defaultValue);

    let onChange = React.useCallback((src: T) => setValue(src), []);

    let field = React.useMemo(() => {
        const isInvalid = !!form.errorFields.find(v => v.key === name);
        let clientValidationFailed = false;

        let errorText = '';
        if (clientValidation) {
            for (let validation of clientValidation) {
                if (!validation.checkIsValid(value)) {
                    errorText = validation.text;
                    clientValidationFailed = true;
                    break;
                }
            }
        }

        form.updateClientValidation({
            name,
            valid: !clientValidationFailed,
        });

        const invalid = isInvalid || clientValidationFailed;

        return {
            input: { value, onChange, invalid, errorText },
            value,
        };
    }, [value, form, form.loading]);

    return field;
}

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
    let [changed, setChanged] = React.useState(false);

    let onChange = React.useCallback((src: T) => {
        setValue(src);
        setChanged(true);
    }, []);

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

        const invalid = (isInvalid || clientValidationFailed) && changed;

        return {
            input: { value, onChange, invalid, errorText },
            value,
        };
    }, [value, form, form.loading, changed]);

    return field;
}

import * as React from 'react';
import { SForm } from './SForm';

export function useField<T>(name: string, defaultValue: T, form: SForm) {
    let [value, setValue] = React.useState(defaultValue);
    let onChange = React.useCallback((src: T) => setValue(src), []);
    let field = React.useMemo(() => {
        return ({
            input: { value, onChange },
            value: value
        })
    }, []);
    field.input.value = value;
    field.value = value;
    return field;
}
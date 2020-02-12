import * as React from 'react';
import { USelect } from 'openland-web/components/unicorn/USelect';

export interface SelectWithDropdownOption<T = string | number | boolean> {
    value: T;
    label: string;
    labelShort?: string;
    subtitle?: string;
}

export function SelectWithDropdown<T>({
    title,
    value,
    onChange,
    selectOptions,
}: {
    title: any;
    value: any;
    onChange: (data: T) => void;
    selectOptions: SelectWithDropdownOption<T>[];
}) {
    let defaultVal = selectOptions.find(
        (item: SelectWithDropdownOption<T>) => item.value === value,
    );
    if (!defaultVal) {
        throw new Error(`Can't find value "${value}". Did you forget add it to selectOptions?`);
    }
    const [innerValue, setInnerValue] = React.useState<SelectWithDropdownOption<T>>(defaultVal);

    React.useEffect(
        () => {
            if (value !== innerValue) {
                if (value && !(value instanceof Array)) {
                    onChange(innerValue.value);
                }
            }
        },
        [innerValue],
    );
    return (
        <USelect
            placeholder={title}
            searchable={false}
            clearable={false}
            multi={false}
            value={innerValue.value}
            onChange={setInnerValue as any}
            options={selectOptions as any}
        />
    );
}

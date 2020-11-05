import * as React from 'react';
import { URadioItem } from 'openland-web/components/unicorn/URadioItem';
import { XViewProps } from 'react-mental';

export interface RadioButtonsSelectOptions<T> {
    value: T;
    label: string;
}

interface RadioButtonsSelectProps<T> extends XViewProps {
    value: any;
    onChange: (data: T) => void;
    selectOptions: RadioButtonsSelectOptions<T>[];
    withCorners?: boolean;
    disableHorizontalPadding?: boolean;
}

export function RadioButtonsSelect<T>({
    value,
    onChange,
    selectOptions,
    ...other
}: RadioButtonsSelectProps<T>) {
    let defaultVal = selectOptions.find(
        (item: RadioButtonsSelectOptions<T>) => item.value === value,
    );
    if (!defaultVal) {
        throw new Error(`Can't find value "${value}". Did you forget add it to selectOptions?`);
    }
    const [innerValue, setInnerValue] = React.useState<RadioButtonsSelectOptions<T>>(defaultVal);

    React.useEffect(() => {
        if (value !== innerValue) {
            if (value && !(value instanceof Array)) {
                onChange(innerValue.value);
            }
        }
    }, [innerValue]);

    return (
        <>
            {selectOptions.map((item: RadioButtonsSelectOptions<T>, key: number) => {
                return (
                    <URadioItem
                        {...other}
                        key={key}
                        label={item.label}
                        checked={item.value === innerValue.value}
                        onChange={() => {
                            setInnerValue(
                                selectOptions.find(
                                    (foundItem: RadioButtonsSelectOptions<T>) =>
                                        item.value === foundItem.value,
                                )!!,
                            );
                        }}
                    />
                );
            })}
        </>
    );
}

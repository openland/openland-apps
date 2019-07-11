import * as React from 'react';
import { XRadioItem } from 'openland-x/XRadio2';

export interface RadioButtonsSelectOptions<T> {
    value: T;
    label: string;
}

export function RadioButtonsSelect<T>({
    value,
    onChange,
    selectOptions,
}: {
    value: any;
    onChange: (data: T) => void;
    selectOptions: RadioButtonsSelectOptions<T>[];
}) {
    const [innerValue, setInnerValue] = React.useState<RadioButtonsSelectOptions<T>>(
        selectOptions.find((item: RadioButtonsSelectOptions<T>) => item.value === value)!!,
    );

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
                    <XRadioItem
                        key={key}
                        label={item.label}
                        checked={item.value === innerValue.value}
                        onChange={(checked: string) => {
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

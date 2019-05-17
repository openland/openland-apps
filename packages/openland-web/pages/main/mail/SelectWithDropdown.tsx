import * as React from 'react';
import { XView } from 'react-mental';
import { XSelect } from 'openland-x/XSelect';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';

const DropdownItem = ({ title, label }: { title: string; label: string }) => {
    return (
        <XView flexDirection="column" marginTop={-3}>
            <XView color="#1488f3" fontSize={12}>
                {title}
            </XView>
            <XView fontSize={14} color="#000" marginTop={-4}>
                {label}
            </XView>
        </XView>
    );
};

export interface SelectWithDropdownOption<T> {
    value: T;
    label: string;
    labelShort: string;
    subtitle: string;
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
    const [innerValue, setInnerValue] = React.useState<SelectWithDropdownOption<T>>(
        selectOptions.find((item: SelectWithDropdownOption<T>) => item.value === value)!!,
    );

    React.useEffect(() => {
        if (value !== innerValue) {
            if (value && !(value instanceof Array)) {
                onChange(innerValue.value);
            }
        }
    }, [innerValue]);

    const currentItemOptions = selectOptions.find(
        (item: SelectWithDropdownOption<T>) => item.value === innerValue.value,
    )!!;

    return (
        <>
            <XSelect
                searchable={false}
                clearable={false}
                withSubtitle={true}
                value={innerValue.value}
                onChange={setInnerValue as any}
                options={selectOptions as any}
            />
            <XView
                height={52}
                paddingHorizontal={16}
                backgroundColor="#f2f3f4"
                borderRadius={8}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <DropdownItem
                    title={title}
                    label={
                        currentItemOptions.labelShort
                            ? currentItemOptions.labelShort
                            : currentItemOptions.label
                    }
                />
                <ArrowIcon />
            </XView>
        </>
    );
}

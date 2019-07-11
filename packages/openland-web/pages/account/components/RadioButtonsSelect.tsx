import * as React from 'react';
import { XView } from 'react-mental';
import { XSelect } from 'openland-x/XSelect';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { css } from 'linaria';

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

export interface RadioButtonsSelectOptions<T> {
    value: T;
    label: string;
}

const SelectGroupTypeClassName = css`
    position: relative;
    cursor: pointer;
    & .Select-control > *,
    & .Select-control > *:focus,
    & .Select-control > *:active {
        box-shadow: none !important;
        border: none !important;
        cursor: pointer !important;
    }
    & > .x {
        position: absolute;
        width: 100%;
        top: 0px;
        pointer-events: none;
        cursor: pointer !important;
    }
    & .Select-control {
        height: 52px !important;
        opacity: 0;
    }
`;

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

    const currentItemOptions = selectOptions.find(
        (item: RadioButtonsSelectOptions<T>) => item.value === innerValue.value,
    )!!;

    return (
        <div className={SelectGroupTypeClassName}>
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
                backgroundColor="#f9f9f9"
                borderRadius={8}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <DropdownItem title="" label={currentItemOptions.label} />
                <ArrowIcon />
            </XView>
        </div>
    );
}

import * as React from 'react';
import { XView } from 'react-mental';
import { XSelect } from 'openland-x/XSelect';
import ArrowIcon from 'openland-icons/ic-arrow-group-select.svg';
import { css, cx } from 'linaria';

const DropdownItem = ({ title, label }: { title: string; label: string }) => {
    return (
        <XView flexDirection="column" marginTop={-3}>
            <XView color="#676D7A" fontSize={13}>
                {title}
            </XView>
            <XView fontSize={15} color="#171B1F" marginTop={-4}>
                {label}
            </XView>
        </XView>
    );
};

export interface SelectWithDropdownOption<T> {
    value: T;
    label: string;
    labelShort?: string;
    subtitle?: string;
}

const selectGroupTypeClassName = css`
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

const selectGroupTypeLargeClassName = css`
    & .Select-control {
        height: 56px !important;
        opacity: 0;
    }
`;

export function SelectWithDropdown<T>({
    title,
    value,
    onChange,
    selectOptions,
    size,
}: {
    title: any;
    value: any;
    onChange: (data: T) => void;
    selectOptions: SelectWithDropdownOption<T>[];
    size?: 'large';
}) {
    const [innerValue, setInnerValue] = React.useState<SelectWithDropdownOption<T>>(
        selectOptions.find((item: SelectWithDropdownOption<T>) => item.value === value)!!,
    );

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

    const currentItemOptions = selectOptions.find(
        (item: SelectWithDropdownOption<T>) => item.value === innerValue.value,
    )!!;

    return (
        <div className={cx(selectGroupTypeClassName, !!size && selectGroupTypeLargeClassName)}>
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
                backgroundColor="#F0F2F5"
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
        </div>
    );
}

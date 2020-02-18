import * as React from 'react';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import ActionSheet from './ActionSheet';
import { FormField } from 'openland-form/useField';

type ZSelectValue = string | number | boolean | undefined | null;

type ZSelectOption = {
    label: string;
    subtitle?: string;
    value: ZSelectValue;
    icon?: NodeRequire;
};

interface ZSelectBasicProps {
    label: string;
    modalTitle?: string;
    options: ZSelectOption[];
    disabled?: boolean;
    value?: ZSelectValue;
    description?: string;
    onChange?: (option: ZSelectOption) => void;
    noWrapper?: boolean;
}

interface ZSelectProps extends ZSelectBasicProps {
    field?: FormField<ZSelectValue>;
    defaultValue?: ZSelectValue;
}

const ZSelectBasic = (props: ZSelectBasicProps) => {
    const handleActionPress = React.useCallback(option => {
        if (props.onChange) {
            props.onChange(option);
        }
    }, []);

    const selectedOption = props.options.find(option => option.value === props.value);

    const handleFieldPress = React.useCallback(
        () => {
            const actionSheet = ActionSheet.builder();
            if (props.modalTitle) {
                actionSheet.title(props.modalTitle);
            }
            for (let option of props.options) {
                actionSheet.action(
                    option.label,
                    () => handleActionPress(option),
                    false,
                    option.icon,
                    option.subtitle,
                    option.value === props.value
                );
            }

            actionSheet.show();
        },
        [props.options],
    );

    return (
        <ZPickField
            {...props}
            arrow={'bottom'}
            onPress={handleFieldPress}
            value={selectedOption && selectedOption.label}
        />
    );
};

const ZSelectComponent = (props: ZSelectProps) => {
    const [value, setValue] = React.useState<ZSelectValue | undefined>(props.defaultValue);

    const handleChange = React.useCallback(
        option => {
            setValue(option.value);

            if (props.onChange) {
                props.onChange(option);
            }
        },
        [props.options],
    );

    return <ZSelectBasic {...props} value={value} onChange={handleChange} />;
};

export const ZSelect = React.memo((props: ZSelectProps) => {
    const { field, ...other } = props;

    if (field) {
        return (
            <ZSelectBasic
                {...other}
                value={field.input.value}
                onChange={(value) => {
                    field.input.onChange(value.value);
                }}
            />
        );
    } else {
        return <ZSelectComponent {...other} />;
    }
});

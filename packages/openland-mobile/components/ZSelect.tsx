import * as React from 'react';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { View } from 'react-native';
import ActionSheet from './ActionSheet';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';

type ZSelectValue = string | number | boolean;

type ZSelectOption = {
    label: string;
    value: ZSelectValue;
    icon?: NodeRequire;
};

interface ZSelectBasicProps {
    label: string;
    options: ZSelectOption[];
    disabled?: boolean;
    value?: ZSelectValue;
    description?: string;
    onChange?: (option: ZSelectOption) => void;  
}

interface ZSelectProps extends ZSelectBasicProps {
    field?: string;
    valueStoreKey?: string;
    defaultValue?: ZSelectValue;
}

const ZSelectBasic = (props: ZSelectBasicProps) => {
    const handleActionPress = React.useCallback((option) => {
        if (props.onChange) {
            props.onChange(option);
        }
    }, []);

    const handleFieldPress = React.useCallback(() => {
        const actionSheet = ActionSheet.builder();
        for (let option of props.options) {
            actionSheet.action(
                option.label, 
                () => handleActionPress(option),
                false,
                option.icon
            );
        }

        actionSheet.show();   
    }, [props.options]);

    const selectedOption = props.options.find(option => option.value === props.value);

    return (
        <ZPickField 
            {...props} 
            arrow={'bottom'}
            onPress={handleFieldPress} 
            value={selectedOption && selectedOption.label}
        />
    ); 
};

const ZSelectStored = (props: ZSelectProps & { store: XStoreState }) => {
    const { field, valueStoreKey, store } = props;
    const selectedValue = store.readValue(valueStoreKey || ('fields.' + field));

    const handleChange = React.useCallback((option) => {
        store.writeValue(valueStoreKey || ('fields.' + field), option.value);
        
        if (props.onChange) {
            props.onChange(option);
        }
    }, [valueStoreKey, field]);

    return (
        <ZSelectBasic 
            {...props}
            value={selectedValue}
            onChange={handleChange}
        />
    );
};

const ZSelectComponent = (props: ZSelectProps) => {
    const [value, setValue] = React.useState<ZSelectValue | undefined>(props.defaultValue);

    const handleChange = React.useCallback((option) => {
        setValue(option.value);
        
        if (props.onChange) {
            props.onChange(option);
        }
    }, [props.options]);

    return (
        <ZSelectBasic 
            {...props}
            value={value}
            onChange={handleChange}
        />
    );
};

export const ZSelect = (props: ZSelectProps) => {
    const { field, valueStoreKey, ...other } = props;

    if (field || valueStoreKey) {
        return (
            <XStoreContext.Consumer>
                {store => {
                    if (!store) {
                        throw Error('No store!');
                    }
                    return (
                        <ZSelectStored
                            {...other}
                            store={store}
                            field={field}
                            valueStoreKey={valueStoreKey}
                        />
                    );
                }}
            </XStoreContext.Consumer>
        );
    } else {
        return <ZSelectComponent {...other} />;
    }
};

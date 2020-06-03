import * as React from 'react';
import { ZInputBasicProps, ZInputBasic } from './basics/ZInputBasic';
import { FormField } from 'openland-form/useField';
import { TextInput } from 'react-native';

export interface ZInputProps extends ZInputBasicProps {
    field?: FormField<string>;
}

export const ZInput = React.forwardRef((props: ZInputProps, ref: React.RefObject<TextInput>) => {
    const { field, ...other } = props;

    if (field) {
        return (
            <ZInputBasic 
                {...other}
                ref={ref}
                description={field.input.invalid ? field.input.errorText : undefined}
                value={field.input.value}
                invalid={field.input.invalid || props.invalid}
                onChangeText={(text) => {
                    field.input.onChange(text);

                    if (props.onChangeText) {
                        props.onChangeText(text);
                    }
                }}
            />
        );
    } else {
        return <ZInputBasic {...other} ref={ref} />;
    }
});
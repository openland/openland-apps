import * as React from 'react';
import { ZInputBasicProps, ZInputBasic } from './basics/ZInputBasic';
import { FormField } from 'openland-form/useField';

export interface ZInputProps extends ZInputBasicProps {
    field?: FormField<string>;
}

export const ZInput = (props: ZInputProps) => {
    const { field, ...other } = props;

    if (field) {
        return (
            <ZInputBasic 
                {...other} 
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
        return <ZInputBasic {...other} />;
    }
};
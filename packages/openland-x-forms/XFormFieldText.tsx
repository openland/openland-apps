import * as React from 'react';
import { XInput } from 'openland-x/XInput';
import { XFormField } from './XFormField';
import Glamorous from 'glamorous';

const FormInput = Glamorous(XInput)({
    maxWidth: '480px'
});

export function XFormFieldText(props: {
    title: string,
    field: string,
    description?: string,
    size?: 'large' | 'medium' | 'default' | 'small'
}) {
    return (
        <XFormField title={props.title} description={props.description}>
            <FormInput
                valueStoreKey={'fields.' + props.field}
                invalidStoreKey={'errors.' + props.field}
                size={props.size}
            />
        </XFormField>
    );
}
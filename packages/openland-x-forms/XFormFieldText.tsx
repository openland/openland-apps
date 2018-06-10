import * as React from 'react';
import { XInput } from 'openland-x/XInput';
import { XFormField } from './XFormField';

export function XFormFieldText(props: {
    title: string,
    field: string,
    description?: string
}) {
    return (
        <XFormField title={props.title} description={props.description}>
            <XInput valueStoreKey={'fields.' + props.field} enabledStoreKey="form.enabled" />
        </XFormField>
    );
}
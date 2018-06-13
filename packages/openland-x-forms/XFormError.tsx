import * as React from 'react';
import { XFlexStyles } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';
import { XServiceMessage } from 'openland-x/XServiceMessage';

export function XFormError(props: XFlexStyles & { onlyGeneralErrors?: boolean }) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                let error = form.store.readValue('form.error');
                let errorFields = form.store.readValue('form.error_fields');
                if (error && ((props.onlyGeneralErrors === true && (!errorFields || errorFields.length === 0)) || props.onlyGeneralErrors !== true)) {
                    return <XServiceMessage {...props} title={error} />;
                }
                return null;
            }}
        </XFormContext.Consumer>
    );
}
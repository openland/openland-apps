import * as React from 'react';
import { XFlexStyles } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';
import { XServiceMessage } from 'openland-x/XServiceMessage';

export function XFormError(props: XFlexStyles) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                let error = form.store.readValue('form.error');
                if (error) {
                    return <XServiceMessage {...props} title={error} />;
                }
                return null;
            }}
        </XFormContext.Consumer>
    );
}
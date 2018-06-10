import * as React from 'react';
import { XFlexStyles } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';
import { XLoadingBar } from 'openland-x/XLoadingBar';

export function XFormLoadingBar(props: XFlexStyles) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                let loading = form.store.readValue('form.loading');
                return <XLoadingBar visible={!!loading} />;
            }}
        </XFormContext.Consumer>
    );
}
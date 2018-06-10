import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';

const DefaultContainer = Glamorous.div<{ loading: boolean } & XFlexStyles>([(props) => ({
    display: 'flex',
    flexDirection: 'column',
    opacity: props.loading ? 0.5 : 1,
    pointerEvents: props.loading ? 'none' : 'auto'
}), applyFlex]);

export function XFormLoadingContent(props: XFlexStyles & { children?: any }) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                let loading = form.store.readValue('form.loading');
                return (
                    <DefaultContainer loading={!!loading}>
                        {props.children}
                    </DefaultContainer>
                );
            }}
        </XFormContext.Consumer>
    );
}
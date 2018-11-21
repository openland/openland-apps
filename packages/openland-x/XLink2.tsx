import * as React from 'react';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { XViewProps, XView, XViewSelectedContext } from './XView';

export type XLink2Props = NavigableParentProps<XViewProps>;

export const XLink2 = makeNavigable<XViewProps>((props) => {
    return (
        <XView
            as="a"
            cursor="pointer"
            selected={!!props.active}
            {...props}
        >
            <XViewSelectedContext.Provider value={!!props.active}>
                {props.children}
            </XViewSelectedContext.Provider>
        </XView>
    );
});
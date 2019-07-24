import * as React from 'react';
import {
    makeNavigable,
    NavigableParentProps,
    NavigableChildProps,
} from './Navigable';
import { XViewProps, XView } from 'react-mental';

export type XLink2Props = NavigableParentProps<XViewProps>;

export const XLink2 = makeNavigable<XViewProps>(
    class XLink2Inner extends React.Component<
        XViewProps & NavigableChildProps
        > {
        render() {
            let props = this.props;
            return (
                <XView
                    as="a"
                    cursor="pointer"
                    selected={!!props.active}
                    hoverTextDecoration="none"
                    {...props}
                >
                    {props.children}
                </XView>
            );
        }
    },
);

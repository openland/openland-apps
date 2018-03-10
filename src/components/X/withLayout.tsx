import * as React from 'react';
import Glamorous from 'glamorous';
import { getComponentDisplayName } from '../../utils/utils';

export interface XLayoutProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
}

export function withLayout<TProps>(Wrapped: React.ComponentType<TProps>): React.ComponentType<TProps & XLayoutProps> {
    let Converted = Glamorous<XLayoutProps & TProps>(
        Wrapped,
        {
            filterProps: ['flexGrow', 'flexShrink', 'flexBasis', 'alignSelf'],
            displayName: `WithLayout(${getComponentDisplayName(Wrapped)})`
        })((props) => ({
            flexGrow: props.flexGrow,
            flexShrink: props.flexShrink,
            flexBasis: props.flexBasis,
            alignSelf: props.alignSelf,
        })) as React.ComponentType<XLayoutProps & TProps>;
    return function (props: TProps & XLayoutProps) {
        return <Converted {...props} />;
    };
}
import * as React from 'react';
import Glamorous from 'glamorous';

export type Align = 'center' | 'start' | 'end' | 'stretch' | 'baseline';

interface BaseProps {
    alignSelf?: Align | null;
    grow?: number | null;
    shrink?: number | null;
    basis?: number | null;
}

function convertAlign(own: boolean, align?: Align | null): 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | undefined {
    switch (align) {
        case 'center': {
            return 'center';
        }
        case 'start': {
            return 'flex-start';
        }
        case 'end': {
            return 'flex-end';
        }
        case 'baseline': {
            return 'baseline';
        }
        case 'stretch': {
            return 'stretch';
        }
        default: {
            if (own) {
                return undefined;
            } else {
                return 'stretch';
            }
        }
    }
}

export default function withBaseStyles<T extends { className?: string } = { className?: string }>(Wrapped: React.ComponentType<T>): React.ComponentType<T & BaseProps> {
    return Glamorous<T & BaseProps>(Wrapped as React.ComponentType<any>)((props) => ({
        alignSelf: convertAlign(true, props.alignSelf),
        flexGrow: props.grow !== null && props.grow !== undefined ? props.grow : undefined,
        flexShrink: props.shrink !== null && props.shrink !== undefined ? props.shrink : undefined,
        flexBasis: props.basis !== null && props.basis !== undefined ? props.basis : undefined,
    }));
}
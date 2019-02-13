import { FunctionComponent, NamedExoticComponent } from 'react';

export function XMemo<P = {}>(Component: FunctionComponent<P>): NamedExoticComponent<P> {
    return Component as any;
}
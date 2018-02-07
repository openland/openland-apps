import Glamorous, { GlamorousOptions } from 'glamorous';
import * as React from 'react';

export default function XStyled<TProps, ChildProps = {}>(component: React.ComponentType<ChildProps>, options?: Partial<GlamorousOptions<TProps & ChildProps, object, object>>) {
    return Glamorous<TProps & ChildProps>(component as any, options);
}

// class XStyledComponent<TProps> {
//     constructor()
// }
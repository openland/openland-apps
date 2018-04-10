import * as React from 'react';

export function findChild<T = {}>(children: any, key: string) {
    return React.Children.toArray(children).find((v) => React.isValidElement(v) && (v.props as any)[key] === true) as React.ReactElement<T>;
}
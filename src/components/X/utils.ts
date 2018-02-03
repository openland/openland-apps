import * as React from 'react';

export function hasChildren(type: string, children?: any): React.ReactElement<{}> | null {
    let child = React.Children.toArray(children);
    for (let ch of child) {
        if (React.isValidElement(ch) && ch.props[type] === true) {
            return ch;
        }
    }
    return null;
}

export function filterChildren(type: string, children?: any): any {
    let child = React.Children.toArray(children);
    let res: any[] = [];
    for (let ch of child) {
        if (React.isValidElement(ch)) {
            if (ch.props[type] !== true) {
                res.push(ch);
            }
        } else {
            res.push(ch);
        }
    }
    return res;
}
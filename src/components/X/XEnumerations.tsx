import * as React from 'react';

export function XEnumeration(props: { children: any }) {
    let child = React.Children.toArray(props.children);
    if (child.length === 0) {
        return null;
    } else if (child.length === 1) {
        return <React.Fragment>{child[0]}</React.Fragment>;
    }

    var childs = new Array<any>();
    for (let i = 0; i < child.length; i++) {
        if (i === child.length - 1) {
            childs.push(' and ');
        } else if (i > 0) {
            childs.push(', ');
        }
        childs.push(child[i]);
    }

    return (<React.Fragment>{childs}</React.Fragment>);
}
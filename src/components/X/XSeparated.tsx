import * as React from 'react';

export function XSeparated(props: { children: any, separator: React.ComponentType<{}> }) {
    let Separator = props.separator;
    let child = React.Children.toArray(props.children);
    var childs = new Array<any>();
    var isFirst = true;
    for (let c of child) {
        if (isFirst) {
            isFirst = false;
        } else {
            childs.push(<Separator key={'_separated_separator_' + child.length} />);
        }
        childs.push(c);
    }
    return (
        <React.Fragment>
            {childs}
        </React.Fragment>
    );
}
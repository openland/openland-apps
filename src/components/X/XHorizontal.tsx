import * as React from 'react';
import Glamorous from 'glamorous';

export let XHorizontalDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
})

export let XHorizontalSpaceDiv = Glamorous.div({
    width: 32,
    alignSelf: 'stretch',
    flexShrink: 0,
    flexGrow: 0
})

export class XHorizontal extends React.Component<{ className?: string }> {
    render() {
        let elements = React.Children.toArray(this.props.children);
        let children: any[] = [];
        let isFirst = true;
        for (let el of elements) {
            if (!isFirst) {
                children.push(<XHorizontalSpaceDiv />);
            } else {
                isFirst = false;
            }
            children.push(el);
        }
        return (
            <XHorizontalDiv className={this.props.className}>
                {children}
            </XHorizontalDiv>
        )
    }
}
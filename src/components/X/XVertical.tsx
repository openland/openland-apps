import * as React from 'react';
import Glamorous from 'glamorous';

export let XVerticalDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
})

export let XVerticalSpaceDiv = Glamorous.div({
    height: 16,
    alignSelf: 'stretch'
})

export class XVertical extends React.Component {
    render() {
        let elements = React.Children.toArray(this.props.children);
        let children: any[] = [];
        let isFirst = true;
        for (let el of elements) {
            if (!isFirst) {
                children.push(<XVerticalSpaceDiv/>);
            } else {
                isFirst = false;
            }
            children.push(el);
        }
        return (
            <XVerticalDiv>
                {children}
            </XVerticalDiv>
        )
    }
}
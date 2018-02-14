import * as React from 'react';
import Glamorous from 'glamorous';

export let XVerticalDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
})

export let XVerticalSpaceDiv = Glamorous.div<{ separator?: 'large' | 'normal' }>((props) => ({
    height: props.separator === 'large' ? 32 : 16,
    alignSelf: 'stretch',
    flexShrink: 0,
    flexGrow: 0
}));

export class XVertical extends React.Component<{ separator?: 'large' | 'normal', className?: string }> {
    render() {
        let elements = React.Children.toArray(this.props.children);
        let children: any[] = [];
        let isFirst = true;
        let separator = 0
        for (let el of elements) {
            if (!isFirst) {
                children.push(<XVerticalSpaceDiv key={'_separator_' + separator} separator={this.props.separator} />);
                separator++;
            } else {
                isFirst = false;
            }
            children.push(el);
        }
        return (
            <XVerticalDiv className={this.props.className}>
                {children}
            </XVerticalDiv>
        )
    }
}
import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex, extractFlexProps } from 'openland-x/basics/Flex';

export let XVerticalDiv = Glamorous.div<XFlexStyles>([
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative'
    },
    applyFlex
]);

export let XVerticalSpaceDiv = Glamorous.div<{ separator?: 'large' | 'normal' }>((props) => ({
    height: props.separator === 'large' ? 32 : 16,
    alignSelf: 'stretch',
    flexShrink: 0,
    flexGrow: 0
}));

export class XVertical extends React.Component<{ separator?: 'large' | 'normal' | 'none', className?: string } & XFlexStyles> {
    render() {

        let flexProps = extractFlexProps(this.props);

        if (this.props.separator !== 'none') {
            let elements = React.Children.toArray(this.props.children);
            let children: any[] = [];
            let isFirst = true;
            let separator = 0;
            let hadPadding = false;
            for (let el of elements) {
                if (!isFirst) {
                    if (!hadPadding) {
                        children.push(<XVerticalSpaceDiv key={'_separator_' + separator} separator={this.props.separator} />);
                        separator++;
                    }
                } else {
                    isFirst = false;
                }
                children.push(el);
                hadPadding = false;
                if (React.isValidElement(el)) {
                    if ((el.props as any)._isVerticalPaddingIncluded) {
                        hadPadding = true;
                    }
                }
            }
            return (
                <XVerticalDiv
                    className={this.props.className}
                    {...flexProps}
                >
                    {children}
                </XVerticalDiv>
            );
        } else {
            return (
                <XVerticalDiv
                    className={this.props.className}
                    {...flexProps}
                >
                    {this.props.children}
                </XVerticalDiv>
            );
        }
    }
}
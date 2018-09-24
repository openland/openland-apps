import * as React from 'react';
import Glamorous from 'glamorous';
import { CSSPropertiesRecursive } from 'glamorous/typings/css-properties';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'stretch',
});

export interface XSContainerProps {
    className?: string;
    css?: CSSPropertiesRecursive;
}

export class XSContainer extends React.PureComponent<XSContainerProps> {
    render() {
        return (
            <Wrapper css={this.props.css} className={this.props.className}>
                {this.props.children}
            </Wrapper>
        );
    }
}
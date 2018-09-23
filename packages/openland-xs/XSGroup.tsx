import * as React from 'react';
import Glamorous from 'glamorous';
import { CSSPropertiesRecursive } from 'glamorous/typings/css-properties';
import { _styles } from './_styles';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'stretch',
    paddingTop: '8px',
    marginBottom: '16px',
    maxWidth: _styles.contentMaxWidth
});

const Description = Glamorous.div({
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1.25,
    letterSpacing: -0.1,
    color: '#1f3449',
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export interface XSGroupProps {
    description?: string;
    className?: string;
    css?: CSSPropertiesRecursive;
}

export class XSGroup extends React.PureComponent<XSGroupProps> {
    render() {
        return (
            <Wrapper css={this.props.css} className={this.props.className}>
                {this.props.description && (<Description>{this.props.description}</Description>)}
                {this.props.children}
            </Wrapper>
        );
    }
}
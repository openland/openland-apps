import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Title = Glamorous.div({
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: -0.1,
    color: '#000',
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export interface XSGrouTitleProps {

}

export class XSGroupTitle extends React.PureComponent<XSGrouTitleProps> {
    render() {
        return (
            <Title>{this.props.children}</Title>
        );
    }
}
import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Title = Glamorous.div({
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.1,
    color: '#000',
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export interface XSDialogTitleProps {

}

export class XSDialogTitle extends React.PureComponent<XSDialogTitleProps> {
    render() {
        return (
            <Title>{this.props.children}</Title>
        );
    }
}
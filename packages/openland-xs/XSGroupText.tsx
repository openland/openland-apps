import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Title = Glamorous.div({
    fontSize: 17,
    fontWeight: 400,
    letterSpacing: -0.1,
    color: 'rgba(0,0,0,0.9)',
    lineHeight: '26px',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export interface XSGroupTextProps {

}

export class XSGroupText extends React.PureComponent<XSGroupTextProps> {
    render() {
        return (
            <Title>{this.props.children}</Title>
        );
    }
}
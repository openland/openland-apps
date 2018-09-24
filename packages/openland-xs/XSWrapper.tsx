import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'stretch',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export class XSWrapper extends React.PureComponent {
    render() {
        return <Wrapper>{this.props.children}</Wrapper>;
    }
}
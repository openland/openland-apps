import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
});

const InnerWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: _styles.contentMaxWidth,
    alignItems: 'stretch',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export class XSDialog extends React.PureComponent {
    render() {
        return (<Wrapper><InnerWrapper>{this.props.children}</InnerWrapper></Wrapper>);
    }
}
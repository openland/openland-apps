import * as React from 'react';
import Glamorous from 'glamorous';
import { XCheckboxProps, XCheckbox } from 'openland-x/XCheckbox';
import { _styles } from './_styles';

const Wrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'stretch',
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export class XSCheckbox extends React.PureComponent<XCheckboxProps> {
    render() {
        return (
            <Wrapper><XCheckbox {...this.props} /></Wrapper>
        );
    }
}
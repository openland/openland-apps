import * as React from 'react';
import Glamorous from 'glamorous';
import { _styles } from './_styles';

const Wrapper = Glamorous.div<{ appearance?: 'action' | 'general' }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    height: 48,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
    color: props.appearance === 'action' ? '#f00' : '#000',
    ':hover': {
        backgroundColor: '#f8f8fb'
    }
}));

const Title = Glamorous.div({
    fontSize: 17
});

export interface XSGroupItemProps {
    title?: string;
    appearance?: 'action' | 'general';
}

export class XSGroupItem extends React.PureComponent<XSGroupItemProps> {
    render() {
        return (
            <Wrapper appearance={this.props.appearance}><Title>{this.props.title}</Title></Wrapper>
        );
    }
}
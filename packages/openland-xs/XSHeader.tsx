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
});

const Title = Glamorous.div({
    fontSize: 22,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

const Subtitle = Glamorous.div({
    paddingTop: 8,
    fontSize: 18,
    opacity: 0.6,
    paddingLeft: _styles.paddingHorizontal,
    paddingRight: _styles.paddingHorizontal,
});

export interface XSHeaderProps {
    title: string;
    subtitle?: string;
}

export class XSHeader extends React.PureComponent<XSHeaderProps> {
    render() {
        return (
            <Wrapper>
                <Title>{this.props.title}</Title>
                {this.props.subtitle && <Subtitle>{this.props.subtitle}</Subtitle>}
                {this.props.children}
            </Wrapper>
        );
    }
}
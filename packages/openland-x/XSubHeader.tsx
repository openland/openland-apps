import * as React from 'react';
import Glamorous from 'glamorous';
import { XContentWrapper } from './XContentWrapper';

const Wrapper = Glamorous.div<{ border?: boolean }>((props) => ({
    display: 'flex',
    borderTop: props.border ? '1px solid #ececec' : undefined,
    padding: '11px 0 16px',
    position: 'relative',
}));

const Content = Glamorous(XContentWrapper)({
    display: 'flex',
});

const Title = Glamorous.div({
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: 0,
    color: '#000000',
    paddingTop: 2,
    display: 'flex',
});

const Counter = Glamorous.div({
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '30px',
    letterSpacing: 0,
    color: '#000000',
    opacity: 0.4,
    marginLeft: 5
});

const Right = Glamorous.div({
    
});

interface XSubHeaderProps {
    title: string;
    counter?: string | number;
    right?: any;
    border?: boolean;
}

export const XSubHeader = (props: XSubHeaderProps) => (
    <Wrapper border={props.border}>
        <Content>
            <Title>
                {props.title}
                {props.counter && (<Counter>{props.counter}</Counter>)}
            </Title>
            {props.right && (<Right>{props.right}</Right>)}
        </Content>
    </Wrapper>
);
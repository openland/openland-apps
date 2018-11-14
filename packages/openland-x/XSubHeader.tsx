import * as React from 'react';
import Glamorous from 'glamorous';
import { XContentWrapper } from './XContentWrapper';

const Wrapper = Glamorous.div<{ border?: boolean; paddingTop?: number; paddingBottom?: number }>((props) => ({
    display: 'flex',
    borderTop: props.border ? '1px solid #ececec' : undefined,
    paddingTop: typeof props.paddingTop === 'undefined' ? 11 : props.paddingTop,
    paddingBottom: typeof props.paddingBottom === 'undefined' ? 16 : props.paddingBottom,
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
    paddingTop?: number;
    paddingBottom?: number;
}

export const XSubHeader = (props: XSubHeaderProps) => (
    <Wrapper border={props.border} paddingTop={props.paddingTop} paddingBottom={props.paddingBottom}>
        <Content>
            <Title>
                {props.title}
                {props.counter && (<Counter>{props.counter}</Counter>)}
            </Title>
            {props.right && (<Right>{props.right}</Right>)}
        </Content>
    </Wrapper>
);
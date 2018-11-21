import * as React from 'react';
import Glamorous from 'glamorous';
import { XContentWrapper } from './XContentWrapper';

interface WrapperProps {
    border?: boolean;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number;
    marginBottom?: number;
}

const Wrapper = Glamorous.div<WrapperProps>((props) => ({
    display: 'flex',
    borderTop: props.border ? '1px solid #ececec' : undefined,
    paddingTop: typeof props.paddingTop === 'undefined' ? 11 : props.paddingTop,
    paddingBottom: typeof props.paddingBottom === 'undefined' ? 16 : props.paddingBottom,
    marginTop: typeof props.marginTop === 'undefined' ? 0 : props.marginTop,
    marginBottom: typeof props.marginBottom === 'undefined' ? 0 : props.marginBottom,
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

interface XSubHeaderProps extends WrapperProps {
    title: string;
    counter?: string | number;
    right?: any;
}

export const XSubHeader = (props: XSubHeaderProps) => {
    let { title, counter, right, ...other} = props;

    return (
        <Wrapper {...other}>
            <Content>
                <Title>
                    {title}
                    {counter && (<Counter>{counter}</Counter>)}
                </Title>
                {right && (<Right>{right}</Right>)}
            </Content>
        </Wrapper>
    );
};
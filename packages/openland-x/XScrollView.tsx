import * as React from 'react';
import Glamorous from 'glamorous';
// import Simplebar from 'simplebar';

export interface XScrollViewProps {
    className?: string;
    scroll?: 'vertical' | 'horizontal' | 'both';
}

const ScrollDiv = Glamorous.div<{ scroll: 'vertical' | 'horizontal' | 'both' }>((props) => ({
    overflowX: props.scroll === 'horizontal' || props.scroll === 'both' ? 'scroll' : 'hidden',
    overflowY: props.scroll === 'vertical' || props.scroll === 'both' ? 'scroll' : 'hidden'
}));

export class XScrollView extends React.Component<XScrollViewProps> {
    render() {
        return (
            <ScrollDiv className={this.props.className} scroll={this.props.scroll || 'vertical'}>
                {this.props.children}
            </ScrollDiv>
        );
    }
}
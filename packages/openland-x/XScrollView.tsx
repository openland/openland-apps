import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, extractFlexProps, applyFlex } from './basics/Flex';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

export interface XScrollViewProps extends XFlexStyles {
    className?: string;
    scroll?: 'vertical' | 'horizontal' | 'both';
}

const ScrollDiv = Glamorous.div<{ scroll: 'vertical' | 'horizontal' | 'both' } & XFlexStyles>([(props) => ({
    overflowX: props.scroll === 'horizontal' || props.scroll === 'both' ? 'scroll' : 'hidden',
    overflowY: props.scroll === 'vertical' || props.scroll === 'both' ? 'scroll' : 'hidden'
}), applyFlex]);

export class XScrollView extends React.Component<XScrollViewProps> {
    Simplebar = canUseDOM ? import('simplebar') : null;
    render() {
        return (
            <ScrollDiv
                className={this.props.className}
                scroll={this.props.scroll || 'vertical'}
                {...extractFlexProps(this.props)}
                innerRef={(src) => canUseDOM && this.Simplebar!!.then((v) => new v(src))}
            >
                {this.props.children}
            </ScrollDiv>
        );
    }
}
import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, extractFlexProps, applyFlex } from './basics/Flex';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

export interface XScrollViewProps extends XFlexStyles {
    className?: string;
    scroll?: 'vertical' | 'horizontal' | 'both';
}

const ScrollDiv = Glamorous.div<{ scroll: 'vertical' | 'horizontal' | 'both' } & XFlexStyles>([(props) => ({
    display: 'flex',
    overflowX: props.scroll === 'horizontal' || props.scroll === 'both' ? 'scroll' : 'hidden',
    overflowY: props.scroll === 'vertical' || props.scroll === 'both' ? 'scroll' : 'hidden'
}), applyFlex]);

export class XScrollView extends React.Component<XScrollViewProps> {
    Simplebar = canUseDOM ? require('simplebar') : null;

    handleRef = (el: any) => {
        console.warn(el);
        console.warn(el.childNodes.length);
        if (canUseDOM && el) {
            // tslint:disable
            new this.Simplebar(el);
            // tslint:enable
        }
    }

    render() {
        return (
            <ScrollDiv
                className={this.props.className}
                scroll={this.props.scroll || 'vertical'}
                {...extractFlexProps(this.props)}
                innerRef={this.handleRef}
            >
                <div className="simplebar-track vertical">
                    <div className="simplebar-scrollbar" />
                </div>
                <div className="simplebar-track horizontal">
                    <div className="simplebar-scrollbar" />
                </div>
                <div className="simplebar-scroll-content">
                    <div className="simplebar-content">
                        {this.props.children}
                    </div>
                </div>
            </ScrollDiv>
        );
    }
}
import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';
import Scrollbars from 'react-custom-scrollbars';

export interface XScrollViewProps extends XFlexStyles {
    flexDirection?: 'row' | 'column';
    className?: string;
    innerRef?: (src: any) => void;
    contentContainerRef?: (ref: any) => void;
    onScroll?: () => void;
    optimize?: boolean;
}

const ScrollDiv = Glamorous.div<XFlexStyles>([{
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    zIndex: 0,
    overflow: 'hidden!important',
    // maxHeight: 'inherit',
    WebkitOverflowScrolling: 'touch', /* Trigger native scrolling for mobile, if not supported, plugin is used. */
}, applyFlex]);

const ContentDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowX: 'scroll',
    transform: 'translateZ(0)'
});

export class XScrollView2 extends React.Component<XScrollViewProps> {
    // Simplebar = canUseDOM ? require('simplebar') : null;
    // handleRef = (el: any) => {
    //     if (canUseDOM && el) {
    //         let isSafari = (window as any).safari !== undefined;
    //         if (!isSafari || this.props.optimize !== true) {
    //             // tslint:disable
    //             new this.Simplebar(el);
    //             // tslint:enable
    //         }
    //     }
    // }

    render() {
        return (
            <ScrollDiv
                className={this.props.className}
                {...extractFlexProps(this.props)}
            >
                <Scrollbars universal={true} autoHide={true} style={{ height: '100%' }}>
                    <ContentDiv>
                        {this.props.children}
                    </ContentDiv>
                </Scrollbars>
            </ScrollDiv>

        );
    }
}
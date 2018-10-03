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
                    {/* <div className="simplebar-track vertical">
                        <div className="simplebar-scrollbar" />
                    </div>
                    <div className="simplebar-track horizontal">
                        <div className="simplebar-scrollbar" />
                    </div>
                    <div className="simplebar-scroll-content" ref={this.props.contentContainerRef || this.props.innerRef} onScroll={this.props.onScroll}>
                        <div className="simplebar-content" >
                            {this.props.children}
                        </div>
                    </div> */}
                    {this.props.children}
                </Scrollbars>
            </ScrollDiv>

        );
    }
}
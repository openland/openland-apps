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
    position: 'relative',
    flexDirection: 'column',
    zIndex: 0,
    display: 'flex'
}, applyFlex]);

const ContentDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
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
                <Scrollbars
                    universal={true}
                    autoHide={true}
                    style={{ height: '100%', flexGrow: 1 }}
                    className="scroll-bar"
                    // renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ backgroundColor: 'green', minHeight: 6, minWidth: 6 }} />}
                    // renderTrackVertical={props => <div {...props} className="track-vertical" style={{ backgroundColor: 'red', minHeight: 6, minWidth: 6 }} />}
                    // renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ backgroundColor: 'blue', minHeight: 6, minWidth: 6 }} />}
                    // renderThumbVertical={props => <div {...props} className="thumb-vertical" style={{ backgroundColor: 'yellow', minHeight: 6, minWidth: 6 }} />}
                >
                    <ContentDiv>
                        {this.props.children}
                    </ContentDiv>
                </Scrollbars>
            </ScrollDiv>

        );
    }
}
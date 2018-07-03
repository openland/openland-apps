import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'glamor';
import { XFlexStyles, extractFlexProps, applyFlex } from './basics/Flex';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

//
// Styles
//

css.global('.simplebar-scroll-content', {
    overflowX: 'hidden!important',
    overflowY: 'scroll',
    boxSizing: 'content-box!important',
    maxHeight: 'inherit!important',
    minWidth: '100%!important'
});

css.global('.simplebar-content', {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'scroll',
    overflowY: 'hidden!important',
    boxSizing: 'border-box!important',
    minHeight: '100%!important'
});

css.global('.simplebar-track', {
    zIndex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '11px'
});

css.global('.simplebar-scrollbar', {
    position: 'absolute',
    right: '2px',
    width: '7px',
    minHeight: '10px'
});

css.global('.simplebar-scrollbar:before', {
    position: 'absolute',
    content: '""',
    background: 'black',
    borderRadius: '7px',
    left: 0,
    right: 0,
    opacity: 0,
    transition: 'opacity 0.2s linear'
});

css.global('.simplebar-track:hover .simplebar-scrollbar:before', {
    opacity: 0.5,
    transition: 'opacity 0 linear'
});

css.global('.simplebar-track .simplebar-scrollbar.visible:before', {
    opacity: 0.5,
    transition: 'opacity 0 linear'
});

css.global('.simplebar-track.vertical', {
    top: 0
});

css.global('.simplebar-track.vertical .simplebar-scrollbar:before', {
    top: 2,
    bottom: 2
});

css.global('.simplebar-track.horizontal', {
    left: 0,
    width: 'auto',
    height: '11px'
});

css.global('.simplebar-track.horizontal .simplebar-scrollbar:before', {
    height: '100%',
    left: 2,
    right: 2
});

css.global('.horizontal.simplebar-track .simplebar-scrollbar', {
    right: 'auto',
    top: 2,
    height: 7,
    minHeight: 0,
    minWidth: 10,
    width: 'auto'
});

export interface XScrollViewProps extends XFlexStyles {
    flexDirection?: 'row' | 'column';
    className?: string;
    innerRef?: (src: any) => void;
}

const ScrollDiv = Glamorous.div<XFlexStyles>([{
    display: 'flex',
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden!important',
    maxHeight: 'inherit',
    WebkitOverflowScrolling: 'touch', /* Trigger native scrolling for mobile, if not supported, plugin is used. */
}, applyFlex]);

export class XScrollView extends React.Component<XScrollViewProps> {
    Simplebar = canUseDOM ? require('simplebar') : null;

    handleRef = (el: any) => {
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
                {...extractFlexProps(this.props)}
                innerRef={this.handleRef}
            >
                <div className="simplebar-track vertical">
                    <div className="simplebar-scrollbar" />
                </div>
                <div className="simplebar-track horizontal">
                    <div className="simplebar-scrollbar" />
                </div>
                <div className="simplebar-scroll-content" ref={this.props.innerRef}>
                    <div className="simplebar-content">
                        {this.props.children}
                    </div>
                </div>
            </ScrollDiv>
        );
    }
}
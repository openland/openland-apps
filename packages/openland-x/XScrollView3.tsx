import * as React from 'react';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XView, XStyles } from 'react-mental';
import { XFlexStyles } from './basics/Flex';

export interface XScrollView3Props extends XStyles {
    scrollbarRadius?: number;
    scrollbarWidth?: number;
    scrollbarTrackColor?: string;
    scrollbarHandleColor?: string;
    children?: any;
}

const WebKitBackend = Glamorous.div<{
    scrollbarRadius: number,
    scrollbarWidth: number,
    scrollbarTrackColor: string,
    scrollbarHandleColor: string
} & XFlexStyles>((props) => ({
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '100%',
    height: '100%',
    '::-webkit-scrollbar': {
        // left: '-10px',
        width: props.scrollbarWidth
    },
    '::-webkit-scrollbar-track': {
        backgroundColor: props.scrollbarTrackColor,
        borderRadius: props.scrollbarRadius
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: props.scrollbarHandleColor,
        borderRadius: props.scrollbarRadius,
    },
}));

export class XScrollView3 extends React.Component<XScrollView3Props> {

    private isWebkit: boolean

    constructor(props: { children?: any }) {
        super(props);
        if (!canUseDOM) {
            throw Error('XScrollView3 works only in browser');
        }
        this.isWebkit = ((window as any).safari !== undefined) || (window as any).chrome !== undefined;
    }

    render() {
        let {
            scrollbarRadius,
            scrollbarWidth,
            scrollbarTrackColor,
            scrollbarHandleColor,
            children,
            ...xstyles
        } = this.props;

        scrollbarRadius = scrollbarRadius || 4;
        scrollbarWidth = scrollbarWidth || 8;
        scrollbarTrackColor = scrollbarTrackColor || 'transparent';
        scrollbarHandleColor = scrollbarHandleColor || 'rgba(0,0,0,0.4)';

        if (this.isWebkit) {
            return (
                <XView {...xstyles}>
                    <WebKitBackend
                        scrollbarRadius={scrollbarRadius}
                        scrollbarWidth={scrollbarWidth}
                        scrollbarTrackColor={scrollbarTrackColor}
                        scrollbarHandleColor={scrollbarHandleColor}
                    >
                        <XView flexDirection="column" alignItems="stretch">
                            {this.props.children}
                        </XView>
                    </WebKitBackend>
                </XView>
            );
        }

        // Fallback
        return (
            <XView {...xstyles}>
                <WebKitBackend
                    scrollbarRadius={scrollbarRadius || 4}
                    scrollbarWidth={scrollbarWidth || 8}
                    scrollbarTrackColor={scrollbarTrackColor || 'transparent'}
                    scrollbarHandleColor={scrollbarHandleColor || 'rgba(0,0,0,0.4)'}
                >
                    <XView flexDirection="column" alignItems="stretch">
                        {this.props.children}
                    </XView>
                </WebKitBackend>
            </XView>
        );
    }
}
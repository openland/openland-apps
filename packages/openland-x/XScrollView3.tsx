import * as React from 'react';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XView, XStyles } from 'react-mental';
import Scrollbar from 'react-scrollbars-custom';

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
}>((props) => ({
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '100%',
    height: '100%',

    '::-webkit-scrollbar': {
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

class CustomBackend extends React.PureComponent<{ scrollbarWidth: number, scrollbarRadius: number, scrollbarTrackColor: string, scrollbarHandleColor: string }> {
    render() {
        return (
            <Scrollbar
                style={{ width: '100%', height: '100%' }}
                wrapperProps={{ style: { width: '100%', height: '100%' } }}
                trackYProps={{ style: { backgroundColor: this.props.scrollbarTrackColor, height: '100%', width: this.props.scrollbarWidth, borderRadius: this.props.scrollbarRadius, top: '0px' } }}
                thumbYProps={{ style: { backgroundColor: this.props.scrollbarHandleColor, borderRadius: this.props.scrollbarRadius, width: this.props.scrollbarWidth } }}
            >
                {this.props.children}
            </Scrollbar>
        );
    }
}

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
                <CustomBackend
                    scrollbarRadius={scrollbarRadius}
                    scrollbarWidth={scrollbarWidth}
                    scrollbarTrackColor={scrollbarTrackColor}
                    scrollbarHandleColor={scrollbarHandleColor}
                >
                    <XView flexDirection="column" alignItems="stretch">
                        {this.props.children}
                    </XView>
                </CustomBackend>
            </XView>
        );
    }
}
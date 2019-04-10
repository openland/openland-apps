import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XView, XStyles } from 'react-mental';
import Scrollbar from 'react-scrollbars-custom';
import { css } from 'linaria';

export interface XScrollValues {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
}

export interface XScrollView3Props extends XStyles {
    onScroll?: (values: XScrollValues) => void;
    children?: any;
}

const NativeScrollStyle = css`
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
`;

const NativeBackend = React.memo<{
    onScroll: (values: XScrollValues) => void;
    children?: any;
}>(props => {
    const callback = React.useCallback(src => {
        if (src) {
            src.addEventListener(
                'scroll',
                () => {
                    let scrollHeight = (src as HTMLDivElement).scrollHeight;
                    let scrollTop = (src as HTMLDivElement).scrollTop;
                    let clientHeight = (src as HTMLDivElement).clientHeight;
                    props.onScroll({ scrollHeight, scrollTop, clientHeight });
                },
                { passive: true },
            );
        }
    }, []);

    return (
        <div className={NativeScrollStyle} ref={callback}>
            {props.children}
        </div>
    );
});

class CustomBackend extends React.PureComponent<{ onScroll: (values: XScrollValues) => void }> {
    render() {
        return (
            <Scrollbar
                style={{
                    width: '100%',
                    height: '100%',
                    flexGrow: 1,
                    flexShrink: 0,
                    flexDirection: 'column',
                }}
                wrapperProps={{ style: { width: '100%', height: '100%', marginRight: 0 } }}
                trackYProps={{
                    style: {
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: 8,
                        borderRadius: 4,
                        top: '0px',
                    },
                }}
                thumbYProps={{
                    style: { backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 4, width: 8 },
                }}
                onScroll={this.props.onScroll}
            >
                {this.props.children}
            </Scrollbar>
        );
    }
}

export class XScrollView3 extends React.Component<XScrollView3Props> {
    private isWebkit: boolean;

    constructor(props: { children?: any }) {
        super(props);
        if (!canUseDOM) {
            throw Error('XScrollView3 works only in browser');
        }
        this.isWebkit =
            (window as any).safari !== undefined || (window as any).chrome !== undefined || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    private onScroll = (values: XScrollValues) => {
        if (this.props.onScroll) {
            this.props.onScroll(values);
        }
    };

    render() {
        let { onScroll, children, ...xstyles } = this.props;

        // scrollbarRadius = scrollbarRadius || 4;
        // scrollbarWidth = scrollbarWidth || 8;
        // scrollbarTrackColor = scrollbarTrackColor || 'rgba(0,0,0,0.1)';
        // scrollbarHandleColor = scrollbarHandleColor || 'rgba(0,0,0,0.4)';

        if (this.isWebkit) {
            return (
                <XView {...xstyles}>
                    <NativeBackend onScroll={this.onScroll}>
                        <XView
                            flexDirection="column"
                            alignItems="stretch"
                            flexGrow={1}
                            flexShrink={0}
                            height="100%"
                        >
                            {this.props.children}
                        </XView>
                    </NativeBackend>
                </XView>
            );
        }

        // Fallback
        return (
            <XView {...xstyles}>
                <CustomBackend onScroll={this.onScroll}>
                    <XView
                        flexDirection="column"
                        alignItems="stretch"
                        height="100%"
                        flexGrow={1}
                        flexShrink={0}
                    >
                        {this.props.children}
                    </XView>
                </CustomBackend>
            </XView>
        );
    }
}

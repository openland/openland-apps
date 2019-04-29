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
    innerRef?: any;
    children?: any;
    useDefaultScroll?: boolean;
}

const scrollToBottom = ({ scrollContainer }: { scrollContainer: HTMLElement }) => {
    scrollContainer.scrollTop = scrollContainer.children[0].getBoundingClientRect().height;
};

const scrollToTopOfElement = ({
    scrollContainer,
    targetElem,
    offset,
}: {
    scrollContainer: HTMLElement;
    targetElem: HTMLElement;
    offset?: number;
}) => {
    scrollContainer.scrollTop =
        targetElem.getBoundingClientRect().top -
        scrollContainer.getBoundingClientRect().top +
        scrollContainer.scrollTop +
        (offset || 0);
};

const scrollToBottomOfElement = ({
    scrollContainer,
    targetElem,
    offset,
}: {
    scrollContainer: HTMLElement;
    targetElem: HTMLElement;
    offset?: number;
}) => {
    const bottom =
        targetElem.getBoundingClientRect().top + targetElem.getBoundingClientRect().height;

    const newScrollTop =
        bottom -
        scrollContainer.getBoundingClientRect().height -
        scrollContainer.getBoundingClientRect().top +
        scrollContainer.scrollTop +
        (offset || 0);

    scrollContainer.scrollTop = newScrollTop;
};

const NativeScrollStyle = css`
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
`;

const NativeBackend = React.memo<{
    onScroll: (values: XScrollValues) => void;
    innerRef: any;
    children?: any;
}>(props => {
    React.useEffect(() => {
        if (props.innerRef && props.innerRef.current) {
            const src = props.innerRef.current;
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
        <div className={NativeScrollStyle} ref={props.innerRef}>
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
                    flexShrink: 1,
                    flexDirection: 'column',
                }}
                wrapperProps={{ style: { width: '100%', height: '100%', marginRight: 0 } }}
                contentProps={{ style: { display: 'flex', flexDirection: 'column' } }}
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
    nativeBackendElemRef = React.createRef<HTMLDivElement>();

    constructor(props: { children?: any }) {
        super(props);
        if (!canUseDOM) {
            throw Error('XScrollView3 works only in browser');
        }
        this.isWebkit =
            (window as any).safari !== undefined /* Chrome */ ||
            (window as any).chrome !== undefined /* Safari */ ||
            /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) /* Mobile */ ||
            !!(global as any).require /* Electron */;
    }

    public scrollToTopOfElement = ({
        targetElem,
        offset,
    }: {
        targetElem: HTMLElement;
        offset?: number;
    }) => {
        if (this.nativeBackendElemRef.current) {
            scrollToTopOfElement({
                targetElem,
                scrollContainer: this.nativeBackendElemRef.current,
                offset,
            });
        }
    };

    public scrollToBottomOfElement = ({
        targetElem,
        offset,
    }: {
        targetElem: HTMLElement;
        offset?: number;
    }) => {
        if (this.nativeBackendElemRef.current) {
            scrollToBottomOfElement({
                targetElem,
                scrollContainer: this.nativeBackendElemRef.current,
                offset,
            });
        }
    };

    public scrollToBottom = () => {
        if (this.nativeBackendElemRef.current) {
            scrollToBottom({
                scrollContainer: this.nativeBackendElemRef.current,
            });
        }
    };

    private onScroll = (values: XScrollValues) => {
        if (this.props.onScroll) {
            this.props.onScroll(values);
        }
    };

    render() {
        const { props } = this;

        // scrollbarRadius = scrollbarRadius || 4;
        // scrollbarWidth = scrollbarWidth || 8;
        // scrollbarTrackColor = scrollbarTrackColor || 'rgba(0,0,0,0.1)';
        // scrollbarHandleColor = scrollbarHandleColor || 'rgba(0,0,0,0.4)';

        if (this.isWebkit || this.props.useDefaultScroll) {
            return (
                <XView
                    overflow="hidden"
                    flexGrow={props.flexGrow}
                    flexShrink={props.flexShrink}
                    height={props.height}
                    minHeight={props.minHeight}
                    maxHeight={props.maxHeight}
                    width={props.width}
                    minWidth={props.minWidth}
                    alignSelf={props.alignSelf}
                    alignItems={props.alignItems}
                    flexDirection={props.flexDirection}
                    justifyContent={props.justifyContent}
                >
                    <NativeBackend onScroll={this.onScroll} innerRef={this.nativeBackendElemRef}>
                        <XView
                            flexDirection="column"
                            alignItems="stretch"
                            flexGrow={1}
                            flexShrink={0}
                        >
                            {this.props.children}
                        </XView>
                    </NativeBackend>
                </XView>
            );
        }

        // Fallback
        return (
            <XView
                overflow="hidden"
                flexGrow={props.flexGrow}
                flexShrink={props.flexShrink}
                height={props.height}
                minHeight={props.minHeight}
                width={props.width}
                minWidth={props.minWidth}
                alignSelf={props.alignSelf}
                alignItems={props.alignItems}
                flexDirection={props.flexDirection}
                justifyContent={props.justifyContent}
            >
                <CustomBackend onScroll={this.onScroll}>
                    <XView flexDirection="column" alignItems="stretch" flexGrow={1} flexShrink={0}>
                        {this.props.children}
                    </XView>
                </CustomBackend>
            </XView>
        );
    }
}

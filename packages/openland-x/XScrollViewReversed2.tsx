import * as React from 'react';
import { css } from 'linaria';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { XView, XStyles } from 'react-mental';
import { XScrollValues } from './XScrollView3';
import { throttle } from 'openland-y-utils/timer';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const ResizeObserver = ((canUseDOM && window && ((window as any).ResizeObserver)) || ResizeObserverPolyfill) as typeof ResizeObserverPolyfill;

const NativeScrollStyle = css`
    overflow-y: overlay;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-anchor: none;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
`;

const NativeScrollContentStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100% !important;
    overflow-y: hidden;
    overflow-x: hidden;
`;

export interface XScrollViewReverse2Props extends XStyles {
    onScroll?: (values: XScrollValues) => void;
    children?: any;
    innerRef?: React.RefObject<HTMLDivElement>;
}

interface XScrollViewReverse2RefProps {
    scrollToBottom: () => void;
    getScrollTop: () => number;
    getClientHeight: () => number;
}

export const XScrollViewReverse2 = React.memo(React.forwardRef<XScrollViewReverse2RefProps, XScrollViewReverse2Props>((props, ref) => {
    const outerRef = React.useRef<HTMLDivElement>(null);
    const innerRef = props.innerRef || React.useRef<HTMLDivElement>(null);
    const outerHeight = React.useRef<number>(0);
    const innerHeight = React.useRef<number>(0);
    const scrollTop = React.useRef<number>(0);
    const lastAnchors = React.useRef<Map<HTMLDivElement, number>>(new Map<HTMLDivElement, number>());

    // Instance methods
    React.useImperativeHandle<XScrollViewReverse2RefProps, any>(ref, () => ({
        scrollToBottom: () => {
            if (outerRef && outerRef.current) {
                outerRef.current.scrollTop = innerHeight.current;
            }
        },
        getScrollTop: () => {
            return scrollTop.current;
        },
        getClientHeight: () => {
            return outerHeight.current;
        }
    }));

    // onScroll reporter
    const reportOnScroll = React.useMemo(() => {
        let reportedClientHeight: number = 0;
        let reportedScrollTop: number = 0;
        let reportedScrollHeight: number = 0;

        return throttle(() => {
            const scrollHeight = innerHeight.current;
            const clientHeight = outerHeight.current;
            if (
                reportedScrollTop !== scrollTop.current ||
                reportedScrollHeight !== scrollHeight ||
                reportedClientHeight !== clientHeight
            ) {
                reportedScrollHeight = scrollHeight;
                reportedScrollTop = scrollTop.current;
                reportedClientHeight = clientHeight;
                if (props.onScroll) {
                    props.onScroll({
                        scrollHeight,
                        scrollTop: scrollTop.current,
                        clientHeight,
                    });
                }
            }
        }, 150);
    }, []);

    const calculateAnchors = React.useCallback(() => {
        let anchors = new Map<HTMLDivElement, number>();
        if (!innerRef.current || !outerRef.current) {
            return anchors;
        }
        for (let i = innerRef.current!.childElementCount - 1; i >= 0; i--) {
            let node = innerRef.current!.childNodes[i] as HTMLDivElement;
            let offset = node.offsetTop;
            anchors.set(node, offset);
        }
        return anchors;
    }, []);

    // Handle content change
    const updateSizes = React.useCallback((outer: number, inner: number) => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        if (!outerDiv || !innerDiv) {
            return;
        }

        let delta = 0;

        // Detect content movement
        const lAnchors = lastAnchors.current;
        for (let i = innerRef.current!.childElementCount - 1; i >= 0; i--) {
            let node = innerRef.current!.childNodes[i] as HTMLDivElement;
            let offset = node.offsetTop;
            let ex = lAnchors.get(node);
            if (ex !== undefined) {
                delta += offset - ex;
                break;
            }
        }

        // Detect outer content delta
        if (outer !== outerHeight.current) {
            let d = outer - outerHeight.current;
            outerHeight.current = outer;
            delta -= d;
        }
        if (delta !== 0) {

            if (delta < 0) {
                // We can't overscroll view (setting scrollTop can be ignored for invalid values)
                // so we need to measure maximum bottom scroll and adjust scroll value
                const currentBottom = innerHeight.current - scrollTop.current - outerHeight.current;
                if (currentBottom > -delta) {
                    delta = -currentBottom;
                }
            }

            scrollTop.current = outerDiv.scrollTop + delta;
            outerDiv.scrollTop = scrollTop.current;
            reportOnScroll();
        }
    }, []);

    // Initial calculations
    React.useLayoutEffect(() => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        innerHeight.current = innerDiv.clientHeight;
        outerHeight.current = outerDiv.clientHeight;
        scrollTop.current = innerHeight.current;
        outerDiv.scrollTop = scrollTop.current;
        lastAnchors.current = calculateAnchors();
        reportOnScroll();

        // Watch for scroll
        const onScrollHandler = () => {
            scrollTop.current = outerDiv.scrollTop;
            reportOnScroll();
        };
        outerDiv.addEventListener('scroll', onScrollHandler, { passive: true });

        // Watch for size
        let observer = new ResizeObserver(src => {
            let outer = outerHeight.current;
            let inner = innerHeight.current;

            for (let s of src) {
                if (s.contentRect.height === 0 && s.contentRect.width === 0) {
                    continue;
                }
                if (s.target === innerDiv) {
                    inner = s.contentRect.height;
                } else if (s.target === outerDiv) {
                    outer = s.contentRect.height;
                }
            }
            updateSizes(outer, inner);
            lastAnchors.current = calculateAnchors(); // Should be AFTER updateSizes since updateSizes requires old anchors.
        });
        observer.observe(innerDiv);
        observer.observe(outerDiv);

        return () => {
            outerDiv.removeEventListener('scroll', onScrollHandler);
            observer.disconnect();
        };
    }, []);

    // Render
    const { children, ...other } = props;
    return (
        <XView {...other}>
            <div className={NativeScrollStyle} ref={outerRef}>
                <div className={NativeScrollContentStyle} ref={innerRef}>
                    {props.children}
                </div>
            </div>
        </XView>
    );
}));

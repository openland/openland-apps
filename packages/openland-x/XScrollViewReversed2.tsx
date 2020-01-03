import * as React from 'react';
import { css } from 'linaria';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { XView, XStyles } from 'react-mental';
import { XScrollValues } from './XScrollView3';
import { throttle } from 'openland-y-utils/timer';
// import { canUseDOM } from 'openland-y-utils/canUseDOM';

const ResizeObserver = ResizeObserverPolyfill; // ((canUseDOM && window && ((window as any).ResizeObserver)) || ResizeObserverPolyfill) as typeof ResizeObserverPolyfill;

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
    const lastAnchors = React.useRef<{ height: number, offsets: Map<HTMLDivElement, number> }>({ height: 0, offsets: new Map<HTMLDivElement, number>() });

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
            return { height: 0, offsets: anchors };
        }
        for (let i = innerRef.current!.childElementCount - 1; i >= 0; i--) {
            let node = innerRef.current!.childNodes[i] as HTMLDivElement;
            let offset = node.offsetTop;
            anchors.set(node, offset);
        }
        return { height: innerRef.current!.clientHeight, offsets: anchors };
    }, []);

    // Handle content change
    const updateSizes = React.useCallback((outer: number, inner: number) => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        let delta = 0;
        if (!outerDiv || !innerDiv) {
            return;
        }

        // Hotfix?
        // outerDiv.scrollTop = outerDiv.scrollTop;
        // scrollTop.current = outerDiv.scrollTop;

        // DEBUG
        // const currentBottom = (innerHeight.current - innerDiv.scrollHeight - outerHeight.current);
        // let offsetBottom = -(scrollTop.current + outerHeight.current - innerHeight.current);
        // console.log('scroll-top: ' + outerDiv.scrollTop);
        // console.log('outer-height: ' + outerDiv.clientHeight);
        // console.log('inner-height: ' + innerDiv.clientHeight);
        // console.log('scroll-bottom: ' + offsetBottom);
        // DEBUG

        // Detect content delta
        let contentDelta = 0;
        let contentBottomDelta = 0;
        const lAnchors = lastAnchors.current;
        for (let i = innerRef.current!.childElementCount - 1; i >= 0; i--) {
            let node = innerRef.current!.childNodes[i] as HTMLDivElement;
            let offset = node.offsetTop;
            let ex = lAnchors.offsets.get(node);
            // console.log('ddd:' + (lAnchors.height - innerRef.current!.clientHeight));
            if (ex !== undefined) {
                contentDelta = offset - ex;
                contentBottomDelta = ((innerRef.current!.clientHeight - offset) - (lAnchors.height - ex));
                break;
            }
        }
        // console.log('content-delta: ' + contentDelta);
        // console.log('content-delta-bottom: ' + contentBottomDelta);
        // console.log('inner-delta: ' + (inner - innerHeight.current));

        // Detect outer content delta
        if (outer !== outerHeight.current) {
            delta += outerHeight.current - outer;
        }

        // Inner 
        // if (inner !== innerHeight.current) {
        //     let d = inner - innerHeight.current;
        //     if (d > 0 && contentDelta !== 0) {
        //         delta += contentDelta;
        //         console.log('inner-delta: ' + d);
        //     }
        // }

        delta += contentDelta;
        // delta += contentBottomDelta;

        // console.log('end-delta: ' + delta);
        // }

        // Update scroll
        if (delta !== 0) {

            // console.log('---');
            // console.log('delta: ' + delta);

            // if (delta < 0) {
            //     const offsetBottom = -(scrollTop.current + outer - inner);
            //     if (delta < -offsetBottom) {
            //         delta = -offsetBottom;
            //     }
            //     // console.log(offsetBottom);
            // }

            if (delta !== 0 && delta !== -0) {
                // Update scrollTop and then read actual value and save it
                // console.log(outerDiv.scrollTop);

                // const prevOffsetBottom = (innerHeight.current - outerHeight.current - scrollTop.current);
                // const currentOffsetBottom = (innerDiv.clientHeight - outerDiv.clientHeight - outerDiv.scrollTop);
                const nextOffsetBottom = (inner - outer - scrollTop.current) + delta;

                // console.log('content-height: ' + (innerHeight.current) + ' -> ' + innerDiv.clientHeight);
                // console.log('scroll-botom: ' + (prevOffsetBottom) + ' -> ' + (currentOffsetBottom) + ' -> ' + (nextOffsetBottom));
                // console.log('scroll-top: ' + (scrollTop.current) + ' -> ' + (outerDiv.scrollTop) + ' -> ' + (scrollTop.current + delta));

                // outerDiv.style.overflow = 'hidden';
                if (nextOffsetBottom >= 0) {
                    scrollTop.current = outerDiv.scrollTop;
                    scrollTop.current = scrollTop.current + delta;
                    outerDiv.scrollTop = scrollTop.current;
                }
                // setTimeout(function () { outerDiv.style.overflow = ''; }, 10);

                // console.log(outerDiv.scrollTop);
                // console.log('---');
            }
        }

        // Save Values
        outerHeight.current = outer;
        innerHeight.current = inner;
        scrollTop.current = outerDiv.scrollTop;

        // offsetBottom = -(scrollTop.current + outerHeight.current - innerHeight.current);
        // console.log('scroll-bottom-upd: ' + offsetBottom);

        // Report Scroll Event
        reportOnScroll();
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
            console.log('resize');
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
            lastAnchors.current = calculateAnchors(); // Should be AFTER updateSizes since updateSizes requires old anchors
        });
        observer.observe(innerDiv);
        observer.observe(outerDiv);

        // let mutObserver = new MutationObserver((mutations) => {
        //     console.log('mutation');
        // });
        // mutObserver.observe(innerDiv, { childList: true, attributes: true, characterData: true });

        return () => {
            // outerDiv.removeEventListener('scroll', onScrollHandler);
            observer.disconnect();
            // mutObserver.disconnect();
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

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

    // Initial calculations
    React.useLayoutEffect(() => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        innerHeight.current = innerDiv.clientHeight;
        outerHeight.current = outerDiv.clientHeight;
        scrollTop.current = innerHeight.current;
        outerDiv.scrollTop = scrollTop.current;
        reportOnScroll();

        // Watch for scroll
        const onScrollHandler = () => {
            scrollTop.current = outerDiv.scrollTop;
            reportOnScroll();
        };
        outerDiv.addEventListener('scroll', onScrollHandler, { passive: true });

        // Watch for size
        const childSizes = new Map<HTMLDivElement, number>();
        const childOffsets = new Map<HTMLDivElement, number>();
        let observer = new ResizeObserver(src => {
            let outer = outerHeight.current;
            let inner = innerHeight.current;

            let delta = 0;
            let topWindow = outerDiv.scrollTop;
            let bottomWindow = topWindow + outerDiv.clientHeight;

            for (let s of src) {
                if (s.contentRect.height === 0 && s.contentRect.width === 0) {
                    continue;
                }
                if (s.target === innerDiv) {
                    inner = s.contentRect.height;
                } else if (s.target === outerDiv) {
                    outer = s.contentRect.height;
                } else {
                    let t = s.target as HTMLDivElement;
                    let ex = childSizes.get(t);
                    if (ex !== undefined) {
                        let d = s.contentRect.height - ex;
                        childSizes.set(t, s.contentRect.height);
                        // childOffsets.set(t, s.contentRect.) Update?

                        if (d !== 0) {
                            let top = t.offsetTop;
                            let bottom = top + t.clientHeight;

                            if (top <= bottomWindow || bottom <= bottomWindow) {
                                delta += d;
                            }
                        }
                    }
                }
            }

            // Outer Container Delta
            if (outer !== outerHeight.current) {
                delta += outerHeight.current - outer;
            }

            // Apply
            scrollTop.current = scrollTop.current + delta;
            outerDiv.scrollTop = scrollTop.current;

            // Save Values
            outerHeight.current = outer;
            innerHeight.current = inner;
            reportOnScroll();
        });
        observer.observe(innerDiv);
        observer.observe(outerDiv);

        // Watch for children changes
        for (let i = 0; i < innerRef.current!.childElementCount; i++) {
            let node = innerRef.current!.childNodes[i] as HTMLDivElement;
            childSizes.set(node, node.clientHeight);
            childOffsets.set(node, node.offsetTop);
            observer.observe(node);
        }
        let childObserver = new MutationObserver((mutations) => {
            let delta = 0;
            let topWindow = outerDiv.scrollTop;
            let bottomWindow = topWindow + outerDiv.clientHeight;

            for (let m of mutations) {
                if (m.type === 'childList') {

                    // Removed nodes
                    for (let ri = 0; ri < m.removedNodes.length; ri++) {
                        let r = m.removedNodes[ri] as HTMLDivElement;

                        let top = childOffsets.get(r)!;
                        let bottom = top + childSizes.get(r)!;
                        if (top <= bottomWindow || bottom <= bottomWindow) {
                            delta -= childSizes.get(r)!;
                        }

                        observer.unobserve(r);
                        childSizes.delete(r);
                        childOffsets.delete(r);
                    }

                    // Added nodes
                    for (let ri = 0; ri < m.addedNodes.length; ri++) {
                        let r = m.addedNodes[ri] as HTMLDivElement;

                        // Update offset
                        let top = r.offsetTop;
                        let bottom = top + r.clientHeight;
                        if (top <= bottomWindow || bottom <= bottomWindow) {
                            delta += r.clientHeight;
                        }

                        // Set initial values
                        childSizes.set(r, r.clientHeight);
                        childOffsets.set(r, r.offsetTop);
                        observer.observe(r);
                    }
                }
            }

            // Apply changes
            scrollTop.current = scrollTop.current + delta;
            outerDiv.scrollTop = scrollTop.current;
        });
        childObserver.observe(innerDiv, { childList: true });

        return () => {
            outerDiv.removeEventListener('scroll', onScrollHandler);
            observer.disconnect();
            childObserver.disconnect();
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

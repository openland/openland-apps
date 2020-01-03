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

const context = React.createContext(() => { /*  */ });

export const useScrollRefresh = () => {
    let ct = React.useContext(context);
    React.useLayoutEffect(() => {
        ct();
    });
};

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

    // Handle content change
    const updateSizes = React.useCallback((outer: number, inner: number) => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        if (!outerDiv || !innerDiv) {
            return;
        }

        let delta = 0;
        if (inner !== innerHeight.current) {
            let d = inner - innerHeight.current;
            innerHeight.current = inner;
            if (d > 0) {
                delta += d;
            }
        }
        if (outer !== outerHeight.current) {
            let d = outer - outerHeight.current;
            outerHeight.current = outer;
            if (d < 0) {
                delta -= d;
            } else {
                // We can't overscroll view (setting scrollTop can be ignored for invalid values)
                // so we need to measure maximum bottom scroll and adjust scroll value
                const currentBottom = innerHeight.current - scrollTop.current - outerHeight.current;
                delta -= Math.min(d, currentBottom);
            }
        }
        if (delta !== 0) {
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
        });
        observer.observe(innerDiv);
        observer.observe(outerDiv);

        return () => {
            outerDiv.removeEventListener('scroll', onScrollHandler);
            observer.disconnect();
        };
    }, []);

    // Refresh callback used by children
    const ctx = React.useCallback(() => {
        const outerDiv = outerRef.current!!;
        const innerDiv = innerRef.current!!;
        if (!outerDiv || !innerDiv) {
            return;
        }
        updateSizes(outerDiv.clientHeight, innerDiv.clientHeight);
        reportOnScroll();
    }, []);

    // Render
    const { children, ...other } = props;
    return (
        <context.Provider value={ctx}>
            <XView {...other}>
                <div className={NativeScrollStyle} ref={outerRef}>
                    <div className={NativeScrollContentStyle} ref={innerRef}>
                        {props.children}
                    </div>
                </div>
            </XView>
        </context.Provider>
    );
}));

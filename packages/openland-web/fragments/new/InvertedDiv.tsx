import * as React from 'react';
import { css } from 'linaria';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { throttle } from 'openland-y-utils/timer';

const ResizeObserver = ((canUseDOM && window && ((window as any).ResizeObserver)) || ResizeObserverPolyfill) as typeof ResizeObserverPolyfill;

const outerClassName = css`
    
    /* Container Layout */
    display: flex;
    flex-shrink: 1;
    width: 100%;
    height: 100%;

    /* Basic Scrolling CSS */
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    /* Disable Anchoring */
    overflow-anchor: none;
`;

const innerClassName = css`
    
    /* Fill width and cut overflow */
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;

    /* For proper absolute layout */
    position: relative;
`;

const contentClassName = css`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

/**
 * The implementation idea is to have three different divs.
 * First one that one that scrolls inner content.
 * Second one is a div that is scrolled.
 * Third one is positioned on top with absolute position that have
 * an actual content for scrolling.
 * 
 * Third one is needed to adjust scroll position only when we want it to do.
 */

export interface ScrollValues {
    scrollHeight: number;
    scrollTop: number;
    scrollBottom: number;
    clientHeight: number;
}

export interface InvertedDivProps {
    onScroll?: (values: ScrollValues) => void;
    useLastItemAsPadding?: boolean;
    children?: any;
}

export interface InvertedDivInstance {
    scrollToBottom(): void;
    scrollToIndex(index: number): void;
    scrollToTop(): void;
}

export const InvertedDiv = React.memo(React.forwardRef<InvertedDivInstance, InvertedDivProps>((props, ref) => {
    const outerRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const outerHeight = React.useRef<number>(0);
    const contentHeight = React.useRef<number>(0);

    const useLastItemAsPadding = React.useMemo(() => (props.useLastItemAsPadding || false), []);
    if (useLastItemAsPadding !== (props.useLastItemAsPadding || false)) {
        throw Error('useLastItemAsPadding could not be changed');
    }

    const onScrollProps = React.useRef(props.onScroll);
    React.useEffect(() => {
        onScrollProps.current = props.onScroll;
    }, [props.onScroll]);

    React.useImperativeHandle(ref, () => ({
        scrollToBottom: () => {
            let outerDiv = outerRef.current;
            let innerDiv = innerRef.current;
            if (outerDiv && innerDiv) {
                outerDiv.scrollTop = innerDiv.clientHeight;
            }
        },
        scrollToIndex: (index: number) => {
            let outerDiv = outerRef.current;
            let contentDiv = contentRef.current;
            if (outerDiv && contentDiv && (index < contentDiv.childNodes.length)) {
                let node = contentDiv.childNodes.item(index) as HTMLDivElement;
                let offsetTop = node.offsetTop;
                let height = node.clientHeight;

                if (height < outerDiv.clientHeight) {
                    // Center in view
                    outerDiv.scrollTop = offsetTop - (outerDiv.clientHeight - height) / 2;
                } else {
                    // Top in view
                    outerDiv.scrollTop = offsetTop;
                }
            }
        },
        scrollToTop: () => {
            let outerDiv = outerRef.current;
            if (outerDiv) {
                outerDiv.scrollTop = 0;
            }
        }
    }));

    // Initialization
    React.useLayoutEffect(() => {
        const outerDiv = outerRef.current!;
        const innerDiv = innerRef.current!;
        const contentDiv = contentRef.current!;
        const childHeight = new Map<HTMLDivElement, number>();
        const childTop = new Map<HTMLDivElement, number>();
        let lastKnownBottomHeight: number = 0;
        let lastKnownScroll: number;

        // Set initial inner div size and scroll
        const initialOuterSize = Math.floor(outerDiv.clientHeight);
        const initialContentSize = Math.floor(contentDiv.clientHeight);
        innerDiv.style.height = Math.max(initialContentSize, initialOuterSize) + 'px';
        if (initialContentSize < initialOuterSize) {
            contentDiv.style.top = `${initialOuterSize - initialContentSize}px`;
        } else {
            contentDiv.style.top = `0px`;
        }
        lastKnownScroll = Math.max(initialContentSize - initialOuterSize, 0);
        outerDiv.scrollTop = lastKnownScroll;

        // Update top offsets
        function recalculateTopOffsets() {
            let acc = 0;
            for (let i = 0; i < contentRef.current!.childElementCount; i++) {
                let node = contentRef.current!.childNodes.item(i) as HTMLDivElement;
                let h = childHeight.get(node);
                if (h !== undefined) {
                    childTop.set(node, acc);
                    acc += h;
                } else {
                    console.warn('Unable to find cached child height for ', node, ' at ' + i);
                }
            }
        }

        //
        // Initial sizes
        //

        outerHeight.current = outerDiv.clientHeight;
        contentHeight.current = contentDiv.clientHeight;
        for (let i = 0; i < contentDiv.childElementCount; i++) {
            let node = contentDiv.childNodes[i] as HTMLDivElement;
            childHeight.set(node, node.clientHeight);
        }
        if (contentDiv.childElementCount > 0) {
            lastKnownBottomHeight = (contentDiv.childNodes[contentDiv.childElementCount - 1] as HTMLDivElement).clientHeight;
        }
        recalculateTopOffsets();

        //
        // Scroll Reporting
        //

        let reportedClientHeight: number = 0;
        let reportedScrollTop: number = 0;
        let reportedScrollHeight: number = 0;
        const reportScroll = throttle(() => {
            const scrollHeight = contentHeight.current;
            const clientHeight = outerHeight.current;
            if (
                reportedScrollTop !== lastKnownScroll ||
                reportedScrollHeight !== scrollHeight ||
                reportedClientHeight !== clientHeight
            ) {
                reportedScrollHeight = scrollHeight;
                reportedScrollTop = lastKnownScroll;
                reportedClientHeight = clientHeight;
                let callback = onScrollProps.current;
                let scrollTop = lastKnownScroll;
                let scrollBottom = Math.max(0, scrollHeight - clientHeight - scrollTop);
                if (callback) {
                    callback({
                        scrollHeight,
                        scrollTop,
                        scrollBottom,
                        clientHeight,
                    });
                }
            }
        }, 50);
        const onScrollHandler = () => {
            lastKnownScroll = outerDiv.scrollTop;
            reportScroll();
        };
        outerDiv.addEventListener('scroll', onScrollHandler, { passive: true });

        function getCurrentScroll() {
            let maxScroll = outerDiv.clientHeight - innerDiv.clientHeight;
            let scroll = outerDiv.scrollTop;
            if (scroll < 0) {
                return 0;
            }
            if (scroll > maxScroll) {
                return maxScroll;
            }
            return scroll;
        }

        // Observe resizes
        let observer = new ResizeObserver(src => {

            // Update last height if possible
            if (contentDiv.hasChildNodes()) {
                let last = contentDiv.lastChild! as HTMLDivElement;
                for (let s of src) {
                    if (s.target === last) {
                        lastKnownBottomHeight = s.contentRect.height;
                    }
                }
            }

            // Initial values
            let delta = 0;
            let topWindow = getCurrentScroll();
            let bottomWindow = topWindow + outerDiv.clientHeight - (useLastItemAsPadding && (lastKnownBottomHeight > 0) ? (lastKnownBottomHeight + 1) : 0);

            // Load current values
            let outer = outerHeight.current;
            let content = contentHeight.current;
            let itemsChanged = false;

            // Resolve resizes
            for (let s of src) {

                // Ignore when element is rendered with display:none
                if (s.contentRect.height === 0 && s.contentRect.width === 0) {
                    continue;
                }

                if (s.target === contentDiv) {
                    // If content div size changed
                    content = s.contentRect.height;
                } else if (s.target === outerDiv) {
                    // If outer div size changed
                    outer = s.contentRect.height;
                } else {
                    // If direct child size changed
                    let t = s.target as HTMLDivElement;
                    let ex = childHeight.get(t);
                    if (ex !== undefined) {
                        // Cache child size
                        childHeight.set(t, s.contentRect.height);

                        // Measure height delta
                        let d = s.contentRect.height - ex;

                        // If changed height - adjust scrolling offset
                        if (d !== 0) {
                            itemsChanged = true;
                            let top = t.offsetTop;
                            let bottom = top + t.clientHeight;

                            // If changed above of the bottom of the view window
                            // then adjust scrolling position
                            if (top <= bottomWindow || bottom <= bottomWindow) {
                                delta += d;
                                bottomWindow += d; // Move bottom of the window since change moved current window down
                            }
                        }
                    }
                }
            }

            // Outer delta
            if (outer !== outerHeight.current) {
                delta += outerHeight.current - outer;
            }

            // Update cached sizes
            outerHeight.current = outer;
            contentHeight.current = content;

            // Update scroll and inner div size
            let sourceScroll = outerDiv.scrollTop;
            innerDiv.style.height = Math.floor(Math.max(content, outer)) + 'px';
            if (content < outer) {
                contentDiv.style.top = `${outer - content}px`;
            } else {
                contentDiv.style.top = `0px`;
            }
            outerDiv.scrollTop = sourceScroll + delta;
            lastKnownScroll = sourceScroll + delta;

            // Report scroll if needed
            reportScroll();

            // Update top offsets
            if (itemsChanged) {
                recalculateTopOffsets();
            }
        });
        observer.observe(outerDiv);
        observer.observe(contentDiv);
        for (let i = 0; i < contentRef.current!.childElementCount; i++) {
            let node = contentRef.current!.childNodes[i] as HTMLDivElement;
            observer.observe(node);
        }

        // Observer childs
        let childObserver = new MutationObserver((mutations) => {

            // Reload bottom element height
            if (contentDiv.childElementCount > 0) {
                lastKnownBottomHeight = (contentDiv.childNodes[contentDiv.childElementCount - 1] as HTMLDivElement).clientHeight;
            } else {
                lastKnownBottomHeight = 0;
            }

            let delta = 0;
            let topWindow = getCurrentScroll();
            let bottomWindow = topWindow + outerDiv.clientHeight - (useLastItemAsPadding && (lastKnownBottomHeight > 0) ? (lastKnownBottomHeight + 1) : 0);
            for (let m of mutations) {
                if (m.type === 'childList') {
                    // Removed nodes
                    for (let ri = 0; ri < m.removedNodes.length; ri++) {
                        let r = m.removedNodes[ri] as HTMLDivElement;
                        let height = childHeight.get(r)!;
                        let top = childTop.get(r)!;
                        let bottom = top + height;

                        // Adjust delta if element was removed from above 
                        // of the bottom of viewport
                        if (top <= bottomWindow || bottom <= bottomWindow) {
                            delta -= height;
                        }

                        observer.unobserve(r);
                        childHeight.delete(r);
                        childTop.delete(r);
                    }

                    // Added nodes
                    for (let ri = 0; ri < m.addedNodes.length; ri++) {
                        let r = m.addedNodes[ri] as HTMLDivElement;

                        // Update offset
                        let top = r.offsetTop;
                        let bottom = top + r.clientHeight;

                        // Adjust delta if element was added above 
                        // of the bottom of viewport
                        if (top <= bottomWindow || bottom <= bottomWindow) {
                            delta += r.clientHeight;
                            bottomWindow += r.clientHeight; // Move bottom of the window since new added item moved current window down
                        }

                        // Set initial values
                        childHeight.set(r, r.clientHeight);
                        observer.observe(r);
                    }
                }
            }

            // Read current scroll and content height
            let sourceScroll = outerDiv.scrollTop;
            let sourceContentHeight = contentDiv.clientHeight;
            let sourceOuterHeight = outerDiv.clientHeight;

            // Update inner div height and scroll
            // NOTE: We need to update div height first since 
            //       otherwise we could get invalid scroll value

            let innerDivHeight = Math.floor(Math.max(sourceContentHeight, sourceOuterHeight));
            innerDiv.style.height = innerDivHeight + 'px';
            if (sourceContentHeight < sourceOuterHeight) {
                contentDiv.style.top = `${sourceOuterHeight - sourceContentHeight}px`;
            } else {
                contentDiv.style.top = `0px`;
            }
            outerDiv.scrollTop = sourceScroll + delta;
            lastKnownScroll = sourceScroll + delta;

            // Persist new content height
            contentHeight.current = sourceContentHeight;

            // Report scroll if needed
            reportScroll();

            // Update top offsets
            recalculateTopOffsets();
        });
        childObserver.observe(contentDiv, { childList: true });

        //
        // Unmount
        //

        return () => {
            observer.disconnect();
            childObserver.disconnect();
            outerDiv.removeEventListener('scroll', onScrollHandler);
        };
    }, []);

    return (
        <div className={outerClassName} ref={outerRef}>
            <div className={innerClassName} ref={innerRef}>
                <div className={contentClassName} ref={contentRef}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}));
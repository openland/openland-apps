import * as React from 'react';
import { css } from 'linaria';
import ResizeObserver from 'resize-observer-polyfill';
import { XView, XStyles } from 'react-mental';
import { XScrollValues } from './XScrollView3';
import { throttle } from 'openland-y-utils/timer';

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

export const XScrollViewAnchored = React.memo(
    React.forwardRef<XScrollViewReverse2RefProps, XScrollViewReverse2Props>(
        (props: XScrollViewReverse2Props, ref) => {
            const outerRef = React.useRef<HTMLDivElement>(null);
            const innerRef = props.innerRef || React.useRef<HTMLDivElement>(null);
            const outerHeight = React.useRef<number>(0);
            const innerHeight = React.useRef<number>(0);
            const scrollTop = React.useRef<number>(0);

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

            const reportOnScroll = React.useCallback(() => {
                if (props.onScroll) {
                    props.onScroll({
                        scrollHeight: innerHeight.current,
                        scrollTop: scrollTop.current,
                        clientHeight: outerHeight.current,
                    });
                }
            }, []);

            let anchorRef = React.useRef<{ offset: number, anchor: HTMLDivElement } | undefined>();
            let pickAnchor = React.useCallback(() => {
                if (!innerRef.current || !outerRef.current) {
                    return;
                }
                let prevDistance: number | undefined;
                for (let i = 1; i < innerRef.current!.childElementCount; i++) {
                    let node = innerRef.current!.childNodes[i] as HTMLDivElement;
                    let offset = node.offsetTop - outerRef.current!.scrollTop;
                    let distance = Math.abs(offset);
                    if ((prevDistance !== undefined) && distance > prevDistance) {
                        break;
                    }
                    prevDistance = distance;
                    node.style.backgroundColor = 'red';
                    if (anchorRef.current) {
                        anchorRef.current.anchor.style.backgroundColor = '';
                    }
                    anchorRef.current = { anchor: node, offset };

                }
            }, []);

            let ignoreNextScrollEvent = React.useRef(false);

            React.useLayoutEffect(() => {
                const outerDiv = outerRef.current!!;
                const innerDiv = innerRef.current!!;
                const onScrollHandler = throttle(() => {
                    if (ignoreNextScrollEvent.current) {
                        ignoreNextScrollEvent.current = false;
                    } else {
                        pickAnchor();
                    }
                    scrollTop.current = outerDiv.scrollTop;
                    reportOnScroll();
                }, 150);
                outerDiv.addEventListener('scroll', onScrollHandler, { passive: true });

                let observer = new ResizeObserver(src => {
                    innerHeight.current = innerDiv.clientHeight;
                    outerHeight.current = outerDiv.clientHeight;
                    scrollTop.current = innerHeight.current;

                    if (anchorRef.current) {
                        let delta = (anchorRef.current.anchor.offsetTop - innerRef.current!.scrollHeight) - anchorRef.current.offset;
                        scrollTop.current += delta;
                        outerRef.current!.scrollTop = scrollTop.current;
                    } else {
                        scrollTop.current = innerRef.current!.scrollHeight;
                        outerRef.current!.scrollTop = scrollTop.current;
                        pickAnchor();
                    }
                    reportOnScroll();
                    ignoreNextScrollEvent.current = true;
                });
                observer.observe(innerDiv);
                observer.observe(outerDiv);

                return () => {
                    outerDiv.removeEventListener('scroll', onScrollHandler);
                    observer.disconnect();
                };
            }, []);

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
        },
    ),
);

import * as React from 'react';
import { css, cx } from 'linaria';
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
    /* height: 100%; */
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
    bottomAttached?: boolean;
    contentClassName?: string;
}

interface XScrollViewReverse2RefProps {
    scrollToBottom: () => void;
    scrollTo: (target: Node) => void;
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

            const renderGeneration = React.useRef(0);
            const resizeGeneration = React.useRef(0);

            let bottomAttached = React.useRef(props.bottomAttached);
            bottomAttached.current = props.bottomAttached;

            let anchorRef = React.useRef<{ offset: number, anchor: HTMLDivElement } | undefined>();
            let pickAnchor = React.useCallback(() => {
                if (!innerRef.current || !outerRef.current) {
                    return;
                }
                let prevDistance: number | undefined;
                let targetPosition = outerRef.current!.scrollTop + outerRef.current!.clientHeight / 2;
                for (let i = 1; i < innerRef.current!.childElementCount; i++) {
                    let node = innerRef.current!.childNodes[i] as HTMLDivElement;
                    let offset = node.offsetTop - targetPosition;
                    let distance = Math.abs(offset);
                    if ((prevDistance !== undefined) && distance > prevDistance) {
                        break;
                    }
                    prevDistance = distance;
                    // node.style.backgroundColor = 'red';
                    // if (anchorRef.current) {
                    //     anchorRef.current.anchor.style.backgroundColor = '';
                    // }
                    anchorRef.current = { anchor: node, offset };

                }
            }, []);

            React.useImperativeHandle<XScrollViewReverse2RefProps, any>(ref, () => ({
                scrollToBottom: () => {
                    if (outerRef && outerRef.current) {
                        outerRef.current.scrollTop = innerHeight.current;
                        pickAnchor();
                    }
                },
                getScrollTop: () => {
                    return scrollTop.current;
                },
                getClientHeight: () => {
                    return outerHeight.current;
                },
                scrollTo: (target: any) => {
                    if (target.scrollIntoView) {
                        target.scrollIntoView();
                        pickAnchor();
                    }
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

            React.useEffect(() => {
                const outerDiv = outerRef.current!!;
                let trottledOnScrollReport = throttle(reportOnScroll, 150);
                const onScrollHandler = () => {
                    scrollTop.current = outerDiv.scrollTop;
                    trottledOnScrollReport();
                };
                outerDiv.addEventListener('scroll', onScrollHandler, { passive: true });
                return () => {
                    outerDiv.removeEventListener('scroll', onScrollHandler);
                };
            }, []);

            console.warn('renderGeneration', renderGeneration.current++);
            pickAnchor();

            React.useLayoutEffect(() => {
                const outerDiv = outerRef.current!!;
                const innerDiv = innerRef.current!!;
                innerHeight.current = innerDiv.clientHeight;
                outerHeight.current = outerDiv.clientHeight;
                scrollTop.current = innerHeight.current;

                if (anchorRef.current && !bottomAttached.current) {
                    let delta = anchorRef.current.anchor.offsetTop - innerRef.current!.scrollHeight - anchorRef.current.offset - outerRef.current!.clientHeight / 2;
                    scrollTop.current += delta;
                    outerRef.current!.scrollTop = scrollTop.current;
                } else {
                    scrollTop.current = innerRef.current!.scrollHeight;
                    outerRef.current!.scrollTop = scrollTop.current;
                    pickAnchor();
                }
                reportOnScroll();
            });

            const { children, ...other } = props;

            return (
                <XView {...other}>
                    <div className={NativeScrollStyle} ref={outerRef}>
                        <div className={cx(NativeScrollContentStyle, props.contentClassName)} ref={innerRef}>
                            {props.children}
                        </div>
                    </div>
                </XView>
            );
        },
    ),
);

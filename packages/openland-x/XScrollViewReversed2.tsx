import * as React from 'react';
import { css } from 'linaria';
import ResizeObserver from 'resize-observer-polyfill';
import { XView, XStyles } from 'react-mental';
import { XScrollValues } from './XScrollView3';

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
    children?: any
}

export const XScrollViewReverse2 = React.memo<XScrollViewReverse2Props>((props) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const ref2 = React.useRef<HTMLDivElement>(null);
    const ref3 = React.useRef<number>(0);
    const lastHeight = React.useRef<number>(0);

    const invokeOnScroll = React.useMemo(() => {
        return () => {
            let clientHeight = ref2.current!!.clientHeight;
            let scrollTop = ref.current!!.scrollTop;
            let scrollHeight = ref.current!!.clientHeight;
            if (props.onScroll) {
                props.onScroll({ scrollHeight, scrollTop, clientHeight });
            }
        };
    }, []);

    React.useLayoutEffect(() => {
        let v = ref.current!!;
        v.addEventListener('scroll', () => {
            let clientHeight = ref2.current!!.clientHeight;
            let scrollTop = ref.current!!.scrollTop;
            let scrollHeight = ref.current!!.clientHeight;
            let scrollBottom = clientHeight - scrollTop - scrollHeight;
            ref3.current = scrollBottom;

            invokeOnScroll();
        }, { passive: true });

        let lastHeight2 = v.clientHeight;
        let observer = new ResizeObserver(() => {
            let delta = v.clientHeight - lastHeight2;
            lastHeight2 = v.clientHeight;
            if (delta < 0) {
                v.scrollTop -= delta;
            }
            invokeOnScroll();
        });
        observer.observe(v);
    }, []);

    React.useLayoutEffect(() => {
        let v = ref2.current!!;
        lastHeight.current = v.clientHeight;
        let observer = new ResizeObserver(() => {
            let delta = v.clientHeight - lastHeight.current;
            lastHeight.current = v.clientHeight;
            if (delta > 0) {
                if (ref3.current < 50) {
                    ref.current!!.scrollTop = v!.clientHeight - ref.current!!.clientHeight;
                } else {
                    ref.current!!.scrollTop += delta;
                }
            }
            invokeOnScroll();
        });
        observer.observe(v);
        invokeOnScroll();
    }, []);

    React.useLayoutEffect(() => {
        let delta = ref2.current!!.clientHeight - lastHeight.current;
        lastHeight.current = ref2.current!!.clientHeight;
        if (delta > 0) {
            if (ref3.current < 50) {
                ref.current!!.scrollTop = ref2.current!!.clientHeight - ref.current!!.clientHeight;
            } else {
                ref.current!!.scrollTop += delta;
            }
        }
        invokeOnScroll();
    }, [props.children]);

    const { children, ...other } = props;

    return (
        <XView {...other}>
            <div className={NativeScrollStyle} ref={ref}>
                <div className={NativeScrollContentStyle} ref={ref2}>
                    {props.children}
                </div>
            </div>
        </XView>
    );
});
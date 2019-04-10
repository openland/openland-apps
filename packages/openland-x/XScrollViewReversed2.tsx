import * as React from 'react';
import { css } from 'linaria';
import ResizeObserver from 'resize-observer-polyfill';

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

export const XScrollViewReverse2 = React.memo<{ children?: any }>((props) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const ref2 = React.useRef<HTMLDivElement>(null);
    const ref3 = React.useRef<number>(0);

    React.useLayoutEffect(() => {
        let v = ref.current!!;
        v.addEventListener('scroll', () => {
            let clientHeight = ref2.current!!.clientHeight;
            let scrollTop = ref.current!!.scrollTop;
            let scrollHeight = ref.current!!.clientHeight;
            let scrollBottom = clientHeight - scrollTop - scrollHeight;
            ref3.current = scrollBottom;
        }, { passive: true });
    }, []);

    React.useLayoutEffect(() => {
        let v = ref2.current!!;
        let lastHeight = v.clientHeight;
        let observer = new ResizeObserver(() => {
            let delta = v.clientHeight - lastHeight;
            lastHeight = v.clientHeight;
            if (delta > 0) {
                if (ref3.current < 50) {
                    ref.current!!.scrollTop = v!.clientHeight - ref.current!!.clientHeight;
                } else {
                    ref.current!!.scrollTop += delta;
                }
            }
        });
        observer.observe(v);
    }, []);

    return (
        <div className={NativeScrollStyle} ref={ref}>
            <div className={NativeScrollContentStyle} ref={ref2}>
                {props.children}
            </div>
        </div>
    );
});
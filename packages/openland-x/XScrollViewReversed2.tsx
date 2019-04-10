import * as React from 'react';
import { css } from 'linaria';
import ResizeObserver from 'resize-observer-polyfill';

const NativeScrollStyle = css`
    overflow-y: overlay;
    overflow-x: hidden;
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

    React.useLayoutEffect(() => {
        let v = ref.current!!;
        let observer = new ResizeObserver(() => {
            console.log('sensor1');
        });
        observer.observe(v);
        // let rs = new ResizeSensor(v, (el) => {
        //     console.log('sensor1: ' + el.height);
        // });
    }, []);

    React.useLayoutEffect(() => {
        let v = ref2.current!!;
        let lastHeight = v.clientHeight;
        let observer = new ResizeObserver(() => {
            let delta = v.clientHeight - lastHeight;
            lastHeight = v.clientHeight;
            console.log('content: ' + delta);
            if (delta > 0) {
                ref.current!!.scrollTop += delta;
                //
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
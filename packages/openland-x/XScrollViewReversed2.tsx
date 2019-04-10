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
    -webkit-overflow-scrolling: touch;

    &:after {
        content: '';
        display: block;
        height: 2px;
        position: absolute;
        width: 100%;
        z-index: 99;
    }
`;

const Stub = css`
    display: block;
    height: 2px;
    position: absolute;
    width: 100%;
    z-index: 99;
`;

export const XScrollViewReverse2 = React.memo<{ children?: any }>((props) => {

    const ref = React.useRef<HTMLDivElement>(null);
    const ref2 = React.useRef<HTMLDivElement>(null);
    const ref3 = React.useRef<number>(0);

    React.useLayoutEffect(() => {
        console.log('ref: ' + ref.current!.scrollTop);
    }, [props.children]);

    React.useLayoutEffect(() => {
        let v = ref.current!!;
        let observer = new ResizeObserver(() => {
            console.log('sensor1');
        });
        observer.observe(v);
        // v.addEventListener('scroll', () => {
        //     if (ref.current!!.scrollTop < 2) {
        //         ref.current!!.scrollTop = 2;
        //     }
        // });
        v.addEventListener('scroll', () => {
            if (ref.current!!.scrollTop < 2) {
                ref.current!!.scrollTop = 2;
            }
            let clientHeight = ref2.current!!.clientHeight;
            let scrollTop = ref.current!!.scrollTop;
            let scrollHeight = ref.current!!.clientHeight;
            let scrollBottom = clientHeight - scrollTop - scrollHeight;
            ref3.current = scrollBottom;
            console.log('scrollBottom: ' + scrollBottom);
            // let scrollBottom = client
        }, { passive: true });
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
            let clientHeight = v.clientHeight;
            let scrollTop = ref.current!!.scrollTop;
            let scrollHeight = ref.current!!.clientHeight;

            if (delta > 0) {
                // console.log('current bottom: ' + ref3.current);
                if (ref3.current < 50) {
                    ref.current!!.scrollTop += delta;
                }
            }

            // console.log('resize: ', { clientHeight, scrollTop, scrollHeight });

            // let clientHeight = ref.current!!.scrollTop;
            // if (delta > 0) {
            //     ref.current!!.scrollTop += delta;
            //     //
            // }
        });
        observer.observe(v);
    }, []);

    return (
        <div className={NativeScrollStyle} ref={ref}>
            <div className={Stub} />
            <div className={NativeScrollContentStyle} ref={ref2}>
                {props.children}
            </div>
            <div className={Stub} />
        </div>
    );
});
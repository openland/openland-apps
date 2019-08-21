import * as React from 'react';
// import { useTime } from './useTime';
import { useClampedTime } from './useClampedTime';
import { Easings } from './Easings';

export const Slide = React.memo((props: { children?: any, start: number, duration: number }) => {
    // const time = useTime();
    // const visible = (time >= props.start - 0.3) && (time <= props.start + props.duration + 0.3);
    const startAnimation = Easings.standart(useClampedTime(props.start - 0.3, props.start));
    // const endAnimation = useClampedTime(props.start + props.duration - 0.3, props.start + props.duration);

    const offset = Math.floor((1 - startAnimation) * 100);
    // const offset = Math.floor((endAnimation) * 100);

    return (
        <div
            style={{
                display: 'flex',
                position: 'absolute',
                top: 0, right: 0, left: 0, bottom: 0,
                opacity: startAnimation,
                transform: `translateX(${offset}px)`
            }}
        >
            {props.children}
        </div>
    );
});
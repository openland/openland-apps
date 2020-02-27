import React from 'react';
import { css } from 'linaria';

const root = css`
    display: flex;
    flex-direction: column;
`;

const slider = css`
    overflow-x: hidden;
`;

const blanket = css`
    display: flex;
    transition: transform 300ms;
`;

export const USlider = React.memo((props) => {
    const [offset, setOffset] = React.useState<number>(0);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [childWidth, setChildWidth] = React.useState<number>(0);

    const blanketStyle = {
        transform: `translateX(${offset}px)`
    };

    const blanketRef = React.createRef<HTMLDivElement>();

    const reinitSlider = () => {
        const blanketElement = blanketRef.current;

        console.warn('call', { offset, numChildren, childWidth });
        if (blanketElement) {
            const numberOfChildren = blanketElement.children.length;
            const offsetWidth = blanketElement.getBoundingClientRect().width;

            setNumChildren(numberOfChildren);
            setChildWidth(offsetWidth);
        }
    };

    window.addEventListener('resize', reinitSlider);
    React.useLayoutEffect(reinitSlider, []);

    // research why useLayoutEffect doesnt't work as needed
    // uncomment in case of emergency release
    // setTimeout(reinitSlider, 300);

    const onNextClick = () => {
        if (Math.abs(offset - childWidth) < Math.abs(childWidth * numChildren)) {
            setOffset(offset - childWidth);
        }
    };
    const onPrevClick = () => {
        if (offset < 0) {
            setOffset(offset + childWidth);
        }
    };

    return (
        <div className={root}>
            <button onClick={onPrevClick}>prev</button>
            <button onClick={onNextClick}>next</button>
            <div className={slider}>
                <div className={blanket} style={blanketStyle} ref={blanketRef}>
                    {props.children}
                </div>
            </div>
        </div>
    );
});

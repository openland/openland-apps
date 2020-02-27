import React from 'react';
import { css } from 'linaria';

const root = css`

`;

const slider = css`
    overflow-x: hidden;
`;

const blanket = css`
    display: flex;
    transition: transform 300ms;
`;

const slide = css`
    width: 100%;
    height: 200px;
    background: red;
    flex-shrink: 0;
`;

export const USlider = React.memo(() => {
    const [offset, setOffset] = React.useState<number>(0);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [childWidth, setChildWidth] = React.useState<number>(0);

    const blanketStyle = {
        transform: `translateX(${offset}px)`
    };

    const blanketRef = React.createRef<HTMLDivElement>();

    const reinitSlider = () => {
        const blanketElement = blanketRef.current;

        console.warn('call', blanketElement)
        if (blanketElement) {
            const numberOfChildren = blanketElement.children.length;
            const offsetWidth = blanketElement.getBoundingClientRect().width;

            setNumChildren(numberOfChildren);
            setChildWidth(offsetWidth);
        }
    };

    window.addEventListener('resize', reinitSlider);
    React.useLayoutEffect(reinitSlider, []);

    const onNextClick = () => setOffset(offset - childWidth);
    const onPrevClick = () => setOffset(offset + childWidth);

    return (
        <div className={root}>
            <button onClick={onPrevClick}>prev</button>
            <button onClick={onNextClick}>next</button>
            <div className={slider}>
                <div className={blanket} style={blanketStyle} ref={blanketRef}>
                    <div className={slide}>one</div>
                    <div className={slide}>two</div>
                    <div className={slide}>three</div>
                </div>
            </div>
        </div>
    );
});

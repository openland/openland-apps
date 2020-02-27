import React from 'react';
import { css } from 'linaria';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import ArrowLeft from 'openland-icons/s/ic-arrow-left-16.svg';

import { UIconButton } from './UIconButton';

const root = css`
    display: flex;
    flex-direction: column;
`;

const slider = css`
    overflow-x: hidden;
    border-radius: 8px;
`;

const blanket = css`
    display: flex;
    transition: transform 300ms;
`;

const icons = css`
    align-self: flex-end;
    display: flex;
    margin-bottom: 16px;
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
    setTimeout(reinitSlider, 300);

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
            <div className={icons}>
                <UIconButton
                    icon={<ArrowLeft />}
                    size="xsmall"
                    onClick={onPrevClick}
                />

                <UIconButton
                    size="xsmall"
                    icon={<ArrowRight />}
                    onClick={onNextClick}
                />
            </div>
            <div className={slider}>
                <div className={blanket} style={blanketStyle} ref={blanketRef}>
                    {props.children}
                </div>
            </div>
        </div>
    );
});

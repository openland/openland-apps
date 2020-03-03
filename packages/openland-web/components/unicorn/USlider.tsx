import React from 'react';
import { css } from 'linaria';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import ArrowLeft from 'openland-icons/s/ic-arrow-left-16.svg';

import { UIconButton } from './UIconButton';
import { XView } from 'react-mental';
import { TextTitle3 } from 'openland-web/utils/TextStyles';

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
    transition: transform 100ms;
`;

const icons = css`
    display: flex;
`;

const header = css`
    margin-bottom: 8px;

    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
`;

interface USliderProps {
    title?: string;
    path?: string;
    children?: React.ReactNode;
}

const USliderRaw = React.memo((props: USliderProps) => {
    const [offset, setOffset] = React.useState<number>(0);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [childWidth, setChildWidth] = React.useState<number>(0);
    const [currentSlide, setCurrentSlide] = React.useState<number>(0);

    if (!props.children) {
        return null;
    }

    const blanketStyle = {
        transform: `translateX(${offset}px)`
    };

    const blanketRef = React.createRef<HTMLDivElement>();
    const sliderRef = React.createRef<HTMLDivElement>();

    const reinitSlider = () => {
        const blanketElement = blanketRef.current;

        if (blanketElement) {
            const numberOfChildren = blanketElement.children.length;
            const offsetWidth = blanketElement.children[0].getBoundingClientRect().width;

            setNumChildren(numberOfChildren);
            setChildWidth(offsetWidth);
        }
    };

    window.addEventListener('resize', reinitSlider);
    React.useLayoutEffect(reinitSlider, []);

    const onNextClick = () => {
        const blanketElement = blanketRef.current;
        const sliderElement = sliderRef.current;

        if (blanketElement && sliderElement) {
            const blanketRect = blanketElement.getBoundingClientRect();
            const sliderRect = sliderElement.getBoundingClientRect();

            const sliderRightmostPoint = sliderRect.right;
            const blanketWidth = childWidth * numChildren;
            const blanketRightmostPoint = blanketRect.left + blanketWidth;
            const gap = 16;

            if (sliderRightmostPoint < blanketRightmostPoint - gap) {
                setOffset(offset - childWidth);
                setCurrentSlide(currentSlide + 1);
            }
        }
    };
    const onPrevClick = () => {
        if (currentSlide > 0) {
            setOffset(offset + childWidth);
            setCurrentSlide(currentSlide - 1);
        }

    };

    return (
        <div className={root}>
            <div className={header}>
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
                {props.title && (
                    <XView path={props.path ? props.path : undefined} flexDirection="row" alignItems="center" cursor={props.path ? 'pointer' : undefined}>
                        <h2 className={TextTitle3}>{props.title}</h2>
                        {props.path && (
                            <XView marginLeft={8}>
                                <ArrowRight />
                            </XView>
                        )}
                    </XView>
                )}
            </div>
            <div className={slider} ref={sliderRef}>
                <div className={blanket} style={blanketStyle} ref={blanketRef}>
                    {props.children}
                </div>
            </div>
        </div>
    );
});

export const USlider = React.memo((props: USliderProps) => (
    <React.Suspense fallback={null}>
        <USliderRaw {...props} />
    </React.Suspense>
));

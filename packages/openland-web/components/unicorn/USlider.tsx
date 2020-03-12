import React from 'react';
import { css } from 'linaria';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import ArrowLeft from 'openland-icons/s/ic-arrow-left-16.svg';
import { UIconButton } from './UIconButton';
import { XView } from 'react-mental';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';

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
    user-select: none;
`;

const icons = css`
    display: flex;
    position: relative;
    left: 8px;
`;

const titleContainer = css`
    display: flex;
    user-select: none;

    &:hover span {
        transform: translateX(5px);
    }

    &:hover span:after {
        transform: scale(1);
    }
`;

const iconContainer = css`
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    transition: transform 150ms;

    position: relative;

    &:after {
        display: block;
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background-color: var(--backgroundTertiaryTrans);

        transition: transform 150ms;
        transform: scale(0);
    }
`;

const header = css`
    margin-bottom: 16px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
`;

interface USliderProps {
    title?: string;
    path?: string;
    children?: React.ReactNode;
    childrenCount?: number;
}

const USliderRaw = React.memo((props: USliderProps) => {
    const [offset, setOffset] = React.useState<number>(0);
    const [canClick, setCanClick] = React.useState(true);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [childWidth, setChildWidth] = React.useState<number>(0);
    const [currentSlide, setCurrentSlide] = React.useState<number>(0);

    if (!props.children) {
        return null;
    }

    const blanketRef = React.createRef<HTMLDivElement>();
    const sliderRef = React.createRef<HTMLDivElement>();

    const router = useTabRouter();

    const onClick = () => {
        if (props.path) {
            router.router.reset(props.path);
        }
    };

    const reset = () => {
        setOffset(0);
        setCurrentSlide(0);
    };

    const reinitSlider = () => {
        const blanketElement = blanketRef.current;

        if (blanketElement) {
            const numberOfChildren = blanketElement.children.length;
            const offsetWidth = blanketElement.children[0].getBoundingClientRect().width;

            setNumChildren(numberOfChildren);
            setChildWidth(offsetWidth);
            reset();
        }
    };

    const enableClick = React.useCallback(
        () => {
            if (!canClick) {
                return;
            }
            let timer: any;
            timer = setTimeout(() => {
                setCanClick(true);
            }, 300);
            return () => clearTimeout(timer);
        },
        [canClick],
    );

    window.addEventListener('resize', reinitSlider);
    React.useLayoutEffect(reinitSlider, []);

    const onNextClick = () => {
        if (!canClick) {
            return;
        }
        const blanketElement = blanketRef.current;
        const sliderElement = sliderRef.current;

        if (blanketElement && sliderElement) {
            const blanketRect = blanketElement.getBoundingClientRect();
            const sliderRect = sliderElement.getBoundingClientRect();

            const sliderRightmostPoint = sliderRect.right;
            const blanketWidth = childWidth * numChildren;
            const blanketRightmostPoint = blanketRect.left + blanketWidth;
            const gap = 16;

            if (
                sliderRightmostPoint < blanketRightmostPoint - gap &&
                currentSlide + 1 < (props.childrenCount || 0)
            ) {
                setCurrentSlide(currentSlide + 1);
                setOffset(offset - childWidth);
                setCanClick(false);
                enableClick();
            } else {
                reset();
            }
        }
    };
    const onPrevClick = () => {
        if (!canClick) {
            return;
        }
        if (currentSlide > 0) {
            setOffset(offset + childWidth);
            setCurrentSlide(currentSlide - 1);
            setCanClick(false);
            enableClick();
        }
    };

    return (
        <div className={root}>
            <div className={header}>
                <div className={icons}>
                    <UIconButton icon={<ArrowLeft />} size="xsmall" onClick={onPrevClick} color="var(--foregroundTertiary)" />
                    <UIconButton size="xsmall" icon={<ArrowRight />} onClick={onNextClick} color="var(--foregroundTertiary)" />
                </div>
                {props.title && (
                    <div className={titleContainer}>
                        <XView
                            onClick={onClick}
                            flexDirection="row"
                            alignItems="center"
                            cursor={props.path ? 'pointer' : undefined}
                        >
                            <h2 className={TextTitle3}>{props.title}</h2>
                            {props.path && (
                                <span className={iconContainer}>
                                    <ArrowRight />
                                </span>
                            )}
                        </XView>
                    </div>
                )}
            </div>
            <div className={slider} ref={sliderRef}>
                <div
                    className={blanket}
                    style={{ transform: `translateX(${offset}px)` }}
                    ref={blanketRef}
                >
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

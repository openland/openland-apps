import * as React from 'react';
import { css, cx } from 'linaria';
import IconPen from 'openland-icons/s/ic-appearance-glyph-24.svg';
import IconErase from 'openland-icons/s/ic-erase-glyph-24.svg';
import IconClose from 'openland-icons/s/ic-close-24.svg';
import IconText from 'openland-icons/s/ic-text-glyph-24.svg';
import IconImage from 'openland-icons/s/ic-gallery-glyph-24.svg';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { spaceColors } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { fileListToArray } from 'openland-web/fragments/chat/components/DropZone';

const wrapper = css`
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    opacity: 1;
    transition: all 250ms ease-in-out;
`;

const wrapperHidden = css`
    opacity: 0;
    transform: translate(-50%, calc(100% + 16px));
`;

const controlItem = css`
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 16px;
    border-radius: 100px;
    color: var(--foregroundContrast);
    background-color: var(--spaceBackgroundSecondary);
    padding: 8px 16px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: var(--spaceBackgroundTertiary);
    }

    &:last-child {
        margin-right: 0;
    }
`;

const controlItemActive = css`
    background-color: var(--foregroundContrast);
    color: var(--spaceBackgroundSecondary);

    &:hover {
        background-color: var(--foregroundContrast);
    }
`;

const controlIcon = css`
    width: 20px;
    height: 20px;
    color: inherit;
    fill: currentColor;
    margin-right: 8px;
`;

const controlText = TextLabel1;

const penControlItem = cx(controlItem, css`
    cursor: default;
    padding: 0 16px;

    &:hover {
        background-color: var(--spaceBackgroundSecondary);
    }
`);

const colorsPalette = css`
    margin-left: 12px;
    margin-right: 20px;
    display: flex;
    align-self: stretch;
`;

const colorsItem = css`
    width: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover::after {
        transform: translateY(-2px);
    }

    &::after {
        content: '';
        position: relative;
        transition: transform 150ms;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--item-color);
    }
`;

const colorsItemActive = css`
    &::before {
        content: '';
        position: absolute;
        top: 0;
        width: 16px;
        height: 2px;
        border-radius: 0px 0px 100px 100px;
        background-color: var(--item-color);
    }
`;

const sliderWrapper = css`
    width: 120px;
    margin-left: 16px;
`;

const sliderStyles = css`
    -webkit-appearance: none;
    position: relative;

    margin: 6px 0;
    width: 100%;

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: var(--rangeBg);
        border-radius: 100px;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: var(--foregroundContrast);
        cursor: pointer;
        margin-top: -6px;
    }

    &::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: var(--rangeBg);
        border-radius: 100px;
    }

    &::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: var(--foregroundContrast);
        cursor: pointer;
        border: none;
    }

    &::-moz-focus-outer {
        border: 0;
    }

    &::-ms-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: var(--rangeBg);
        color: transparent;
        border-radius: 100px;
    }

    &::-ms-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: var(--foregroundContrast);
        cursor: pointer;
    }
`;

const convertToRange = (value: number, oldRange: [number, number], newRange: [number, number]) => {
    let oldRangeDiff = oldRange[1] - oldRange[0];
    let newRangeDiff = newRange[1] - newRange[0];
    return (((value - oldRange[0]) * newRangeDiff) / oldRangeDiff) + newRange[0];
};
const valueToSize = (v: number) => {
    return convertToRange(v, [0, 100], [2, 16]);
};
const sizeToValue = (s: number) => {
    return convertToRange(s, [2, 16], [0, 100]);
};

const Slider = (props: { initialValue: number, onChange: (value: number) => void }) => {
    const [value, setValue] = React.useState(props.initialValue);
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = parseInt(e.target.value, 10);
        setValue(numValue);
        props.onChange(numValue);
    }, []);

    return (
        <div className={sliderWrapper}>
            <input
                type="range"
                className={sliderStyles}
                style={{ '--rangeBg': `linear-gradient(to right, #fff ${value}%, rgba(255, 255, 255, 0.16) ${value}%)` } as React.CSSProperties}
                min={0}
                max={100}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

interface SpaceControlsProps {
    isErasing: boolean;
    color?: string;
    initialPenSize: number;
    onPenSelect: () => void;
    onPenClose: () => void;
    onColorChange: (color: string) => void;
    onEraseClick: () => void;
    onTextClick: () => void;
    onImageClick: (files: File[]) => void;
    onPenSizeChange: (value: number) => void;
}

export const SpaceControls = React.memo((props: SpaceControlsProps) => {
    const { isErasing, color, initialPenSize, onPenSelect, onPenClose, onColorChange, onEraseClick, onTextClick, onImageClick, onPenSizeChange } = props;
    const [penOpened, setPenOpened] = React.useState(false);
    const togglePen = () => {
        if (!penOpened) {
            onPenSelect();
        } else {
            onPenClose();
        }
        setPenOpened(x => !x);
    };
    const prevColor = React.useRef<string | undefined>(color);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const initialPenValue = sizeToValue(initialPenSize);

    const onFileInputChange = React.useCallback(e => {
        onImageClick(fileListToArray(e.target.files));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);
    const handleTextClick = () => {
        onTextClick();
    };
    const handleColorChange = (a: string | 'erase') => {
        prevColor.current = a;
        onColorChange(a);
    };
    const handleEraseClick = () => {
        if (!isErasing) {
            onEraseClick();
        } else if (prevColor.current) {
            onColorChange(prevColor.current);
        }
    };
    const handlePenSizeChange = (value: number) => {
        onPenSizeChange(valueToSize(value));
    };

    const controls = (
        <>
            <div className={controlItem} onClick={togglePen}>
                <IconPen className={controlIcon} />
                <span className={controlText}>Pen</span>
            </div>
            <div className={controlItem} onClick={handleTextClick}>
                <IconText className={controlIcon} />
                <span className={controlText}>Text</span>
            </div>
            <div className={controlItem} onClick={() => fileInputRef.current?.click()}>
                <IconImage className={controlIcon} />
                <span className={controlText}>Image</span>
            </div>
        </>
    );

    const penControls = (
        <>
            <UIconButton
                defaultRippleColor="var(--spaceBackgroundSecondary)"
                hoverRippleColor="var(--spaceBackgroundTertiary)"
                onClick={togglePen}
                icon={<IconClose />}
                color="var(--foregroundContrast)"
                marginRight={16}
            />
            <div className={penControlItem}>
                <span className={controlText}>Color</span>
                <div className={colorsPalette}>
                    {spaceColors.map(c => (
                        <div
                            key={c}
                            className={cx(colorsItem, color === c && colorsItemActive)}
                            style={{ '--item-color': c } as React.CSSProperties}
                            onClick={() => handleColorChange(c)}
                        />
                    ))}
                </div>
                <span className={controlText}>Size</span>
                <Slider initialValue={initialPenValue} onChange={handlePenSizeChange} />
            </div>
            <div className={cx(controlItem, isErasing && controlItemActive)} onClick={handleEraseClick}>
                <IconErase className={controlIcon} />
                <span className={controlText}>Erase</span>
            </div>
        </>
    );

    return (
        <>
            <div className={cx(wrapper, penOpened && wrapperHidden)}>
                {controls}
            </div>
            <div className={cx(wrapper, !penOpened && wrapperHidden)}>
                {penControls}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={onFileInputChange}
            />
        </>
    );
});

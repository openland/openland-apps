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

const wrapper = css`
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
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

    &::after {
        content: '';
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

const sizeRange = css``;

// grab | grabbing
// value: 0 - 100
// const Slider = (props: { value: number, onChange: (value: number) => void }) => {
//     const width = 120;
//     const diameter = 16;
//     const left = props.value * (width - diameter);
//     return (
//         <XView height={16} width={width} alignItems="center">
//             <XView height={4} backgroundColor="var(--foregroundContrast)" />
//             <XView
//                 position="absolute"
//                 width={diameter}
//                 height={diameter}
//                 borderRadius={diameter}
//                 top={0}
//                 left={left}
//                 backgroundColor="var(--foregroundContrast)"
//             />
//         </XView>
//     );
// };

export const SpaceControls = React.memo((props: { action: string, onActionChange: (action: string) => void }) => {
    const { action, onActionChange } = props;
    const [penOpened, setPenOpened] = React.useState(false);
    const togglePen = () => setPenOpened(x => !x);

    const controls = (
        <>
            <div className={controlItem} onClick={togglePen}>
                <IconPen className={controlIcon} />
                <span className={controlText}>Pen</span>
            </div>
            <div className={controlItem}>
                <IconText className={controlIcon} />
                <span className={controlText}>Text</span>
            </div>
            <div className={controlItem}>
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
                    {spaceColors.map(color => (
                        <div
                            key={color}
                            className={cx(colorsItem, color === action && colorsItemActive)}
                            style={{ '--item-color': color } as React.CSSProperties}
                            onClick={() => onActionChange(color)}
                        />
                    ))}
                </div>
                <span className={controlText}>Size</span>
                <div className={sizeRange} />
            </div>
            <div className={cx(controlItem, action === 'erase' && controlItemActive)} onClick={() => onActionChange('erase')}>
                <IconErase className={controlIcon} />
                <span className={controlText}>Erase</span>
            </div>
        </>
    );
    a
    return (
        <div className={wrapper}>
            {penOpened ? penControls : controls}
        </div>
    );
});

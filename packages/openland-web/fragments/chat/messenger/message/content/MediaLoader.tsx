import * as React from 'react';
import { css, cx } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcCloseSmall from 'openland-icons/s/ic-close-16.svg';
import IcDown from 'openland-icons/s/ic-arrow-down-24.svg';

const progressLoaderWrapper = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: var(--progress-wrapper);
    height: var(--progress-wrapper);
    will-change: transform;
`;

const progressLoader = css`
    animation: rotate 0.752s linear infinite;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const progressLoaderCircle = css`
    fill: transparent;
    stroke: var(--foregroundContrast);
    stroke-dasharray: var(--dashArray);
    stroke-dashoffset: var(--dashOffset);
    stroke-linecap: round;
    stroke-width: 2px;
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.1s;
`;

const mediaLoader = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 100;
    width: var(--wrapper-size);
    height: var(--wrapper-size);
    border-radius: 50%;
    background-color: var(--overlayMedium);
`;

const mediaLoaderTransparent = css`
    background-color: transparent;
`;

const mediaLoaderIcon = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: var(--icon-size);
    height: var(--icon-size);
`;

interface ProgressLoader {
    progress: number;
    size: 'small' | 'medium';
}

const sizeBy = {
    'medium': 38,
    'small': 28,
};
const progressWrapperSizeBy = {
    'medium': 42,
    'small': 28,
};

const ProgressLoader = (props: ProgressLoader) => {
    let size = sizeBy[props.size];
    let wrapperSize = progressWrapperSizeBy[props.size];
    let radius = (size / 2) + 1;
    let c = 2 * Math.PI * radius;
    let progress = Math.max(Math.floor(props.progress), 5);
    let dashOffset = c - (c * (progress / 100));
    return (
        <div className={progressLoaderWrapper} style={{'--progress-wrapper': `${wrapperSize}px`, '--dashArray': c, '--dashOffset': dashOffset} as React.CSSProperties}>
            <svg className={progressLoader} viewBox={`0 0 ${size + 4} ${size + 4}`} xmlns="http://www.w3.org/2000/svg">
                <circle className={progressLoaderCircle} cx={radius + 1} cy={radius + 1} r={radius}/>
            </svg>
        </div>
    );
};

const iconSizeBy = {
    'medium': 24,
    'small': 16,
};

const wrapperSizeBy = {
    'medium': 48,
    'small': 28,
};

interface MediaLoaderProps {
    onContinue?: () => void;
    onStop?: () => void;
    progress?: number;
    size?: 'small' | 'medium';
    transparent?: boolean;
}

export const MediaLoader = React.forwardRef((props: MediaLoaderProps, ref: React.Ref<HTMLDivElement>) => {
    let sizeType = props.size || 'medium';
    let iconSize = iconSizeBy[sizeType];
    let wrapperSize = wrapperSizeBy[sizeType];
    let CloseIcon = sizeType === 'medium' ? IcClose : IcCloseSmall;
    let progress = props.progress || 80;

    let [stopped, setStopped] = React.useState(false);
    let handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setStopped(prev => !prev);
        if (stopped) {
            if (props.onContinue) {
                props.onContinue();
            }
        } else {
            if (props.onStop) {
                props.onStop();
            }
        }
    };
    return (
        <div 
            className={cx(mediaLoader, props.transparent && mediaLoaderTransparent)} 
            ref={ref} 
            onClick={handleClick}
            style={{'--icon-size': `${iconSize}px`, '--wrapper-size': `${wrapperSize}px`} as React.CSSProperties}
        >
            {stopped ? (
                <UIcon className={mediaLoaderIcon} icon={<IcDown />} color="var(--foregroundContrast)" />
            ) : (
                <>
                    <ProgressLoader progress={progress} size={sizeType} />
                    <UIcon className={mediaLoaderIcon} icon={<CloseIcon />} color="var(--foregroundContrast)" />
                </>
            )}
        </div>
    );
});

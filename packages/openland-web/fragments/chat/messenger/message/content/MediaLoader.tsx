import * as React from 'react';
import { css } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcDown from 'openland-icons/s/ic-arrow-down-24.svg';

const progressLoaderWrapper = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 42px;
    height: 42px;
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
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--overlayMedium);
`;

const mediaLoaderIcon = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 24px;
    height: 24px;
`;

const ProgressLoader = (props: {progress: number}) => {
    let radius = 21;
    let c = 2 * Math.PI * radius;
    let progress = Math.max(Math.floor(props.progress), 5);
    let dashOffset = c - (c * (progress / 100));
    return (
        <div className={progressLoaderWrapper} style={{'--dashArray': c, '--dashOffset': dashOffset} as React.CSSProperties}>
            <svg className={progressLoader} viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <circle className={progressLoaderCircle} cx="21" cy="21" r="20"/>
            </svg>
        </div>
    );
};

interface MediaLoaderProps {
    onContinue: () => void;
    onStop: () => void;
    progress?: number;
}

export const MediaLoader = React.forwardRef((props: MediaLoaderProps, ref: React.Ref<HTMLDivElement>) => {
    const progress = props.progress || 80;
    const [stopped, setStopped] = React.useState(false);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setStopped(prev => !prev);
        if (stopped) {
            props.onContinue();
        } else {
            props.onStop();
        }
    };
    return (
        <div 
            className={mediaLoader} 
            ref={ref} 
            onClick={handleClick}
        >
            {stopped ? (
                <UIcon className={mediaLoaderIcon} icon={<IcDown />} color="var(--foregroundContrast)" />
            ) : (
                <>
                    <ProgressLoader progress={progress} />
                    <UIcon className={mediaLoaderIcon} icon={<IcClose />} color="var(--foregroundContrast)" />
                </>
            )}
        </div>
    );
});

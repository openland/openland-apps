import * as React from 'react';
import { css, cx } from 'linaria';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { detectOS } from 'openland-web/components/NativeAppsModal';

type LoaderSize = 'medium' | 'small';

interface XLoaderProps {
    loading?: boolean;
    transparentBackground?: boolean;
    size?: LoaderSize;
    className?: string;
    color?: string;
}

const displayFlex = css`
    display: flex;
`;

const displayNone = css`
    display: none;
`;

const base = css`
    overflow: hidden
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
`;

const rotateAnimation = `
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const rotateSvg = css`
    & path {
        animation: rotate 0.752s linear infinite;
        transform-origin: 50%;
        transform-box: fill-box;
    }
    
    ${rotateAnimation};
`;

const rotateCanvas = css`
    animation: rotate 0.752s linear infinite;
    transform-origin: 50%;
    transform-box: fill-box;
    
    ${rotateAnimation};
`;

const sizes = {
    small: {
        width: '20',
        height: '20',
        viewBox: ' 0 0 20 20',
    },
    medium: {
        width: '32',
        height: '32',
        viewBox: '0 0 32 32',
    },
};

const minHeightSmall = css`
    min-height: 24px;
`;
const minHeightMedium = css`
    min-height: 32px;
`;

const backgroundColor = css`
    background-color: #fff;
`;

interface LoaderRenderProps {
    size: LoaderSize;
    color: string;
}

const SvgLoader = (props: LoaderRenderProps) => {
    return (
        <svg
            className={rotateSvg}
            {...sizes[props.size]}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {props.size === 'small' ? (
                <path
                    d="M10,1.00216976 C10,0.44863446 9.5512,-0.00529495537 9.0016,0.049960352 C7.13967,0.23719496 5.36011,0.945370953 3.87093,2.10311647 C2.11736,3.46641815 0.86608,5.37563786 0.31417,7.53007366 C-0.23774,9.68455958 -0.05893,11.9617237 0.82245,14.0031532 C1.70383,16.0444825 3.2377,17.734014 5.18246,18.8056443 C7.12723,19.8771743 9.3724,20.269965 11.5643,19.9219759 C13.7563,19.5739867 15.7705,18.5051628 17.2897,16.8836857 C18.8089,15.2622085 19.7468,13.1802871 19.9556,10.9658653 C20.133,9.08530059 19.776,7.19987484 18.9361,5.52387403 C18.6882,5.02923228 18.0653,4.89262248 17.599,5.18922511 C17.1326,5.48582775 17.0009,6.1031477 17.2364,6.60385319 C17.8454,7.89883995 18.1001,9.33977769 17.9645,10.7772375 C17.7974,12.548755 17.0471,14.2143321 15.8317,15.5114738 C14.6164,16.8086154 13.005,17.6637547 11.2515,17.9420859 C9.4979,18.2204171 7.70178,17.9063048 6.14597,17.0490607 C4.59016,16.1917164 3.36307,14.8401514 2.65796,13.2070478 C1.95286,11.5739443 1.80981,9.75211278 2.25133,8.02860422 C2.69286,6.30503554 3.69389,4.77766178 5.09674,3.68701843 C6.235,2.8020916 7.58532,2.24547932 9.0026,2.06699456 C9.5506,1.99798807 10,1.55570506 10,1.00216976 Z"
                    fill={props.color}
                />
            ) : (
                <path
                    d="M16,1.00089125 C16,0.448100132 15.5518,-0.00328771327 15.0006,0.0312307033 C11.8055,0.231319261 8.73516,1.38724569 6.19349,3.36057599 C3.38777,5.53890435 1.38573,8.58953294 0.50267,12.032011 C-0.380386,15.474369 -0.0942841,19.1131071 1.31593,22.3748994 C2.72613,25.6366917 5.18031,28.3362683 8.29194,30.048439 C11.4036,31.7606097 14.9958,32.3881854 18.5029,31.8321753 C22.0101,31.2761653 25.2328,29.5682985 27.6635,26.9775218 C30.0942,24.3866449 31.5948,21.0600932 31.929,17.5217472 C32.2317,14.3164067 31.5616,11.1022581 30.0184,8.29488263 C29.7521,7.81056833 29.1312,7.67368276 28.6649,7.96988449 C28.1986,8.26608622 28.064,8.88310226 28.3259,9.36978873 C29.6337,11.8000983 30.1988,14.5704397 29.9379,17.3333744 C29.6455,20.4294146 28.3324,23.3401849 26.2056,25.6071646 C24.0787,27.8741443 21.2588,29.3685152 18.1901,29.8549615 C15.1213,30.3415078 11.9781,29.7924041 9.25545,28.2942297 C6.53278,26.7960553 4.38537,24.4338883 3.15143,21.5798701 C1.9175,18.7257517 1.66716,15.541931 2.43984,12.5297676 C3.21251,9.5176744 4.9643,6.84837563 7.4193,4.94233707 C9.61016,3.24137664 12.25,2.23450295 15.0008,2.03753225 C15.5517,1.99808606 16,1.55367837 16,1.00089125 Z"
                    fill={props.color}
                />
            )}
        </svg>
    );
};

const CanvasLoader = (props: LoaderRenderProps) => {
    const scale = (canUseDOM ? window.devicePixelRatio : 1) || 1;
    const size = props.size === 'small' ? 24 : 32;
    let ref = React.createRef<HTMLCanvasElement>();
    React.useEffect(
        () => {
            if (ref.current) {
                //
                let canvas = ref.current;
                let ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = size * scale;
                    canvas.height = size * scale;
                    canvas.style.width = size + 'px';
                    canvas.style.height = size + 'px';

                    const padding = (props.size === 'small' ? 2 : 0) / 2;

                    ctx.scale(scale, scale);

                    const center = size / 2;

                    ctx.arc(center, center, size / 2 - 1 - padding, 0, 1 - 0.68 * Math.PI);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = props.color;
                    ctx.imageSmoothingEnabled = true;
                    ctx.stroke();
                }
            }
        },
        [ref.current],
    );

    return <canvas width={size} height={size} className={rotateCanvas} ref={ref} />;
};

export const XLoader = (props: XLoaderProps) => {
    const canvas = detectOS() === 'iOS';

    return (
        <div
            className={cx(
                base,
                props.loading !== false ? displayFlex : displayNone,
                props.size === 'small' ? minHeightSmall : minHeightMedium,
                props.transparentBackground ? undefined : backgroundColor,
            )}
        >
            {!canvas && (
                <SvgLoader size={props.size || 'medium'} color={props.color || '#C4C7CC'} />
            )}
            {canvas && (
                <CanvasLoader size={props.size || 'medium'} color={props.color || '#C4C7CC'} />
            )}
        </div>
    );
};

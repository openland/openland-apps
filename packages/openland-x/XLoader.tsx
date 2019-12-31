import * as React from 'react';
import { css, cx } from 'linaria';

type LoaderSize = 'medium' | 'small' | 'large';

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

const base = css`
    overflow: hidden;
    will-change: transform;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const rotate = css`
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

let rotateHackLarge = css`
    transform-origin: 16px 16px;
`;

let rotateHackMedium = css`
    transform-origin: 10px 10px;
`;

let rotateHackSmall = css`
    transform-origin: 8px 8px;
`;

const sizes = {
    small: {
        width: '16',
        height: '16',
        viewBox: ' 0 0 16 16',
    },
    medium: {
        width: '20',
        height: '20',
        viewBox: ' 0 0 20 20',
    },
    large: {
        width: '32',
        height: '32',
        viewBox: '0 0 32 32',
    },
};

const minHeightSmall = css`
    min-height: 16px;
`;
const minHeightMedium = css`
    min-height: 24px;
`;
const minHeightLarge = css`
    min-height: 32px;
`;

const backgroundColor = css`
    background-color: #fff;
`;

interface LoaderRenderProps {
    size: LoaderSize;
    color: string;
}

const SvgLoader = React.memo((props: LoaderRenderProps) => {
    return (
        <svg {...sizes[props.size]} fill="none" xmlns="http://www.w3.org/2000/svg">
            {props.size === 'small' ? (
                <path
                    d="M8 1C8 0.447715 7.55056 -0.00644493 7.00258 0.0624094C5.58532 0.240494 4.235 0.795839 3.09674 1.67876C1.69389 2.76693 0.692864 4.29084 0.251335 6.01048C-0.190193 7.73012 -0.047142 9.54778 0.657963 11.1772C1.36307 12.8066 2.59016 14.1551 4.14597 15.0105C5.70178 15.8658 7.49791 16.1792 9.25147 15.9015C11.005 15.6238 12.6164 14.7706 13.8317 13.4764C15.0471 12.1822 15.7974 10.5204 15.9645 8.75287C16.1001 7.31872 15.8454 5.88103 15.2364 4.58898C15.0009 4.08941 14.3766 3.95329 13.9103 4.24921C13.444 4.54514 13.3147 5.16109 13.5291 5.67003C13.912 6.57868 14.0671 7.57279 13.9734 8.56465C13.8481 9.89031 13.2853 11.1366 12.3738 12.1073C11.4623 13.078 10.2538 13.7178 8.93861 13.9261C7.62343 14.1344 6.27634 13.8993 5.10948 13.2578C3.94262 12.6164 3.0223 11.6049 2.49347 10.3829C1.96464 9.16084 1.85735 7.79759 2.1885 6.50786C2.51965 5.21813 3.27041 4.0752 4.32256 3.25907C5.10978 2.64844 6.03224 2.24672 7.0046 2.08314C7.54923 1.99151 8 1.55229 8 1Z"
                    fill={props.color}
                    className={cx(rotate, rotateHackSmall)}
                />
            ) : props.size === 'medium' ? (
                <path
                    d="M10,1.00216976 C10,0.44863446 9.5512,-0.00529495537 9.0016,0.049960352 C7.13967,0.23719496 5.36011,0.945370953 3.87093,2.10311647 C2.11736,3.46641815 0.86608,5.37563786 0.31417,7.53007366 C-0.23774,9.68455958 -0.05893,11.9617237 0.82245,14.0031532 C1.70383,16.0444825 3.2377,17.734014 5.18246,18.8056443 C7.12723,19.8771743 9.3724,20.269965 11.5643,19.9219759 C13.7563,19.5739867 15.7705,18.5051628 17.2897,16.8836857 C18.8089,15.2622085 19.7468,13.1802871 19.9556,10.9658653 C20.133,9.08530059 19.776,7.19987484 18.9361,5.52387403 C18.6882,5.02923228 18.0653,4.89262248 17.599,5.18922511 C17.1326,5.48582775 17.0009,6.1031477 17.2364,6.60385319 C17.8454,7.89883995 18.1001,9.33977769 17.9645,10.7772375 C17.7974,12.548755 17.0471,14.2143321 15.8317,15.5114738 C14.6164,16.8086154 13.005,17.6637547 11.2515,17.9420859 C9.4979,18.2204171 7.70178,17.9063048 6.14597,17.0490607 C4.59016,16.1917164 3.36307,14.8401514 2.65796,13.2070478 C1.95286,11.5739443 1.80981,9.75211278 2.25133,8.02860422 C2.69286,6.30503554 3.69389,4.77766178 5.09674,3.68701843 C6.235,2.8020916 7.58532,2.24547932 9.0026,2.06699456 C9.5506,1.99798807 10,1.55570506 10,1.00216976 Z"
                    fill={props.color}
                    className={cx(rotate, rotateHackMedium)}
                />
            ) : (
                <path
                    d="M16,1.00089125 C16,0.448100132 15.5518,-0.00328771327 15.0006,0.0312307033 C11.8055,0.231319261 8.73516,1.38724569 6.19349,3.36057599 C3.38777,5.53890435 1.38573,8.58953294 0.50267,12.032011 C-0.380386,15.474369 -0.0942841,19.1131071 1.31593,22.3748994 C2.72613,25.6366917 5.18031,28.3362683 8.29194,30.048439 C11.4036,31.7606097 14.9958,32.3881854 18.5029,31.8321753 C22.0101,31.2761653 25.2328,29.5682985 27.6635,26.9775218 C30.0942,24.3866449 31.5948,21.0600932 31.929,17.5217472 C32.2317,14.3164067 31.5616,11.1022581 30.0184,8.29488263 C29.7521,7.81056833 29.1312,7.67368276 28.6649,7.96988449 C28.1986,8.26608622 28.064,8.88310226 28.3259,9.36978873 C29.6337,11.8000983 30.1988,14.5704397 29.9379,17.3333744 C29.6455,20.4294146 28.3324,23.3401849 26.2056,25.6071646 C24.0787,27.8741443 21.2588,29.3685152 18.1901,29.8549615 C15.1213,30.3415078 11.9781,29.7924041 9.25545,28.2942297 C6.53278,26.7960553 4.38537,24.4338883 3.15143,21.5798701 C1.9175,18.7257517 1.66716,15.541931 2.43984,12.5297676 C3.21251,9.5176744 4.9643,6.84837563 7.4193,4.94233707 C9.61016,3.24137664 12.25,2.23450295 15.0008,2.03753225 C15.5517,1.99808606 16,1.55367837 16,1.00089125 Z"
                    fill={props.color}
                    className={cx(rotate, rotateHackLarge)}
                />
            )}
        </svg>
    );
});

export const XLoader = React.forwardRef((props: XLoaderProps, ref: React.Ref<HTMLDivElement>) => {
    if (props.loading !== true) {
        return null;
    }
    return (
        <div
            ref={ref}
            className={cx(
                base,
                displayFlex,
                props.className,
                props.size === 'small'
                    ? minHeightSmall
                    : props.size === 'medium'
                        ? minHeightMedium
                        : minHeightLarge,
                props.transparentBackground ? undefined : backgroundColor,
            )}
        >
            <SvgLoader size={props.size || 'medium'} color={props.color || '#C4C7CC'} />
        </div>
    );
});

const splashWrapper = css`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: var(--backgroundPrimary);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Unicorn = (props: { width: string; height: string }) => {
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#SplashClip)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M51.1875 90.1875C56.3516 90.1875 61.2755 89.1591 65.7656 87.2959C65.7656 87.2959 43.7812 76.875 52.0312 58.3125C52.0312 58.3125 60.5156 60.945 67.2188 63.0469C73.9219 65.1487 78.0469 62.625 80.3438 59.3438C82.6875 56.0625 83.3906 51.0315 79.3125 46.125C75.2344 41.2185 66.0938 30 66.0938 30L88.9688 3.375L84.1875 0L59.4844 14.9694C56.8136 14.3756 54.0371 14.0625 51.1875 14.0625C30.1662 14.0625 13.125 31.1037 13.125 52.125C13.125 73.1463 30.1662 90.1875 51.1875 90.1875Z"
                    fill="url(#SplashGradient)"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M52.4705 82.7874C53.3511 83.7588 54.2612 84.6465 55.1633 85.4503C37.8627 79.7026 24.3773 56.0589 39.3749 33.75C34.6033 43.067 34.6526 51.2284 45.3008 56.0483C46.1151 56.4169 46.8181 56.6794 47.3346 56.8544C47.4524 56.8943 47.561 56.9299 47.6595 56.9612C47.6753 56.9662 47.6908 56.9712 47.706 56.976C45.4457 62.3205 45.2128 67.3109 46.3322 71.7682C47.4648 76.2784 49.907 79.9593 52.4705 82.7874Z"
                    fill="#DAE4F2"
                />
                <path
                    d="M51.1875 18.5625C32.6514 18.5625 17.625 33.589 17.625 52.125C17.625 70.6611 32.6514 85.6875 51.1875 85.6875C52.6039 85.6875 53.8034 85.6229 55.1719 85.4531C37.8672 79.7104 24.375 56.0625 39.375 33.75C34.5 48.9375 49.4101 52.7876 49.4101 52.7876L68.5651 58.753C71.1468 59.5626 72.829 59.37 73.9057 58.9813C75.0115 58.5821 75.921 57.8148 76.6572 56.7632L76.6695 56.7456L76.6819 56.7282C77.3541 55.7872 77.7589 54.6399 77.7371 53.4248C77.7161 52.2575 77.2978 50.7411 75.8518 49.0014C70.5977 42.6801 65.419 36.2956 60.2268 29.9235L78.404 8.76642L53.9062 23.0625L55.2188 18.8017C53.8984 18.6439 52.5532 18.5625 51.1875 18.5625Z"
                    fill="white"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M53.4375 32.8125C51.1723 32.435 49.3125 33.5625 48.75 35.8125C51.75 35.4375 54.6562 36.5625 56.5312 38.0625C57.0937 35.4375 55.6875 33.1875 53.4375 32.8125Z"
                    fill="#7373BF"
                />
            </g>
            <defs>
                <linearGradient
                    id="SplashGradient"
                    x1="88.9666"
                    y1="3.07502"
                    x2="20.9871"
                    y2="74.4836"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FEC519" />
                    <stop offset="0.278985" stopColor="#E62E5C" />
                    <stop offset="0.760754" stopColor="#45A3E6" />
                    <stop offset="1" stopColor="#5CE6C3" />
                </linearGradient>
                <clipPath id="SplashClip">
                    <rect width="96" height="96" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const UnicornSplash = React.memo(() => (
    <div className={splashWrapper}>
        <Unicorn width="96" height="96" />
    </div>
));

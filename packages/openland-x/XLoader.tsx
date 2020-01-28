import * as React from 'react';
import { css, cx } from 'linaria';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

type LoaderSize = 'medium' | 'small' | 'large';

interface XLoaderProps {
    loading?: boolean;
    transparentBackground?: boolean;
    size?: LoaderSize;
    className?: string;
    contrast?: boolean;
    static?: boolean;
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
    contrast?: boolean;
    static?: boolean;
}

const SvgLoader = React.memo((props: LoaderRenderProps) => {
    const size = {
        small: '16',
        medium: '24',
        large: '32',
    };
    const loaderSizePath = `https://cdn.openland.com/shared/loader/loader-${size[props.size]}`;
    const loaderFullPath = props.contrast
        ? loaderSizePath + '-contrast.svg'
        : loaderSizePath + '-dark.svg';

    return <ImgWithRetry src={loaderFullPath} className={props.static === true ? undefined : rotate} />;
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
            <SvgLoader
                size={props.size || 'medium'}
                contrast={props.contrast}
                static={props.static}
            />
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

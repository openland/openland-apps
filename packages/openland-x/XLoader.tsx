import * as React from 'react';
import { css, cx } from 'linaria';

interface XLoaderProps {
    loading?: boolean;
    transparentBackground?: boolean;
    size?: 'medium' | 'small';
    className?: string;
    color?: string;
}

let displayFlex = css`
display: flex;
`;
let displayNone = css`
display: none;
`;

let base = css`
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

let rotate = css`
animation: rotate 0.752s linear infinite;
display: inline-block;

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`;

const sizes = {
    small: {
        width: '24',
        height: '24',
        viewBox: ' 0 0 24 24',
    },
    medium: {
        width: '32',
        height: '32',
        viewBox: '0 0 32 32',
    }
};

const minHeightSmall = css`
min-height: 24px;
`;
const minHeightMedium = css`
min-height: 32px;
`;

const backgroundColor = css`
background-color: #fff
`;

export const XLoader = (props: XLoaderProps) => (
    <div className={cx(base, props.loading !== false ? displayFlex : displayNone, props.size === 'small' ? minHeightSmall : minHeightMedium, props.transparentBackground ? undefined : backgroundColor)}>
        <svg className={rotate} {...sizes[props.size || 'medium']} fill="none" xmlns="http://www.w3.org/2000/svg">
            {props.size === 'small' ? <path d="M12 3C12 2.44772 11.5512 1.99482 11.0016 2.04995C9.13967 2.23676 7.36011 2.94333 5.87093 4.09845C4.11736 5.45866 2.86608 7.36355 2.31417 9.5131C1.76226 11.6627 1.94107 13.9347 2.82245 15.9715C3.70383 18.0082 5.2377 19.6939 7.18246 20.7631C9.12723 21.8322 11.3724 22.2241 13.5643 21.8769C15.7563 21.5297 17.7705 20.4633 19.2897 18.8455C20.8089 17.2277 21.7468 15.1505 21.9556 12.9411C22.133 11.0648 21.776 9.18365 20.9361 7.51145C20.6882 7.01793 20.0653 6.88163 19.599 7.17756C19.1326 7.47349 19.0009 8.08941 19.2364 8.58898C19.8454 9.88103 20.1001 11.3187 19.9645 12.7529C19.7974 14.5204 19.0471 16.1822 17.8317 17.4764C16.6164 18.7706 15.005 19.6238 13.2515 19.9015C11.4979 20.1792 9.70178 19.8658 8.14597 19.0105C6.59016 18.1551 5.36307 16.8066 4.65796 15.1772C3.95286 13.5478 3.80981 11.7301 4.25133 10.0105C4.69286 8.29084 5.69389 6.76693 7.09674 5.67876C8.235 4.79584 9.58532 4.24049 11.0026 4.06241C11.5506 3.99356 12 3.55228 12 3Z" fill={props.color || '#C4C7CC'} /> :
                <path d="M16 1C16 0.447716 15.5518 -0.00325775 15.0006 0.031229C11.8055 0.231134 8.73516 1.386 6.19349 3.35752C3.38777 5.53385 1.38573 8.58168 0.50267 12.021C-0.380386 15.4602 -0.0942841 19.0956 1.31593 22.3544C2.72613 25.6132 5.18031 28.3103 8.29194 30.0209C11.4036 31.7315 14.9958 32.3585 18.5029 31.803C22.0101 31.2475 25.2328 29.5412 27.6635 26.9528C30.0942 24.3643 31.5948 21.0408 31.929 17.5057C32.2317 14.3033 31.5616 11.0921 30.0184 8.2873C29.7521 7.80343 29.1312 7.66667 28.6649 7.9626C28.1986 8.25853 28.064 8.87498 28.3259 9.36122C29.6337 11.7893 30.1988 14.5571 29.9379 17.3175C29.6455 20.4107 28.3324 23.3188 26.2056 25.5837C24.0787 27.8486 21.2588 29.3416 18.1901 29.8276C15.1213 30.3137 11.9781 29.7651 9.25545 28.2683C6.53278 26.7715 4.38537 24.4115 3.15143 21.5601C1.9175 18.7086 1.66716 15.5277 2.43984 12.5183C3.21251 9.50897 4.9643 6.84212 7.4193 4.93783C9.61016 3.23843 12.25 2.23248 15.0008 2.03569C15.5517 1.99628 16 1.55228 16 1Z" fill={props.color || '#C4C7CC'} />}
        </svg>
    </div>
);

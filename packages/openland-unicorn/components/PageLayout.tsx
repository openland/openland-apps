import * as React from 'react';
import { css, cx } from 'linaria';
import { Deferred } from './Deferred';
import { XLoader } from 'openland-x/XLoader';
import { HeaderComponent } from './HeaderComponent';

//
// Container style
//

const containerStyle = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 2;
    pointer-events: auto;
`;

//
// Content Styles
//

const contentStyle = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    backface-visibility: hidden;
    background-color: white;
    will-change: left;
    contain: content;
`;

const contentStyleCss = css`
    transition: transform 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    overflow: hidden;
`;

const contentWrapperStyle = css`
    position: relative;
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    contain: content;
`;

//
// Shadow Styles
//

const shadowStyle = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    pointer-events: none;

    background-color: black;
    transition: opacity 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    will-change: opacity;
`;

const shadowStateStyles = {
    mounting: css`
        opacity: 0;
    `,
    entering: css`
        opacity: 0.3;
    `,
    visible: css`
        opacity: 0.3;
    `,
    exiting: css`
        opacity: 0;
    `,
};

export const PageLayout = (props: {
    children?: any;
    state: 'mounting' | 'entering' | 'visible' | 'exiting';
    container: React.RefObject<HTMLDivElement>;
}) => {
    const isChrome =
        !!(window as any).chrome &&
        (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime);

    const ref = React.useRef<HTMLDivElement>(null);
    let offset: number = 0;

    if (isChrome) {
        React.useLayoutEffect(
            () => {
                if (props.state === 'mounting') {
                    ref.current!.animate(
                        [
                            {
                                transform: `translateX(${props.container.current!.clientWidth}px)`,
                            },
                            {
                                transform: `translateX(0px)`,
                            },
                        ],
                        {
                            duration: 240,
                            fill: 'forwards',
                            composite: 'add',
                            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                        },
                    );
                } else if (props.state === 'entering') {
                    // nothing to do
                } else if (props.state === 'visible') {
                    // nothing to do
                } else if (props.state === 'exiting') {
                    ref.current!.animate(
                        [
                            {
                                transform: `translateX(0px)`,
                            },
                            {
                                transform: `translateX(${props.container.current!.clientWidth}px)`,
                            },
                        ],
                        {
                            duration: 240,
                            fill: 'forwards',
                            composite: 'add',
                            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                        },
                    );
                }
            },
            [props.state],
        );
    } else {
        if (props.state === 'mounting') {
            offset = props.container.current!.clientWidth;
        } else if (props.state === 'entering') {
            offset = 0;
        } else if (props.state === 'visible') {
            offset = 0;
        } else if (props.state === 'exiting') {
            offset = props.container.current!.clientWidth;
        }
    }

    return (
        <div className={containerStyle}>
            <div className={cx(shadowStyle, shadowStateStyles[props.state])} />
            <div
                ref={ref}
                className={cx(contentStyle, !isChrome && contentStyleCss)}
                style={isChrome ? {} : { transform: `translateX(${offset}px)` }}
            >
                <HeaderComponent>
                    <Deferred>
                        <div className={contentWrapperStyle}>
                            <React.Suspense fallback={<XLoader />}>{props.children}</React.Suspense>
                        </div>
                    </Deferred>
                </HeaderComponent>
            </div>
        </div>
    );
};

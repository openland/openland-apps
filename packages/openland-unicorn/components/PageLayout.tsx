import * as React from 'react';
import { css } from "linaria";
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
    will-change: transform;
    contain: content;
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
    transition: opacity 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
    will-change: opacity;
`;

const shadowStateStyles = {
    mounting: css`
    opacity: 0.0;
`,
    entering: css`
    opacity: 0.3;
`,
    visible: css`
    opacity: 0.3;
`,
    exiting: css`
    opacity: 0.0;
`};

export const PageLayout = (props: {
    children?: any,
    state: 'mounting' | 'entering' | 'visible' | 'exiting',
    container: React.RefObject<HTMLDivElement>
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    // let offset: number;
    // switch (props.state) {
    //     case 'mounting':
    //         offset = props.container.current!.clientWidth;
    //         break;
    //     case 'entering':
    //         offset = 0;
    //         break;
    //     case 'visible':
    //         offset = 0;
    //         break;
    //     case 'exiting':
    //         offset = props.container.current!.clientWidth;
    //         break;
    //     default:
    //         offset = 0;
    //         break;
    // }

    React.useLayoutEffect(() => {
        if (props.state === 'mounting') {
            ref.current!.animate([
                {
                    transform: `translateX(${props.container.current!.clientWidth}px)`
                }, {
                    transform: `translateX(0px)`
                }
            ], { duration: 240, fill: 'forwards', composite: 'add', easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' });
        } else if (props.state === 'entering') {
            // Nothing to do
        } else if (props.state === 'visible') {
            // ref.current!.style.transform = `translateX(0px)`;
        } else if (props.state === 'exiting') {
            ref.current!.animate([
                {
                    transform: `translateX(0px)`
                }, {
                    transform: `translateX(${props.container.current!.clientWidth}px)`
                }
            ], { duration: 240, fill: 'forwards', composite: 'add', easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' });
        }
    }, [props.state]);

    return (
        <div className={containerStyle}>
            <div className={shadowStyle + ' ' + shadowStateStyles[props.state]} />
            <div ref={ref} className={contentStyle}>
                <HeaderComponent>
                    <Deferred>
                        <div className={contentWrapperStyle}>
                            <React.Suspense fallback={<XLoader />}>
                                {props.children}
                            </React.Suspense>
                        </div>
                    </Deferred>
                </HeaderComponent>
            </div>
        </div>
    );
};
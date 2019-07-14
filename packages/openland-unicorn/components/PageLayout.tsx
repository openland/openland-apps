import * as React from 'react';
import { css } from "linaria";
import { PageHeader } from './PageHeader';
import { Deferred } from './Deferred';
import { XLoader } from 'openland-x/XLoader';

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

    background-color: white;
    transition: transform 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
    will-change: transform;
`;

const contentWrapperStyle = css`
    position: relative;
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
    let offset: number;
    switch (props.state) {
        case 'mounting':
            offset = props.container.current!.clientWidth;
            break;
        case 'entering':
            offset = 0;
            break;
        case 'visible':
            offset = 0;
            break;
        case 'exiting':
            offset = props.container.current!.clientWidth;
            break;
        default:
            offset = 0;
            break;
    }
    return (
        <div className={containerStyle}>
            <div className={shadowStyle + ' ' + shadowStateStyles[props.state]} />
            <div className={contentStyle} style={{ transform: 'translateX(' + offset + 'px)' }}>
                <PageHeader />
                <Deferred>
                    <div className={contentWrapperStyle}>
                        <React.Suspense fallback={<XLoader />}>
                            {props.children}
                        </React.Suspense>
                    </div>
                </Deferred>
            </div>
        </div>
    );
};
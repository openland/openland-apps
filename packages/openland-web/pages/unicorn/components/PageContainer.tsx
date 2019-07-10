import * as React from 'react';
import { css } from "linaria";

//
// Container style
//

const containerStyle = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
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

    background-color: white;
    transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    will-change: transform;
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
    transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
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
    display: none;
`,
    exiting: css`
    opacity: 0.0;
`};

export const PageContainer = (props: {
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
        case 'visible':
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
                {props.children}
            </div>
        </div>
    );
};
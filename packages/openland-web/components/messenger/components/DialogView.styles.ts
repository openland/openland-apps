import { css } from 'linaria';

export let iconClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 1px 5px -1px 1px;

    path {
        fill: rgba(0, 0, 0, 0.3);
    }
`;

export let iconActiveClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 1px 5px -1px 1px;

    path {
        fill: rgba(255, 255, 255, 0.9);
    }
`;

export let documentIcon = css`
    margin-top: 0;
    margin-bottom: 0;
`;
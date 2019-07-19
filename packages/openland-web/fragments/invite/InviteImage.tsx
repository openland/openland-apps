import * as React from 'react';
import { css, cx } from 'linaria';

const imageWrapperStyle = css`
    height: 367px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 88px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;

    @media (max-height: 800px) {
        height: 250px;
    }
`;

const imageWrapperWithFooterStyle = css`
    bottom: 60px;
`;

const imageStyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1242px;
    margin-left: -688px;
    background: url(/static/X/signup/invite-illustration.png) no-repeat;
    background-image: -webkit-image-set(
        url(/static/X/signup/invite-illustration.png) 1x,
        url(/static/X/signup/invite-illustration@2x.png) 2x
    );
    background-size: auto 100%;

    @media (max-height: 800px) {
        width: 846px;
        margin-left: -500px;
    }

    @media (max-height: 600px) {
        background: none;
        background-image: none;
    }
`;

export const InviteImage = (props: {onBottom?: boolean}) => {
    return (
        <div className={cx(imageWrapperStyle, props.onBottom && imageWrapperWithFooterStyle)}>
            <div className={imageStyle} />
        </div>
    );
};

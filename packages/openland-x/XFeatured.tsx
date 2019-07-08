import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { XView } from 'react-mental';
import FeaturedIcon from 'openland-icons/ic-featured-star-3.svg';
import { css } from 'linaria';

export const XFeaturedIcon = XMemo(props => (
    <XView width={18} height={18}>
        <FeaturedIcon />
    </XView>
))

export const XFeatured = XMemo<{ text: string | JSX.Element }>(props => (
    <XView flexDirection="row" alignItems="center">
        <XFeaturedIcon />
        <XView fontWeight="400" marginLeft={2} color="rgba(0, 0, 0, 0.5)" overflow="hidden">
            {props.text}
        </XView>
    </XView>
));

const tooltipWrapperClass = css`
    position: relative;

    & > span {
        display: none;
        background: #6E7588;
        color: #ffffff;
        border-radius: 10px;
        padding: 6px 12px 8px;
        line-height: 16p;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        position: absolute;
        text-align: center;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 0);
        margin-bottom: 12px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 10;

        &:before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #6E7588;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, 0);
        }

        &.from-bottom {
            bottom: initial;
            top: 100%;
            margin-bottom: initial;
            margin-top: 12px;

            &:before {
                bottom: 100%;
                top: initial;
                border-top: initial;
                border-bottom: 5px solid #6E7588;
            }
        }
    }

    &:hover > span {
        display: block;
    }
`;

export const XFeaturedTooltip = XMemo<{ text: string | JSX.Element, position?: 'top' | 'bottom' }>(props => (
    <div className={tooltipWrapperClass}>
        <XFeaturedIcon />

        <span className={!!props.position ? 'from-' + props.position : undefined}>{props.text}</span>
    </div>
));
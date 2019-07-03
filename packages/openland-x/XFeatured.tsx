import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { XView } from 'react-mental';
import { XPopper } from './XPopper';
import FeaturedIcon from 'openland-icons/ic-featured-star.svg';

export const XFeaturedIcon = XMemo(props => (
    <XView width={18} height={18}>
        <FeaturedIcon />
    </XView>
))

export const XFeatured = XMemo<{ text: string | JSX.Element }>(props => (
    <XView flexDirection="row" alignItems="center">
        <XFeaturedIcon />
        <XView fontWeight="400" marginLeft={6} color="rgba(0, 0, 0, 0.5)" overflow="hidden">
            {props.text}
        </XView>
    </XView>
));

export const XFeaturedTooltip = XMemo<{ text: string | JSX.Element }>(props => (
    // <XPopper
    //     style="dark"
    //     placement="top"
    //     content={<span>{props.text}</span>}
    //     showOnHoverContent={false}
    //     showOnHover={true}
    // >
    //     <div>
            <XFeaturedIcon />
    //     </div>
    // </XPopper>
));
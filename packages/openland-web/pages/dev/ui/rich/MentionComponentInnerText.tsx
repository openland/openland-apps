import * as React from 'react';
import { UserShort } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { UserPopper } from 'openland-web/components/UserPopper';
import { XMemo } from 'openland-y-utils/XMemo';

type MentionComponentInnerTextProps = {
    isYou: boolean;
    className?: string;
    user?: UserShort;
    hasPopper?: boolean;
    inCompose?: boolean;
    children?: any;
};

let isYouClassname = css`
    cursor: pointer;
    backgroundcolor: #fff6e5;
    color: #1790ff;
`;

let isNotYouClassname = css`
    cursor: pointer;
    color: #1790ff;
`;

let paddingsClassname = css`
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 5px;
`;

export const MentionComponentInnerText = XMemo(
    ({ isYou, inCompose, children }: MentionComponentInnerTextProps) => {
        return (
            <span
                className={cx(
                    inCompose && paddingsClassname,
                    isYou ? isYouClassname : isNotYouClassname,
                )}
            >
                {children}
            </span>
        );
    },
);

export const positionSuggestions = ({ state, props }: any) => {
    let transform;
    let transition;

    if (state.isActive && props.suggestions.length > 0) {
        transform = 'scaleY(1)';
        transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else if (state.isActive) {
        transform = 'scaleY(0)';
        transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
    }

    return {
        transform,
        transition,
    };
};

export const MentionComponentInner = XMemo((props: MentionComponentInnerTextProps) => {
    if (props.hasPopper && props.user) {
        return (
            <UserPopper user={props.user} isMe={props.isYou} noCardOnMe startSelected={false}>
                <MentionComponentInnerText {...props} />
            </UserPopper>
        );
    } else {
        return <MentionComponentInnerText {...props} />;
    }
});

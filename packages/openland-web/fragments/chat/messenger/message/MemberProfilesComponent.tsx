import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { TextBody } from 'openland-web/utils/TextStyles';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { defaultHover } from 'openland-web/utils/Styles';
import { useClient } from 'openland-web/utils/useClient';
import IcCopy from 'openland-icons/s/ic-copy-24.svg';
import IcArrow from 'openland-icons/s/ic-chevron-16.svg';

const membersMessageContainer = css`
    height: 40px;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--backgroundTertiary);
    cursor: pointer;

    &:hover {
        background-color: var(--backgroundTertiaryHover);
    }
`;

const membersMessageContent = css`
    max-width: 824px;
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    flex-basis: 0;
`;

const membersMessageMainContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
`;

const iconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 16px;

    & svg {
        width: 20px;
        height: 20px;
    }
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    margin-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex-shrink: 0;
`;

const membersCountStyle = css`
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 24px;
    pointer-events: none;
`;

const membersIconContainer = css`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
`;

export const MemberProfilesComponent = React.memo((props: { chatId: string }) => {
    const router = React.useContext(XViewRouterContext);
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: props.chatId }).matchmakingRoom;

    const myMemberProfile = data && data.myProfile;
    const otherMemberProfiles =
        myMemberProfile && data && data.profiles && data.profiles.length > 1;

    const onClick = React.useCallback(() => {
        if (router) {
            router.navigate(
                myMemberProfile
                    ? `/matchmaking/${props.chatId}/users`
                    : `/matchmaking/${props.chatId}/start`,
            );
        }
    }, []);

    return (
        <div className={membersMessageContainer} onClick={onClick}>
            <div className={membersMessageContent}>
                <div className={membersMessageMainContent}>
                    <div className={iconContainer}>
                        <UIcon icon={<IcCopy />} />
                    </div>
                    <div className={cx(TextLabel1, titleStyle)}>Member profiles</div>
                    <div className={cx(membersCountStyle, TextBody)}>
                        {otherMemberProfiles ? data!.profiles!.length - 1 : ''}
                    </div>
                </div>
                <div className={cx(membersIconContainer, defaultHover)}>
                    <UIcon icon={<IcArrow />} />
                </div>
            </div>
        </div>
    );
});

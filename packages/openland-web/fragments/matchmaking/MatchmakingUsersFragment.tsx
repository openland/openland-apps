import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
// import { XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
// import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-web/utils/useClient';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextBody, TextTitle1, TextTitle2 } from 'openland-web/utils/TextStyles';
import { MatchmakingRoom_matchmakingRoom_profiles } from 'openland-api/Types';

const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    padding-right: 16px;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    display: flex;
    justify-content: center;
`;

const subtitleStyle = css`
    color: var(--foregroundSecondary);
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 24px;
`;

const usersCardsContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const userCardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 368px;
    width: 100%;
    align-self: center;
    background: #fff;
    box-shadow: 0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
    border-radius: 18px;
    padding: 56px 40px 70px 40px;
    margin-bottom: 16px;
`;

const userNameStyle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 4px;
    margin-top: 16px;
`;

const userOrgStyle = css`
    color: var(--foregroundTertiary);
    margin-bottom: 4px;
`;

const userTagsStyle = css`
    color: var(--foregroundPrimary);
    text-align: center;
`;

const UserCard = (props: { data: MatchmakingRoom_matchmakingRoom_profiles }) => {
    const { user } = props.data;
    return (
        <div className={userCardContainer}>
            <UAvatar title={user.name} id={user.id} photo={user.photo} size="xx-large" />
            <div className={cx(TextTitle2, userNameStyle)}>{user.name}</div>
            {user.primaryOrganization && (
                <div className={cx(TextBody, userOrgStyle)}>{user.primaryOrganization.name}</div>
            )}
            <div className={cx(TextBody, userTagsStyle)}>
                <span>Interested in: </span>
                {props.data.answers.map(i => {
                    if (i.__typename === 'MultiselectMatchmakingAnswer') {
                        return (
                            <span>
                                {i.tags.map((j, k) => {
                                    if (k + 1 !== i.tags.length) {
                                        return `${j}, `;
                                    }
                                    return j;
                                })}
                            </span>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export const MatchmakingUsersFragment = React.memo(() => {
    // const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();
    const chatId = unicorn.query.roomId;
    const client = useClient();
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;

    const haveMyData = data && data.myProfile;
    const haveOtherProfiles = data && data.profiles && data.profiles.length > 1;

    if (!haveMyData && !haveOtherProfiles) {
        return null;
    }

    return (
        <Page flexGrow={1}>
            <XView flexGrow={1}>
                <XView flexGrow={1}>
                    <div className={mainContainer}>
                        <div className={cx(TextTitle1, titleStyle)}>Member profiles</div>
                        <div className={cx(TextBody, subtitleStyle)}>
                            Choose people you want to chat with
                        </div>
                        <div className={usersCardsContainer}>
                            {data!.profiles!.map(i => {
                                if (i.user.id !== data!.myProfile!.user.id) {
                                    return <UserCard data={i} />;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </XView>
            </XView>
        </Page>
    );
});

import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-api/useClient';
import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';
import { UUserFollowerView } from 'openland-web/components/unicorn/templates/UUserFollowerView';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcUserAdd from 'openland-icons/s/ic-invite-24.svg';
import IcBookmark from 'openland-icons/s/ic-bookmark-24.svg';
import {
    SocialUserFollowers_socialUserFollowers_items,
    SocialUserFollowing_socialUserFollowing_items,
} from 'openland-api/spacex.types';
import { useThemeSuffix } from 'openland-x-utils/useTheme';

const counterStyle = css`
    color: var(--foregroundTertiary);
    margin-left: 5px;
`;

const LOADING_HEIGHT = 100;

export enum FollowersTabs {
    FOLLOWING = 'FOLLOWING',
    FOLLOWERS = 'FOLLOWERS',
}

interface UserFollowersModalComponentProps {
    uid: string;
    initialTab?: FollowersTabs;
    hide: () => void;
}

const UserFollowersModalComponent = React.memo<UserFollowersModalComponentProps>((props) => {
    const { uid, initialTab, hide } = props;
    const client = useClient();
    const engine = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext);
    const themeSuffix = useThemeSuffix();
    const [selectedTab, setSelectedTab] = React.useState(initialTab || FollowersTabs.FOLLOWING);
    const [following, setFollowing] = React.useState<
        SocialUserFollowing_socialUserFollowing_items[] | null
    >(null);
    const [followingCursor, setFollowingCursor] = React.useState<string | null>(null);
    const [followersCursor, setFollowersCursor] = React.useState<string | null>(null);
    const [followers, setFollowers] = React.useState<
        SocialUserFollowers_socialUserFollowers_items[] | null
    >(null);
    const { followersCount, followingCount } = client.useUserFollowers(
        { id: uid },
        { fetchPolicy: 'network-only' },
    ).user;
    const myId = engine.user.id;

    React.useEffect(() => {
        (async () => {
            const [initialFollowing, initialFollowers] = await Promise.all([
                client.querySocialUserFollowing(
                    { uid, first: 15 },
                    { fetchPolicy: 'network-only' },
                ),
                client.querySocialUserFollowers(
                    { uid, first: 15 },
                    { fetchPolicy: 'network-only' },
                ),
            ]);
            setFollowing(initialFollowing.socialUserFollowing.items);
            setFollowingCursor(initialFollowing.socialUserFollowing.cursor);
            setFollowers(initialFollowers.socialUserFollowers.items);
            setFollowersCursor(initialFollowers.socialUserFollowers.cursor);
        })();
    }, [uid]);

    const handleItemClick = React.useCallback((userId: string) => {
        hide();
        router!.navigate(`/${userId}`);
    }, []);

    const handleMessageFollowerClick = React.useCallback(
        (userId: string, e: React.MouseEvent<any, MouseEvent>) => {
            e.stopPropagation();
            hide();
            router!.navigate(`/mail/${userId}`);
        },
        [],
    );

    const handleFollowClick = React.useCallback(
        async (userId: string, e: React.MouseEvent<any, MouseEvent>) => {
            e.stopPropagation();
            await client.mutateSocialFollow({ uid: userId });

            setFollowers(
                followers!.map((follower) => {
                    return follower.id === userId
                        ? {
                              ...follower,
                              followedByMe: true,
                              followersCount: follower.followersCount + 1,
                          }
                        : follower;
                }),
            );
        },
        [followers],
    );

    const handleLoadMore = React.useCallback(async () => {
        if (selectedTab === FollowersTabs.FOLLOWING && followingCursor && following) {
            const followingBatch = (
                await client.querySocialUserFollowing(
                    {
                        uid,
                        after: followingCursor,
                        first: 15,
                    },
                    { fetchPolicy: 'network-only' },
                )
            ).socialUserFollowing;
            setFollowing(following.concat(followingBatch.items));
            setFollowingCursor(followingBatch.cursor);
        } else if (selectedTab === FollowersTabs.FOLLOWERS && followersCursor && followers) {
            const followersBatch = (
                await client.querySocialUserFollowers(
                    {
                        uid,
                        after: followersCursor,
                        first: 15,
                    },
                    { fetchPolicy: 'network-only' },
                )
            ).socialUserFollowers;
            setFollowers(followers.concat(followersBatch.items));
            setFollowersCursor(followersBatch.cursor);
        }
    }, [following, followingCursor, followers, followersCursor, uid, selectedTab]);

    const handleScroll = React.useCallback(
        (values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);
            if (d < LOADING_HEIGHT) {
                handleLoadMore();
            }
        },
        [following, followingCursor, followers, followersCursor, uid, selectedTab],
    );

    return (
        <>
            <XView flexDirection="row" padding={24} {...TextStyles.Title3}>
                <XView
                    flexDirection="row"
                    marginRight={16}
                    cursor="pointer"
                    color={
                        selectedTab === FollowersTabs.FOLLOWING
                            ? 'var(--foregroundPrimary)'
                            : 'var(--foregroundSecondary)'
                    }
                    onClick={() => setSelectedTab(FollowersTabs.FOLLOWING)}
                >
                    Following<span className={counterStyle}>{followingCount}</span>
                </XView>
                <XView
                    flexDirection="row"
                    cursor="pointer"
                    color={
                        selectedTab === FollowersTabs.FOLLOWERS
                            ? 'var(--foregroundPrimary)'
                            : 'var(--foregroundSecondary)'
                    }
                    onClick={() => setSelectedTab(FollowersTabs.FOLLOWERS)}
                >
                    Followers<span className={counterStyle}>{followersCount}</span>
                </XView>
            </XView>
            {selectedTab === FollowersTabs.FOLLOWING && following && following.length === 0 && (
                <XView
                    {...TextStyles.Title1}
                    alignItems="center"
                    justifyContent="center"
                    paddingTop={12}
                    paddingBottom={46}
                >
                    <img
                        width="320"
                        height="200"
                        src={`//cdn.openland.com/shared/art/art-shared${themeSuffix}.png`}
                        srcSet={`//cdn.openland.com/shared/art/art-shared${themeSuffix}@2x.png 2x, //cdn.openland.com/shared/art/art-shared${themeSuffix}@3x.png 3x`}
                        alt=""
                    />
                    No following yet
                </XView>
            )}
            {selectedTab === FollowersTabs.FOLLOWERS && followers && followers.length === 0 && (
                <XView
                    {...TextStyles.Title1}
                    alignItems="center"
                    justifyContent="center"
                    paddingTop={12}
                    paddingBottom={46}
                >
                    <img
                        width="320"
                        height="200"
                        src={`//cdn.openland.com/shared/art/art-shared${themeSuffix}.png`}
                        srcSet={`//cdn.openland.com/shared/art/art-shared${themeSuffix}@2x.png 2x, //cdn.openland.com/shared/art/art-shared${themeSuffix}@3x.png 3x`}
                        alt=""
                    />
                    No followers yet
                </XView>
            )}
            {selectedTab === FollowersTabs.FOLLOWING && following && (
                <XScrollView3
                    flexGrow={1}
                    flexShrink={1}
                    paddingBottom={24}
                    onScroll={handleScroll}
                >
                    {following.map((item) => {
                        return (
                            <UUserFollowerView
                                user={item}
                                key={item.id}
                                rightElement={
                                    <UIconButton
                                        icon={myId === item.id ? <IcBookmark /> : <IcMessage />}
                                        onClick={(e) => handleMessageFollowerClick(item.id, e)}
                                    />
                                }
                                onClick={() => handleItemClick(item.id)}
                            />
                        );
                    })}
                </XScrollView3>
            )}
            {selectedTab === FollowersTabs.FOLLOWERS && followers && (
                <XScrollView3
                    flexGrow={1}
                    flexShrink={1}
                    paddingBottom={24}
                    onScroll={handleScroll}
                >
                    {followers.map((item) => {
                        let rightElement;
                        if (!item.followedByMe && !(myId === item.id)) {
                            rightElement = (
                                <UIconButton
                                    icon={<IcUserAdd />}
                                    onClick={(e) => handleFollowClick(item.id, e)}
                                />
                            );
                        }

                        return (
                            <UUserFollowerView
                                user={item}
                                key={item.id}
                                rightElement={rightElement}
                                onClick={() => handleItemClick(item.id)}
                            />
                        );
                    })}
                </XScrollView3>
            )}
        </>
    );
});

export const showUserFollowersModal = (props: { uid: string; initialTab: FollowersTabs }) => {
    showModalBox({ useTopCloser: true, width: 480 }, (ctx) => (
        <UserFollowersModalComponent {...props} hide={ctx.hide} />
    ));
};

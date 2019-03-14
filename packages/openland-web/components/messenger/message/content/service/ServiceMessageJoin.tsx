import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { OthersPopper } from './views/OthersPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
const joinEmojiList = ['🖖', '🖐️', '✋', '🙌', '👏', '👋'];

const emojifyJoinEmojies = ({ src, size }: { src: string; size: 18 }) => {
    if (src === '🖖') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    width: 16,
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {
                    marginLeft: -1,
                },
            },
        });
    } else if (src === '🖐️') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    width: 16,
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {
                    marginLeft: -1,
                },
            },
        });
    } else if (src === '✋') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {},
            },
        });
    } else if (src === '🙌') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    width: 18,
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {},
            },
        });
    } else if (src === '👏') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    width: 16,
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {
                    marginLeft: -1,
                },
            },
        });
    } else if (src === '👋') {
        return emoji({
            src,
            size,
            crop: {
                figureStyle: {
                    width: 16,
                    marginBottom: -2,
                    marginRight: 2,
                },
                imgStyle: {
                    marginLeft: -1,
                },
            },
        });
    }

    return emoji({
        src,
        size,
    });
};

const GetRandomJoinEmoji = () =>
    emojifyJoinEmojies({
        src: joinEmojiList[Math.floor(Math.random() * joinEmojiList.length)],
        size: 18,
    });

const getJoinUsers = ({ serviceMetadata, alphaMentions }: any) => {
    return (serviceMetadata.users
        ? serviceMetadata.users
        : alphaMentions.map(({ user }: { user: UserShort[] }) => user)) as any[];
};

const JoinOneServiceMessage = React.memo(
    ({
        joinedByUser,
        firstUser,
        myUserId,
    }: {
        joinedByUser: UserShort;
        firstUser: UserShort;
        myUserId: string;
    }) => {
        const randomEmoji = React.useMemo(() => {
            return GetRandomJoinEmoji();
        }, [myUserId]);

        let [handEmoji] = React.useState(randomEmoji);
        return (
            <Container>
                {joinedByUser.id === firstUser.id ? (
                    <>
                        {handEmoji}{' '}
                        <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined
                        the group via invite link
                    </>
                ) : (
                    <>
                        {handEmoji}{' '}
                        <MentionedUser user={joinedByUser} isYou={myUserId === joinedByUser.id} />{' '}
                        invited <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} />
                    </>
                )}
            </Container>
        );
    },
);

const JoinTwoServiceMessage = React.memo(
    ({
        joinedByUser,
        firstUser,
        secondUser,
        myUserId,
    }: {
        joinedByUser: UserShort;
        firstUser: UserShort;
        secondUser: UserShort;
        myUserId: string;
    }) => {
        const randomEmoji = React.useMemo(() => {
            return GetRandomJoinEmoji();
        }, [myUserId]);

        let [handEmoji] = React.useState(randomEmoji);
        return (
            <Container>
                {handEmoji}{' '}
                <MentionedUser user={joinedByUser} isYou={myUserId === joinedByUser.id} /> invited{' '}
                <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> and{' '}
                <MentionedUser user={secondUser} isYou={myUserId === secondUser.id} />
            </Container>
        );
    },
);

const JoinManyServiceMessage = React.memo(
    ({
        joinedByUser,
        firstUser,
        otherUsers,
        myUserId,
    }: {
        joinedByUser: UserShort;
        firstUser: UserShort;
        otherUsers: UserShort[];
        myUserId: string;
    }) => {
        const randomEmoji = React.useMemo(() => {
            return GetRandomJoinEmoji();
        }, [myUserId]);

        let [handEmoji] = React.useState(randomEmoji);
        return (
            <Container>
                {handEmoji}{' '}
                <MentionedUser user={joinedByUser} isYou={myUserId === joinedByUser.id} /> invited{' '}
                <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> along with{' '}
                <span>
                    <OthersPopper
                        show={true}
                        items={otherUsers.map(({ id, name, photo, primaryOrganization }: any) => ({
                            title: name,
                            subtitle: primaryOrganization ? primaryOrganization.name : '',
                            photo,
                            id,
                        }))}
                    >
                        {otherUsers.length} others
                    </OthersPopper>
                </span>
            </Container>
        );
    },
);

export const ServiceMessageJoin = XMemo<{
    joinedByUser: UserShort;
    serviceMetadata: any;
    alphaMentions: any;
    myUserId: string;
}>(props => {
    const joinUsers = getJoinUsers(props);
    const { joinedByUser, myUserId } = props;
    if (joinUsers.length === 1) {
        return (
            <JoinOneServiceMessage
                myUserId={myUserId}
                firstUser={joinUsers[0]}
                joinedByUser={joinedByUser}
            />
        );
    } else if (joinUsers.length === 2) {
        return (
            <JoinTwoServiceMessage
                myUserId={myUserId}
                firstUser={joinUsers[0]}
                secondUser={joinUsers[1]}
                joinedByUser={joinedByUser}
            />
        );
    } else {
        return (
            <JoinManyServiceMessage
                myUserId={myUserId}
                firstUser={joinUsers[0]}
                otherUsers={joinUsers.slice(1)}
                joinedByUser={joinedByUser}
            />
        );
    }
});

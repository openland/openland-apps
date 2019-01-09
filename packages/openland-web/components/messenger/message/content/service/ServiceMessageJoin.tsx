import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { OthersPopper } from './views/OthersPopper';
import { UserShort } from 'openland-api/Types';

const joinEmojiList = ['👋', '🖖', '👏', '✋', '🖐️'];

const GetRandomJoinEmoji = () => joinEmojiList[Math.floor(Math.random() * joinEmojiList.length)];

const getJoinUsers = ({ serviceMetadata, alphaMentions }: any) => {
    return (serviceMetadata.users
        ? serviceMetadata.users
        : alphaMentions.map(({ user }: { user: UserShort[] }) => user)) as any[];
};

const JoinOneServiceMessage = ({
    joinedByUser,
    firstUser,
    myUserId,
}: {
    joinedByUser: UserShort;
    firstUser: UserShort;
    myUserId: string;
}) => {
    let [handEmoji] = React.useState(GetRandomJoinEmoji());
    return (
        <Container>
            {joinedByUser.id === firstUser.id ? (
                <>
                    {handEmoji} <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} />{' '}
                    joined the room
                </>
            ) : (
                <>
                    {handEmoji} <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} />{' '}
                    was invited by{' '}
                    <MentionedUser user={joinedByUser} isYou={myUserId === firstUser.id} />
                </>
            )}
        </Container>
    );
};

const JoinTwoServiceMessage = ({
    firstUser,
    secondUser,
    myUserId,
}: {
    firstUser: UserShort;
    secondUser: UserShort;
    myUserId: string;
}) => {
    let [handEmoji] = React.useState(GetRandomJoinEmoji());
    return (
        <Container>
            {handEmoji} <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined
            the room along with{' '}
            <MentionedUser user={secondUser} isYou={myUserId === secondUser.id} />
        </Container>
    );
};

const JoinManyServiceMessage = ({
    firstUser,
    otherUsers,
    myUserId,
}: {
    firstUser: UserShort;
    otherUsers: UserShort[];
    myUserId: string;
}) => {
    let [handEmoji] = React.useState(GetRandomJoinEmoji());
    return (
        <Container>
            {handEmoji} <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined
            the room along with{' '}
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
};

export const ServiceMessageJoin = React.memo<{
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
            />
        );
    } else {
        return (
            <JoinManyServiceMessage
                myUserId={myUserId}
                firstUser={joinUsers[0]}
                otherUsers={joinUsers.slice(1)}
            />
        );
    }
});

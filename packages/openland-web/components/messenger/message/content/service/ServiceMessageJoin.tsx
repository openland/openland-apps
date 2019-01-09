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
    firstUser,
    myUserId,
}: {
    firstUser: UserShort;
    myUserId: string;
}) => {
    let [handEmoji] = React.useState(GetRandomJoinEmoji());
    return (
        <Container>
            {handEmoji} <MentionedUser user={firstUser} isYou={myUserId === firstUser.id} /> joined
            the room
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
    serviceMetadata: any;
    alphaMentions: any;
    myUserId: string;
}>(props => {
    const joinUsers = getJoinUsers(props);
    if (joinUsers.length === 1) {
        return <JoinOneServiceMessage myUserId={props.myUserId} firstUser={joinUsers[0]} />;
    } else if (joinUsers.length === 2) {
        return (
            <JoinTwoServiceMessage
                myUserId={props.myUserId}
                firstUser={joinUsers[0]}
                secondUser={joinUsers[1]}
            />
        );
    } else {
        return (
            <JoinManyServiceMessage
                myUserId={props.myUserId}
                firstUser={joinUsers[0]}
                otherUsers={joinUsers.slice(1)}
            />
        );
    }
});

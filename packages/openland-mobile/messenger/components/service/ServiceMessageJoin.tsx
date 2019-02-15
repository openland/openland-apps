import * as React from 'react';
import { Container } from './views/Container';
import { MessageFull_serviceMetadata_InviteServiceMetadata, UserShort } from 'openland-api/Types';
import { UserWrapper } from './views/UserWrapper';
import { OthersUsersWrapper } from './views/OthersUsersWrapper';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

const joinEmojiList = ['👋', '🖖', '👏', '✋', '🖐️'];

const GetRandomJoinEmoji = () => joinEmojiList[Math.floor(Math.random() * joinEmojiList.length)];

interface JoinDefaultProps {
    firstUser: UserShort;
    onUserPress: (id: string) => void;
    myUserId: string;
    handEmoji: string;
    theme: ConversationTheme;
}

const JoinOneServiceMessage = (props: JoinDefaultProps & { joinedByUser: UserShort }) => {
    let { joinedByUser, firstUser, onUserPress, myUserId, handEmoji } = props;

    if (joinedByUser && joinedByUser.id !== firstUser.id) {
        return (
            <Container theme={props.theme}>
                {handEmoji}{' '}
                <UserWrapper theme={props.theme} user={firstUser} onUserPress={onUserPress} myUserId={myUserId} /> was
                invited by{' '}
                <UserWrapper theme={props.theme} user={joinedByUser} onUserPress={onUserPress} myUserId={myUserId} />
            </Container>
        );
    }

    return (
        <Container theme={props.theme}>
            {handEmoji}{' '}
            <UserWrapper theme={props.theme} user={firstUser} onUserPress={onUserPress} myUserId={myUserId} /> joined
            the room
        </Container>
    );
};

const JoinTwoServiceMessage = (props: JoinDefaultProps & { secondUser: UserShort }) => {
    let { secondUser, firstUser, onUserPress, myUserId, handEmoji } = props;

    return (
        <Container theme={props.theme}>
            {handEmoji}{' '}
            <UserWrapper theme={props.theme} user={firstUser} onUserPress={onUserPress} myUserId={myUserId} /> joined
            the room along with{' '}
            <UserWrapper theme={props.theme} user={secondUser} onUserPress={onUserPress} myUserId={myUserId} />
        </Container>
    );
};

const JoinManyServiceMessage = (props: JoinDefaultProps & { otherUsers: UserShort[] }) => {
    let { otherUsers, firstUser, onUserPress, myUserId, handEmoji } = props;

    return (
        <Container theme={props.theme}>
            {handEmoji}{' '}
            <UserWrapper theme={props.theme} user={firstUser} onUserPress={onUserPress} myUserId={myUserId} /> joined
            the room along with <OthersUsersWrapper theme={props.theme} users={otherUsers} onUserPress={onUserPress} />
        </Container>
    );
};

interface ServiceMessageJoinProps {
    myUserId: string;
    serviceMetadata: MessageFull_serviceMetadata_InviteServiceMetadata;
    onUserPress: (id: string) => void;
    theme: ConversationTheme;
}

interface ServiceMessageJoinState {
    handEmoji: string;
}

export class ServiceMessageJoin extends React.PureComponent<
    ServiceMessageJoinProps,
    ServiceMessageJoinState
    > {
    constructor(props: ServiceMessageJoinProps) {
        super(props);

        this.state = {
            handEmoji: GetRandomJoinEmoji(),
        };
    }

    render() {
        let { myUserId, serviceMetadata, onUserPress } = this.props;
        let { users } = serviceMetadata;

        if (users && users.length > 0) {
            if (users.length === 1) {
                return (
                    <JoinOneServiceMessage
                        theme={this.props.theme}
                        myUserId={myUserId}
                        firstUser={users[0]}
                        joinedByUser={serviceMetadata.invitedBy}
                        onUserPress={onUserPress}
                        handEmoji={this.state.handEmoji}
                    />
                );
            } else if (users.length === 2) {
                return (
                    <JoinTwoServiceMessage
                        theme={this.props.theme}
                        myUserId={myUserId}
                        firstUser={users[0]}
                        secondUser={users[1]}
                        onUserPress={onUserPress}
                        handEmoji={this.state.handEmoji}
                    />
                );
            } else {
                return (
                    <JoinManyServiceMessage
                        theme={this.props.theme}
                        myUserId={myUserId}
                        firstUser={users[0]}
                        otherUsers={users.slice(1)}
                        onUserPress={onUserPress}
                        handEmoji={this.state.handEmoji}
                    />
                );
            }
        } else {
            return null;
        }
    }
}

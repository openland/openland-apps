import * as React from 'react';
import { Container } from './views/Container';
import { UserShort, MessageFull_serviceMetadata_KickServiceMetadata } from 'openland-api/Types';
import { UserWrapper } from './views/UserWrapper';
import { ConversationTheme } from '../../../pages/main/themes/ConversationThemeResolver';

interface KickDefaultProps {
    user: UserShort;
    onUserPress: (id: string) => void;
    myUserId: string;
    theme: ConversationTheme;
}

const KickServiceMessage = (props: KickDefaultProps) => {
    let { user, onUserPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            <UserWrapper theme={props.theme} user={user} onUserPress={onUserPress} myUserId={myUserId} />
            {user.id === myUserId ? ' have' : ' has'} left the room
        </Container>
    );
};

const KickedByServiceMessage = (props: KickDefaultProps & { kickedBy: UserShort }) => {
    let { user, kickedBy, onUserPress, myUserId } = props;

    return (
        <Container theme={props.theme}>
            <UserWrapper theme={props.theme} user={kickedBy} onUserPress={onUserPress} myUserId={myUserId} />{' '}
            kicked{' '}
            <UserWrapper theme={props.theme} user={user} onUserPress={onUserPress} myUserId={myUserId} />
        </Container>
    );
};

interface ServiceMessageKickProps {
    myUserId: string;
    serviceMetadata: MessageFull_serviceMetadata_KickServiceMetadata;
    onUserPress: (id: string) => void;
    theme: ConversationTheme
}

export const ServiceMessageKick = (props: ServiceMessageKickProps) => {
    let { myUserId, serviceMetadata, onUserPress } = props;
    let { kickedBy, user } = serviceMetadata;

    if (kickedBy.id === user.id) {
        return <KickServiceMessage theme={props.theme} myUserId={myUserId} user={user} onUserPress={onUserPress} />;
    } else {
        return (
            <KickedByServiceMessage
                theme={props.theme}
                myUserId={myUserId}
                user={user}
                kickedBy={kickedBy}
                onUserPress={onUserPress}
            />
        );
    }
};

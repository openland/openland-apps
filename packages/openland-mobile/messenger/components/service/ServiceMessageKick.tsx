import * as React from 'react';
import { Container } from './views/Container';
import { UserShort, MessageFull_serviceMetadata_KickServiceMetadata } from 'openland-api/Types';
import { UserWrapper } from './views/UserWrapper';

interface KickDefaultProps {
    user: UserShort;
    onUserPress: (id: string) => void;
    myUserId: string;
}

const KickServiceMessage = (props: KickDefaultProps) => {
    let { user, onUserPress, myUserId } = props;

    return (
        <Container>
            <UserWrapper user={user} onUserPress={onUserPress} myUserId={myUserId} /> has left the
            room
        </Container>
    );
};

const KickedByServiceMessage = (props: KickDefaultProps & { kickedBy: UserShort }) => {
    let { user, kickedBy, onUserPress, myUserId } = props;

    return (
        <Container>
            <UserWrapper user={user} onUserPress={onUserPress} myUserId={myUserId} /> was kicked by{' '}
            <UserWrapper user={kickedBy} onUserPress={onUserPress} myUserId={myUserId} />
        </Container>
    );
};

interface ServiceMessageKickProps {
    myUserId: string;
    serviceMetadata: MessageFull_serviceMetadata_KickServiceMetadata;
    onUserPress: (id: string) => void;
}

export const ServiceMessageKick = (props: ServiceMessageKickProps) => {
    let { myUserId, serviceMetadata, onUserPress } = props;
    let { kickedBy, user } = serviceMetadata;

    if (kickedBy.id === user.id) {
        return <KickServiceMessage myUserId={myUserId} user={user} onUserPress={onUserPress} />;
    } else {
        return (
            <KickedByServiceMessage
                myUserId={myUserId}
                user={user}
                kickedBy={kickedBy}
                onUserPress={onUserPress}
            />
        );
    }
};

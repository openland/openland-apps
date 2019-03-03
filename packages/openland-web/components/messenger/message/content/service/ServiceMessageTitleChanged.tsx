import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { UserShort } from 'openland-api/Types';

export const ServiceMessageTitleChanged = ({
    newRoomName,
    sender,
    myUserId,
}: {
    newRoomName: string;
    sender: UserShort;
    myUserId: string;
}) => (
    <Container>
        <MentionedUser user={sender} isYou={myUserId === sender.id} /> changed group name to{' '}
        <strong>{newRoomName}</strong>
    </Container>
);

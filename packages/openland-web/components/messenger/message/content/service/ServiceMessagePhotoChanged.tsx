import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';
import { UserShort } from 'openland-api/Types';

export const ServiceMessagePhotoChanged = ({
    sender,
    myUserId,
}: {
    sender: UserShort;
    myUserId: string;
}) => (
    <Container>
        <MentionedUser user={sender} isYou={myUserId === sender.id} />{' '}
        changed group photo
    </Container>
);

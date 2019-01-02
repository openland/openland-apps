import * as React from 'react';
import { Container } from './views/Container';
import { MentionedUser } from './views/MentionedUser';

export interface ServiceMessageLeftProps {
    kickedUser: any;
    myUserId: string;
}

export const ServiceMessageLeft = (props: ServiceMessageLeftProps) => (
    <Container>
        <MentionedUser user={props.kickedUser} isYou={props.myUserId === props.kickedUser.id} /> has left the room
    </Container>
);
import * as React from 'react';
import { Container } from './views/Container';

export const ServiceMessageTitleChanged = ({ newRoomName }: { newRoomName: string }) => (
    <Container>
        New room name: <strong>{newRoomName}</strong>
    </Container>
);

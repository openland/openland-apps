import * as React from 'react';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { SpannedStringView } from '../SpannedStringView';

export const ServiceMessageDefault = ({ message, spans }: { message: string; spans?: FullMessage_ServiceMessage_spans[]; }) => {
    return (
        <Container>
            <SpannedStringView message={message} spans={spans} />
        </Container>
    );
};

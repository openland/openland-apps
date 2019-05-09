import * as React from 'react';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { SpannedView } from '../SpannedView';
import { processSpans } from 'openland-y-utils/spans/proccessSpans';

export const ServiceMessageDefault = React.memo<{
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}>(props => {
    const parts = processSpans(props.message, props.spans);
    return (
        <Container>
            <SpannedView spans={parts} />
        </Container>
    );
});

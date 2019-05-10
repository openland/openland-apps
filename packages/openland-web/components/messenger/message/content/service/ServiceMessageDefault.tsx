import * as React from 'react';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { SpannedView } from '../SpannedView';
import { processSpans } from 'openland-y-utils/spans/proccessSpans';
import { emojifyText } from 'openland-web/components/messenger/data/spansMessageTextPreprocess';

export const ServiceMessageDefault = React.memo<{
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}>(props => {
    const parts = processSpans(props.message, props.spans, (text) => emojifyText(text));

    return (
        <Container>
            <SpannedView spans={parts} />
        </Container>
    );
});

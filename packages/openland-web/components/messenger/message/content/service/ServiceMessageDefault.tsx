import * as React from 'react';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { SpannedStringView } from '../SpannedStringView';
import { spansPreprocess } from 'openland-web/components/messenger/data/spansPreprocess';

export const ServiceMessageDefault = React.memo<{
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}>(props => {
    const spannedString = spansPreprocess(props.message, props.spans);
    return (
        <Container>
            <SpannedStringView spannedString={spannedString} isService />
        </Container>
    );
});

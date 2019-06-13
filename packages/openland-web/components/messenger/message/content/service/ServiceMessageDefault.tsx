import * as React from 'react';
import { Container } from './views/Container';
import { SpannedView } from '../SpannedView';
import { Span } from 'openland-y-utils/spans/Span';

export const ServiceMessageDefault = React.memo<{ spans: Span[] }>(props => {
    return (
        <Container>
            <SpannedView spans={props.spans} isService={true} />
        </Container>
    );
});

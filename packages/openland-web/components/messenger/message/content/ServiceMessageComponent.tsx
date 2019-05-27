import * as React from 'react';
import { ServiceMessageDefault } from './service/ServiceMessageDefault';
import { Span } from 'openland-y-utils/spans/Span';

export const ServiceMessageComponent = React.memo((props: { spans: Span[] }) => {
    return <ServiceMessageDefault spans={props.spans} />;
});

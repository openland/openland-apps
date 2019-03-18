import * as React from 'react';
import { ServiceMessageDefault } from './service/ServiceMessageDefault';
import {
    FullMessage_ServiceMessage_serviceMetadata,
    FullMessage_ServiceMessage_spans,
} from 'openland-api/Types';

export const ServiceMessageComponent = React.memo(
    (params: {
        spans?: FullMessage_ServiceMessage_spans[];
        senderUser: { id: string; name: string };
        serviceMetadata: FullMessage_ServiceMessage_serviceMetadata;
        message: string;
        myUserId: string;
    }) => {
        return <ServiceMessageDefault message={params.message} spans={params.spans} />;
    },
);

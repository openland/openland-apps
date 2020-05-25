import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';

export const HubFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    let hub = client.useHub({ id: props.id }, { fetchPolicy: 'cache-and-network' }).hub!;
    return (
        <>
            <UHeader title={hub.title} appearance="wide" />
        </>
    );
});
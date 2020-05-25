import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';

export const HubFragment = React.memo((props: { id: string }) => {
    return (
        <>
            <UHeader title={props.id} appearance="wide" />
        </>
    );
});
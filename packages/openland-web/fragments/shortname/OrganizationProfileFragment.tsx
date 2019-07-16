import * as React from 'react';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    return (
        <XScrollView3 flexGrow={1}>
            <UListGroup header="About">
                <XView>Text</XView>
            </UListGroup>
        </XScrollView3>
    );
});
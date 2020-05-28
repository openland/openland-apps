import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { plural } from 'openland-y-utils/plural';

export const GroupViewsCount = React.memo((props: { id: string }) => {
    const client = useClient();
    const views = client.useGroupScreenViews({ id: props.id }).groupScreenViews;

    return (
        <UListField label="Screen views" value={plural(views, ['view', 'views'])} />
    );
});
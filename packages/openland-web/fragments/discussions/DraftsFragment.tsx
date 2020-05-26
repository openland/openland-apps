import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';

export const DraftsFragment = React.memo(() => {
    const client = useClient();
    const drafts = client.useDiscussionDrafts({}).discussionMyDrafts.items;

    if (drafts.length > 0) {
        return (
            <>
                <UHeader title="Drafts" appearance="fullwidth" />
                {drafts.map((d) => (
                    <XView borderRadius={16} borderColor="red">
                        {d.title}
                    </XView>
                ))}
            </>
        );
    } else {
        return (
            <>
                <UHeader title="Drafts" appearance="fullwidth" />
            </>
        );
    }
});
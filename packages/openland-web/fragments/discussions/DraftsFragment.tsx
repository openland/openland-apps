import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView, XViewRouterContext } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useXRouter } from 'openland-x-routing/useXRouter';

export const DraftsFragment = React.memo(() => {
    const client = useClient();
    const drafts = client.useDiscussionDrafts({}).discussionMyDrafts.items;
    const [creating, setCreating] = React.useState(false);
    const router = React.useContext(XViewRouterContext)!;

    const create = React.useCallback(() => {
        setCreating(true);
        (async () => {
            let draft = (await client.mutateDiscussionCreateDraft()).discussionCreate;
            client.refetchDiscussionDrafts({});
            router.navigate('/discuss/edit/' + draft.id);
            setCreating(false);
        })();
    }, []);

    if (drafts.length > 0) {
        return (
            <>
                <UHeader title="Drafts" appearance="fullwidth" />
                <UButton text="Publish" loading={creating} onClick={create} />
                {drafts.map((d) => (
                    <XView borderRadius={16} backgroundColor="red" height={100} width={100} path={'/discuss/edit/' + d.id}>
                        {d.title}
                    </XView>
                ))}
            </>
        );
    } else {
        return (
            <>
                <UHeader title="Drafts" appearance="fullwidth" />
                <UButton text="Publish" loading={creating} onClick={create} />
            </>
        );
    }
});
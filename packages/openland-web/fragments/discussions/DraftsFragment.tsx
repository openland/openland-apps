import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView, XViewRouterContext } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';

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
                <XView flexDirection="column">
                    <UButton text="Publish" loading={creating} onClick={create} alignSelf="flex-start" />
                    {drafts.map((d) => (
                        <XView alignSelf="stretch" borderRadius={16} borderWidth={1} borderColor="red" height={100} path={'/discuss/edit/' + d.id}>
                            {d.title === '' ? 'Untitled discussion' : d.title}
                        </XView>
                    ))}
                </XView>
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
import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { XView, XViewRouterContext } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { MyPostDrafts_postMyDrafts_items } from 'openland-api/spacex.types';
import { XDate } from 'openland-x/XDate';

const DraftComponent = (props: { data: MyPostDrafts_postMyDrafts_items }) => {
    let title = props.data.title === '' ? 'Untitled discussion' : props.data.title;
    return (
        <XView
            alignSelf="stretch"
            height={56}
            marginVertical={20}
            path={'/channels/edit/' + props.data.id}
            cursor="pointer"
            flexDirection="column"
        >
            <XView {...TextStyles.Title1} flexGrow={1} flexShrink={1}>
                {title}
            </XView>
            <XView>
                <span>Created <XDate value={props.data.createdAt} format="humanize" /></span>
            </XView>
            <XView height={1} backgroundColor="rgba(0,0,0,.15)" />
        </XView>
    );
};

export const DraftsFragment = React.memo(() => {
    const client = useClient();
    const drafts = client.useMyPostDrafts({}).postMyDrafts.items;
    const [creating, setCreating] = React.useState(false);
    const router = React.useContext(XViewRouterContext)!;

    const create = React.useCallback(() => {
        setCreating(true);
        (async () => {
            let draft = (await client.mutatePostCreateDraft()).postDraftCreate;
            client.refetchMyPostDrafts({});
            router.navigate('/channels/edit/' + draft.id);
            setCreating(false);
        })();
    }, []);

    const title = (
        <XView flexDirection="row" alignSelf="center" flexGrow={1} flexShrink={1}>
            <XView flexGrow={1} {...TextStyles.Title1} alignSelf="center">Drafts</XView>
            <UButton text="New Discussion" loading={creating} onClick={create} alignSelf="flex-start" />
        </XView>
    );

    if (drafts.length > 0) {
        return (
            <Page track="discussion_drafts_page" padded={true} style="wide">
                <UHeader title="Drafts" titleView={title} maxWidth={890} />
                <XView flexDirection="row" alignItems="flex-start" justifyContent="center">
                    <XView flexGrow={1} flexShrink={1}>
                        <XView flexDirection="column">
                            {drafts.map((d) => (
                                <DraftComponent key={d.id} data={d} />
                            ))}
                        </XView>
                    </XView>
                </XView>
            </Page>
        );
    } else {
        return (
            <Page track="discussion_drafts_page" padded={true} style="wide">
                <UHeader title="Drafts" titleView={title} maxWidth={890} />
            </Page>
        );
    }
});
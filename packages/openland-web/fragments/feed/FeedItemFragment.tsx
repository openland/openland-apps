import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UHeader } from 'openland-unicorn/UHeader';
import { convertPost } from 'openland-engines/feed/convert';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';

const FeedItemFragmentInner = React.memo((props: { feedItemId: string }) => {
    const { feedItemId } = props;
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const itemSrc = client.useFeedItem({ id: feedItemId }, { fetchPolicy: 'cache-and-network' }).item;

    if (!itemSrc || itemSrc.__typename !== 'FeedPost') {
        return null;
    }

    const item = React.useMemo(() => convertPost(itemSrc, messenger), [itemSrc]);

    return (
        <CommentsWrapper
            peerId={feedItemId}
            peerView={<div>{item.id}</div>}
        />
    );
});

export const FeedItemFragment = React.memo(() => {
    const unicorn = useUnicorn();

    return (
        <>
            <UHeader title="Post" appearance="wide" />
            <FeedItemFragmentInner feedItemId={unicorn.id} />
        </>
    );
});
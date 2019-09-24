import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UHeader } from 'openland-unicorn/UHeader';
import { convertPost } from 'openland-engines/feed/convert';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const wrapperClass = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const contentClass = css`
    padding: 0 16px;
    max-width: 824px;
    width: 100%;
    margin: 0 auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

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
        <div className={wrapperClass}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start">
                <div className={contentClass}>
                    {item.id}
                </div>
            </XScrollView3>
        </div>
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
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { FeedAuthorHeader } from 'openland-mobile/feed/components/FeedAuthorHeader';
import { FeedPostContent } from 'openland-mobile/feed/content/FeedPostContent';
import { convertPost } from 'openland-engines/feed/convert';
import { Dimensions, View } from 'react-native';
import { FeedPostTools } from 'openland-mobile/feed/components/FeedPostTools';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { CommentsWrapper } from './components/comments/CommentsWrapper';

const FeedItemComponent = React.memo((props: PageProps) => {
    const feedItemId = props.router.params.id;
    const highlightId = props.router.params.highlightCommentId;

    const client = getClient();
    const messenger = getMessenger();
    const item = client.useFeedItem({ id: feedItemId }, { fetchPolicy: 'cache-and-network' }).item;

    if (!item || item.__typename !== 'FeedPost') {
        return null;
    }

    const itemProcessed = React.useMemo(() => convertPost(item, messenger.engine), [item]);
    const { canEdit, author, date, slides, reactionsReduced } = itemProcessed;
    const width = Dimensions.get('screen').width;

    const peerView = (
        <>
            <View height={8} />
            <FeedPostContent
                slides={slides}
                width={width}
            />
            <FeedPostTools
                id={feedItemId}
                reactions={reactionsReduced}
            />
        </>
    );

    return (
        <>
            <SHeaderView>
                <FeedAuthorHeader author={author} date={date} />
            </SHeaderView>

            <ZManageButton onPress={() => FeedHandlers.Manage(feedItemId, canEdit)} />

            <CommentsWrapper
                peerView={peerView}
                peerId={feedItemId}
                highlightId={highlightId}
                onAddComment={async (variables) => {
                    await getClient().mutateAddFeedComment({
                        ...variables,
                        feedItemId
                    });
                }}
            />
        </>
    );
});

export const FeedItem = withApp(FeedItemComponent, { navigationAppearance: 'small' });

import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { FeedAuthorHeader } from 'openland-mobile/feed/components/FeedAuthorHeader';
import { FeedPostContent } from 'openland-mobile/feed/content/FeedPostContent';
import { convertPost } from 'openland-engines/feed/convert';
import { Dimensions, View } from 'react-native';
import { FeedPostTools } from 'openland-mobile/feed/components/FeedPostTools';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { CommentsWrapper } from './components/comments/CommentsWrapper';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SHeaderIndicator } from 'react-native-s/SHeaderIndicator';

const FeedItemComponent = React.memo((props: PageProps) => {
    const feedItemId = props.router.params.id;
    const highlightId = props.router.params.highlightCommentId;

    const client = getClient();
    const messenger = getMessenger();
    const theme = React.useContext(ThemeContext);
    const item = client.useFeedItem({ id: feedItemId }, { fetchPolicy: 'cache-and-network' }).item;

    if (!item || item.__typename !== 'FeedPost') {
        return null;
    }

    const itemProcessed = React.useMemo(() => convertPost(item, messenger.engine), [item]);
    const { canEdit, author, date, slides, reactionsReduced } = itemProcessed;
    const width = Dimensions.get('screen').width;
    const [currentSlide, setCurreentSlide] = React.useState(0);

    const peerView = (
        <>
            <View height={8} />
            <FeedPostContent
                slides={slides}
                width={width}
                onSlideChange={i => setCurreentSlide(i)}
            />
            <FeedPostTools
                id={feedItemId}
                reactions={reactionsReduced}
                canEdit={canEdit}
            />
        </>
    );

    return (
        <>
            <SHeaderView>
                <FeedAuthorHeader author={author} date={date} />
            </SHeaderView>

            {slides.length > 0 && (
                <SHeaderIndicator
                    key={`indicator-${currentSlide}-${theme.kind}`}
                    current={currentSlide + 1}
                    items={slides.length}
                    theme={theme}
                />
            )}

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

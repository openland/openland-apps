import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { AuthorHeader } from 'openland-mobile/pages/main/components/AuthorHeader';
import { FeedPostContent } from 'openland-mobile/feed/content/FeedPostContent';
import { convertPost } from 'openland-engines/feed/convert';
import { Dimensions, View } from 'react-native';
import { FeedPostTools } from 'openland-mobile/feed/components/FeedPostTools';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { CommentsWrapper } from './components/comments/CommentsWrapper';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SHeaderIndicator } from 'react-native-s/SHeaderIndicator';
import { SDeferred } from 'react-native-s/SDeferred';

const FeedItemComponent = React.memo((props: PageProps) => {
    const feedItemId = props.router.params.feedItemId;
    const highlightId = props.router.params.highlightCommentId;

    const client = getClient();
    const messenger = getMessenger();
    const theme = React.useContext(ThemeContext);
    const itemSrc = client.useFeedItem({ id: feedItemId }, { fetchPolicy: 'cache-and-network' }).item;

    if (!itemSrc || itemSrc.__typename !== 'FeedPost') {
        return null;
    }

    const item = React.useMemo(() => convertPost(itemSrc, messenger.engine), [itemSrc]);
    const { author, date, slides } = item;
    const width = Dimensions.get('screen').width;
    const [currentSlide, setCurreentSlide] = React.useState(0);

    const peerView = (
        <View paddingTop={8}>
            <FeedPostContent
                post={item}
                width={width}
                onSlideChange={i => setCurreentSlide(i)}
            />
            <FeedPostTools item={item} />
        </View>
    );

    return (
        <SDeferred>
            <SHeaderView>
                <AuthorHeader author={author} date={date} />
            </SHeaderView>

            {slides.length > 1 && (
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
            />
        </SDeferred>
    );
});

export const FeedItem = withApp(FeedItemComponent, { navigationAppearance: 'small' });

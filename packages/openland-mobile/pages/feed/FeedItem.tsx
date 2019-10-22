import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { EntityHeader } from 'openland-mobile/pages/main/components/EntityHeader';
import { FeedPostContent } from 'openland-mobile/feed/content/FeedPostContent';
import { convertPost } from 'openland-engines/feed/convert';
import { Dimensions, View, TouchableWithoutFeedback } from 'react-native';
import { FeedPostTools } from 'openland-mobile/feed/components/FeedPostTools';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { CommentsWrapper } from '../main/components/comments/CommentsWrapper';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SHeaderIndicator } from 'react-native-s/SHeaderIndicator';
import { isPad } from '../Root';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const getWidth = () => {
    const screenWidth = Dimensions.get('screen').width;
    let deltaWidth = 0;

    if (isPad && screenWidth > 375 * 2) {
        deltaWidth = screenWidth > 1000 ? 375 : 320;
    }

    return screenWidth - deltaWidth;
};

const FeedItemComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { feedItemId, highlightId } = router.params;

    const client = getClient();
    const messenger = getMessenger();
    const theme = React.useContext(ThemeContext);
    const itemSrc = client.useFeedItem({ id: feedItemId }, { fetchPolicy: 'cache-and-network' }).item;

    if (!itemSrc || itemSrc.__typename !== 'FeedPost') {
        return null;
    }

    const item = React.useMemo(() => convertPost(itemSrc, messenger.engine), [itemSrc]);
    const { id, canEdit, author, source, date, slides } = item;
    const width = getWidth();
    const [currentSlide, setCurreentSlide] = React.useState(0);

    const handleLongPress = React.useCallback(() => {
        FeedHandlers.Manage(id, canEdit, true);
    }, [id, canEdit]);

    const peerView = (
        <View paddingTop={8}>
            <TouchableWithoutFeedback onLongPress={handleLongPress}>
                <View>
                    <FeedPostContent
                        post={item}
                        width={width}
                        onLongPress={handleLongPress}
                        onSlideChange={i => setCurreentSlide(i)}
                    />
                </View>
            </TouchableWithoutFeedback>

            <FeedPostTools item={item} />
        </View>
    );

    const handleAuthorPress = React.useCallback(() => {
        if (source) {
            const builder = new ActionSheetBuilder();

            builder.view(ctx => (
                <ZListItem
                    text={source.title}
                    subTitle="Channel"
                    leftAvatar={{ photo: source.photo, key: source.id, title: source.title }}
                    onPress={() => {
                        ctx.hide();

                        router.push('FeedChannel', { id: source.id });
                    }}
                />
            ));

            builder.view(ctx => (
                <ZListItem
                    text={author.name}
                    subTitle="Author"
                    leftAvatar={{ photo: author.photo, key: author.id, title: author.name }}
                    onPress={() => {
                        ctx.hide();

                        router.push('ProfileUser', { id: author.id });
                    }}
                />
            ));

            builder.show();
        } else {
            router.push('ProfileUser', { id: author.id });
        }
    }, [author]);

    const avatarEntity = source || author;
    const title = source ? source.title : author.name;
    const subtitle = source ? author.name : undefined;

    return (
        <>
            <SHeaderView>
                <EntityHeader
                    avatar={{
                        photo: avatarEntity.photo,
                        id: avatarEntity.id,
                        title
                    }}
                    title={title}
                    subtitle={formatDate(date) + (subtitle ? ' · ' + subtitle : '')}
                    onPress={handleAuthorPress}
                />
            </SHeaderView>

            {slides.length > 1 && (
                <SHeaderIndicator
                    key={`indicator-${currentSlide}-${theme.accentType}`}
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
        </>
    );
});

export const FeedItem = withApp(FeedItemComponent, { navigationAppearance: 'small' });

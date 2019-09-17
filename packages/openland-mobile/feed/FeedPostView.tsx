import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { Dimensions, View, StyleSheet, ViewStyle, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FeedItemShadow } from './FeedItemShadow';
import { FeedMeta } from './components/FeedMeta';
import { FeedSlide } from './content/FeedSlide';
import { FeedUnsupportedContent } from './content/FeedUnsupportedContent';
import { FeedSwipeHandler } from './FeedSwipeHandler';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import Alert from 'openland-mobile/components/AlertBlanket';

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    } as ViewStyle,
    wrapper: {
        flexGrow: 1,
        alignSelf: 'stretch'
    } as ViewStyle,
    paginator: {
        position: 'absolute',
        top: 0, bottom: 0,
        width: '33%',
        zIndex: 2,
    } as ViewStyle
});

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
    scrollRef: React.RefObject<ScrollView>;
}

export const FeedPostView = React.memo((props: FeedPostViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { item, scrollRef } = props;
    const { id, author, slides, canEdit } = item;

    const [currentSlide, setCurreentSlide] = React.useState(0);
    const handleLike = React.useCallback(() => {
        console.warn('boom handleLike');
    }, []);

    const handleShare = React.useCallback(() => {
        console.warn('boom handleShare');
    }, []);

    const handlePrevPress = React.useCallback(() => {
        setCurreentSlide(prev => prev - 1);
    }, []);

    const handleNextPress = React.useCallback(() => {
        setCurreentSlide(prev => prev + 1);
    }, []);

    const handlePress = React.useCallback(() => {
        console.warn('boom handlePostPress');
    }, []);

    const handleLongPress = React.useCallback(() => {
        const client = getClient();
        const builder = new ActionSheetBuilder();

        builder.action('Share', () => {
            handleShare();
        }, false, require('assets/ic-share-24.png'));

        if (canEdit) {
            builder.action('Edit', () => {
                console.warn('boom edit post');
            }, false, require('assets/ic-edit-24.png'));

            builder.action('Unpublish', () => {
                console.warn('boom unpublish post');
            }, false, require('assets/ic-refresh-24.png'));

            builder.action('Delete', async () => {
                Alert.builder()
                    .title('Delete post')
                    .message('Delete this post for everyone? This cannot be undone.')
                    .button('Cancel', 'cancel')
                    .action('Delete', 'destructive', async () => {
                        await client.mutateFeedDeletePost({ feedItemId: id });
                    }).show();
            }, false, require('assets/ic-delete-24.png'));
        } else {
            builder.action('Report', () => {
                console.warn('boom report post');
            }, false, require('assets/ic-info-24.png'));
        }

        builder.show(true);
    }, []);

    const width = Dimensions.get('screen').width;
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    let metaStyle: 'default' | 'media' = 'default';

    if (slides.length && slides[currentSlide].coverAlign && (slides[currentSlide].coverAlign === 'Top' || slides[currentSlide].coverAlign === 'Cover')) {
        metaStyle = 'media';
    }

    return (
        <FeedSwipeHandler
            id={id}
            theme={theme}
            onLeftSwiped={handleLike}
            onRightSwiped={handleShare}
            scrollRef={scrollRef}
        >
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongPress}>
                    <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>

                        {slides.length > 0 && (
                            <>
                                <FeedMeta
                                    author={author}
                                    style={metaStyle}
                                    currentSlide={currentSlide + 1}
                                    slidesCount={slides.length}
                                />

                                <View style={styles.wrapper}>
                                    <FeedSlide slide={slides[currentSlide]} />

                                    {currentSlide > 0 && (
                                        <TouchableWithoutFeedback onPress={handlePrevPress} onLongPress={handleLongPress}>
                                            <View style={[styles.paginator, { left: 0 }]} />
                                        </TouchableWithoutFeedback>
                                    )}

                                    {currentSlide < slides.length - 1 && (
                                        <TouchableWithoutFeedback onPress={handleNextPress} onLongPress={handleLongPress}>
                                            <View style={[styles.paginator, { right: 0 }]} />
                                        </TouchableWithoutFeedback>
                                    )}
                                </View>
                            </>
                        )}

                        {slides.length <= 0 && (
                            <>
                                <FeedMeta
                                    author={author}
                                    style={metaStyle}
                                />

                                <FeedUnsupportedContent />
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </FeedSwipeHandler>
    );
});
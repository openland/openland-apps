import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { Dimensions, View, StyleSheet, ViewStyle, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FeedItemShadow } from './FeedItemShadow';
import { FeedSwipeHandler } from './FeedSwipeHandler';
import { FeedHandlers } from './FeedHandlers';
import { FeedPostContent } from './content/FeedPostContent';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { FeedMeta } from './components/FeedMeta';

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        overflow: 'hidden'
    } as ViewStyle,
});

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
    scrollRef?: React.RefObject<ScrollView>;
    authorOnly?: boolean;
}

export const FeedPostView = React.memo((props: FeedPostViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { item, scrollRef, authorOnly } = props;
    const { id, author, source, slides, canEdit } = item;
    const [currentSlide, setCurreentSlide] = React.useState(0);

    const handlePress = React.useCallback(() => {
        FeedHandlers.Open(id);
    }, [id]);

    const handleLongPress = React.useCallback(() => {
        FeedHandlers.Manage(id, canEdit, true);
    }, [id, canEdit]);

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
            onLeftSwiped={() => FeedHandlers.Like(item)}
            onRightSwiped={() => FeedHandlers.Forward(id)}
            leftIcon={require('assets/ic-like-24.png')}
            rightIcon={require('assets/ic-forward-24.png')}
            leftColor={theme.backgroundTertiary}
            rightColor={theme.backgroundTertiary}
            leftColorSwiped={theme.accentNegative}
            rightColorSwiped={theme.accentPositive}
            scrollRef={scrollRef}
            enabled={false}
        >
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongPress}>
                    <View style={styles.container}>
                        <View
                            backgroundColor={theme.backgroundSecondary}
                            style={{
                                position: 'absolute',
                                left: 0, right: 0, bottom: 0, top: 0
                            }}
                        />
                        <FeedMeta
                            author={author}
                            source={authorOnly ? undefined : source}
                            style={metaStyle}
                            currentSlide={currentSlide + 1}
                            slidesCount={slides.length}
                            width={containerWidth}
                        />
                        <FeedPostContent
                            post={item}
                            width={containerWidth}
                            onLongPress={handleLongPress}
                            onSlideChange={i => setCurreentSlide(i)}
                            wrapped={true}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </FeedSwipeHandler>
    );
});
import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedPostItem } from 'openland-engines/feed/FeedEngine';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { Dimensions, View, Text, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { FeedItemShadow } from './FeedItemShadow';
import { FeedAuthorView } from './content/FeedAuthorView';
import { FeedSwipeView } from './FeedSwipeView';

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
    meta: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as ViewStyle,
});

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
    scrollRef: React.RefObject<ScrollView>;
}

export const FeedPostView = React.memo((props: FeedPostViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { item, scrollRef } = props;
    const { id, author, text } = item;

    const onLeftSwiped = React.useCallback(() => {
        console.warn('boom onLeftSwiped');
    }, []);

    const onRightSwiped = React.useCallback(() => {
        console.warn('boom onRightSwiped');
    }, []);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    return (
        <FeedSwipeView
            id={id}
            theme={theme}
            onLeftSwiped={onLeftSwiped}
            onRightSwiped={onRightSwiped}
            scrollRef={scrollRef}
        >
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <View style={styles.meta}>
                        <FeedAuthorView author={author} style="default" />
                    </View>

                    <Text style={{ ...TextStyles.Title1, color: theme.foregroundPrimary, padding: 16, textAlign: 'center' }} allowFontScaling={false}>
                        {text || id}
                    </Text>
                </View>
            </View>
        </FeedSwipeView>
    );
});
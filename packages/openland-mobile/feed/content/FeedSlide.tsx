import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
});

interface FeedSlideProps {
    slide: SlideProcessed;
}

export const FeedTextSlide = React.memo((props: FeedSlideProps) => {
    const { text } = props.slide;

    return (
        <View style={styles.box}>
            <Text>
                {text}
            </Text>
        </View>
    );
});

export const FeedSlide = React.memo((props: FeedSlideProps) => {
    const { slide } = props;

    if (slide.__typename === 'TextSlide') {
        return <FeedTextSlide {...props} />;
    }

    return null;
});
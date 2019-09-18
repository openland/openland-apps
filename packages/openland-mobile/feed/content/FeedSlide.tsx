import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 16,
        flexGrow: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    } as ViewStyle,
    textLarge: {
        ...TextStyles.Post1
    } as TextStyle,
    textMedium: {
        ...TextStyles.Post2
    } as TextStyle,
    text: {
        ...TextStyles.Body
    } as TextStyle,
});

interface FeedSlideProps {
    slide: SlideProcessed;
}

export const FeedTextSlide = React.memo((props: FeedSlideProps) => {
    const theme = React.useContext(ThemeContext);
    const { text } = props.slide;
    const textStyle = text.length < 200 ? (text.length < 100 ? styles.textLarge : styles.textMedium) : styles.text;

    return (
        <View style={styles.box}>
            <Text style={[textStyle, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
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
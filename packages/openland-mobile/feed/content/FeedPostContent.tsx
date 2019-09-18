import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedSlide } from './FeedSlide';
import { FeedUnsupportedContent } from './FeedUnsupportedContent';

const styles = StyleSheet.create({
    container: {
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

interface FeedPostContentProps {
    width: number;
    slides: SlideProcessed[];
    borderRadius?: number;
    onLongPress?: () => void;
    onSlideChange?: (index: number) => void;
}

export const FeedPostContent = React.memo((props: FeedPostContentProps) => {
    const theme = React.useContext(ThemeContext);
    const { width, slides, borderRadius, onLongPress, onSlideChange } = props;

    const [currentSlide, setCurreentSlide] = React.useState(0);
    const handlePrevPress = React.useCallback(() => {
        setCurreentSlide(prev => {
            if (onSlideChange) {
                onSlideChange(prev - 1);
            }

            return prev - 1;
        });
    }, []);

    const handleNextPress = React.useCallback(() => {
        setCurreentSlide(prev => {
            if (onSlideChange) {
                onSlideChange(prev + 1);
            }

            return prev + 1;
        });
    }, []);

    const height = width * (4 / 3);

    return (
        <View style={[styles.container, { width, height, backgroundColor: theme.backgroundSecondary, borderRadius }]}>
            {slides.length > 0 && (
                <View style={styles.wrapper}>
                    <FeedSlide slide={slides[currentSlide]} />

                    {currentSlide > 0 && (
                        <TouchableWithoutFeedback onPress={handlePrevPress} onLongPress={onLongPress}>
                            <View style={[styles.paginator, { left: 0 }]} />
                        </TouchableWithoutFeedback>
                    )}

                    {currentSlide < slides.length - 1 && (
                        <TouchableWithoutFeedback onPress={handleNextPress} onLongPress={onLongPress}>
                            <View style={[styles.paginator, { right: 0 }]} />
                        </TouchableWithoutFeedback>
                    )}
                </View>
            )}

            {slides.length <= 0 && <FeedUnsupportedContent />}
        </View>
    );
});
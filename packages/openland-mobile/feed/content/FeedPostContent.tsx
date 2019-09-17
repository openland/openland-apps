import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedMeta } from '../components/FeedMeta';
import { FeedItemFull_author } from 'openland-api/Types';
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
    author?: FeedItemFull_author;
    onLongPress?: () => void;
}

export const FeedPostContent = React.memo((props: FeedPostContentProps) => {
    const theme = React.useContext(ThemeContext);
    const { width, slides, author, borderRadius, onLongPress } = props;

    const [currentSlide, setCurreentSlide] = React.useState(0);
    const handlePrevPress = React.useCallback(() => {
        setCurreentSlide(prev => prev - 1);
    }, []);

    const handleNextPress = React.useCallback(() => {
        setCurreentSlide(prev => prev + 1);
    }, []);

    const height = width * (4 / 3);
    let metaStyle: 'default' | 'media' = 'default';

    if (slides.length && slides[currentSlide].coverAlign && (slides[currentSlide].coverAlign === 'Top' || slides[currentSlide].coverAlign === 'Cover')) {
        metaStyle = 'media';
    }

    return (
        <View style={[styles.container, { width, height, backgroundColor: theme.backgroundSecondary, borderRadius }]}>
            {slides.length > 0 && (
                <>
                    {!!author && (
                        <FeedMeta
                            author={author}
                            style={metaStyle}
                            currentSlide={currentSlide + 1}
                            slidesCount={slides.length}
                        />
                    )}

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
                </>
            )}

            {slides.length <= 0 && (
                <>
                    {!!author && (
                        <FeedMeta
                            author={author}
                            style={metaStyle}
                        />
                    )}

                    <FeedUnsupportedContent />
                </>
            )}
        </View>
    )
});
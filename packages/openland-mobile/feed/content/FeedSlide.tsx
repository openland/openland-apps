import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import FastImage from 'react-native-fast-image';
import { SAnimatedView } from 'react-native-s/SAnimatedView';
import { SAnimated } from 'react-native-s/SAnimated';
import { SlideCoverAlign } from 'openland-api/Types';
import { renderPreprocessedText } from 'openland-mobile/components/message/renderPreprocessedText';
import { getMessenger } from 'openland-mobile/utils/messenger';

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    } as ViewStyle,
    textLarge: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        ...TextStyles.Post1
    } as TextStyle,
    textMedium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        ...TextStyles.Post2
    } as TextStyle,
    text: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        ...TextStyles.Body
    } as TextStyle,
    coverWrapper: {
        flexGrow: 1,
    } as ViewStyle,
    cover: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    } as ViewStyle,
    coverLoader: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    textBoxCover: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        zIndex: 3,
        justifyContent: 'center'
    } as ViewStyle,
});

interface FeedSlideProps {
    slide: SlideProcessed;
    wrapped?: boolean;
}

export const FeedTextSlide = React.memo((props: FeedSlideProps) => {
    const theme = React.useContext(ThemeContext);
    const messenger = getMessenger();
    const { slide, wrapped } = props;
    const { id, text, cover, coverAlign, textSpans } = slide;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    const coverViewKey = React.useMemo(() => id + '-cover', [id]);

    const handleCoverLoad = React.useCallback(() => {
        SAnimated.beginTransaction();
        SAnimated.timing(coverViewKey, {
            property: 'opacity',
            from: 0,
            to: 1,
            duration: 0.15
        });
        SAnimated.commitTransaction();
    }, [coverViewKey]);

    React.useEffect(() => {
        if (cover) {
            const optimalSize = null;

            if (cover.metadata && cover.metadata.imageWidth && cover.metadata.imageHeight) {
                layoutMedia(cover.metadata.imageWidth, cover.metadata.imageHeight, 1024, 1024);
            }

            DownloadManagerInstance.watch(cover.url, optimalSize, setDownloadState);
        }
    }, [cover]);

    const textCover = coverAlign && coverAlign === SlideCoverAlign.Cover;
    const textStyle = (!cover || textCover) ? (text.length < 200 ? (text.length < 100 ? styles.textLarge : styles.textMedium) : styles.text) : styles.text;

    const renderText = React.useMemo(() => renderPreprocessedText(textSpans, messenger.handleUserClick, messenger.handleGroupClick, theme), [textSpans, theme]);

    return (
        <View style={styles.box}>
            {!!text && coverAlign && coverAlign === SlideCoverAlign.Bottom && (
                <Text style={[textStyle, { color: theme.foregroundPrimary, paddingTop: wrapped ? 48 : 0 }]} allowFontScaling={false}>
                    {renderText}
                </Text>
            )}

            {cover && (
                <View style={[styles.coverWrapper, { backgroundColor: theme.backgroundTertiary }]}>
                    <View style={styles.coverLoader}>
                        <LoaderSpinner />
                    </View>

                    {downloadState && downloadState.path && (
                        <SAnimatedView name={coverViewKey} style={[styles.cover, { backgroundColor: theme.overlayMedium, opacity: 0 }]}>
                            <FastImage
                                resizeMode="cover"
                                style={{ width: '100%', flexGrow: 1 }}
                                source={{ uri: downloadState.path, priority: 'normal', ...{ disableAnimations: true } as any }}
                                onLoad={handleCoverLoad}
                            />
                        </SAnimatedView>
                    )}
                </View>
            )}

            {!!text && textCover && (
                <View style={[styles.textBoxCover, { backgroundColor: theme.overlayMedium, paddingVertical: wrapped ? 56 : 16 }]}>
                    <Text style={[textStyle, { color: theme.foregroundContrast }]} allowFontScaling={false}>
                        {renderText}
                    </Text>
                </View>
            )}

            {!!text && (!coverAlign || coverAlign === SlideCoverAlign.Top) && (
                <Text style={[textStyle, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                    {renderText}
                </Text>
            )}
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
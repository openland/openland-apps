import * as React from 'react';
import { SlideProcessed } from 'openland-engines/feed/types';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import FastImage from 'react-native-fast-image';
import { SAnimatedView } from 'react-native-s/SAnimatedView';
import { SAnimated } from 'react-native-s/SAnimated';
import { SlideCoverAlign } from 'openland-api/Types';
import { renderPreprocessedText } from 'openland-mobile/components/message/renderPreprocessedText';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FeedSlideAttachment } from './FeedSlideAttachment';
import { WatchSubscription } from 'openland-y-utils/Watcher';

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
    const { id, text, cover, coverAlign, textSpans, attachments } = slide;
    const [coverPath, setCoverPath] = React.useState<string | undefined>(undefined);

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
        let downloadManager: WatchSubscription | undefined = undefined;

        if (cover && !coverPath) {
            const optimalSize = null;

            if (cover.metadata && cover.metadata.imageWidth && cover.metadata.imageHeight) {
                layoutMedia(cover.metadata.imageWidth, cover.metadata.imageHeight, 1024, 1024);
            }

            downloadManager = DownloadManagerInstance.watch(cover.url, optimalSize, state => {
                if (state.path) {
                    setCoverPath((Platform.OS === 'android' ? 'file://' : '') + state.path);
                    handleCoverLoad();
                }
            });
        }

        return () => {
            if (downloadManager) {
                downloadManager();
            }
        };
    }, [cover, coverPath, handleCoverLoad]);

    const textCover = coverAlign && coverAlign === SlideCoverAlign.Cover;
    const textCanBeDynamic = (!cover || textCover) && !attachments.length;
    const textStyle = textCanBeDynamic ? (text.length < 200 ? (text.length < 100 ? styles.textLarge : styles.textMedium) : styles.text) : styles.text;

    const renderText = React.useMemo(() => renderPreprocessedText(textSpans, messenger.handleUserClick, messenger.handleGroupClick, theme), [textSpans, theme]);

    return (
        <View style={styles.box}>
            {text.length > 0 && ((coverAlign && coverAlign === SlideCoverAlign.Bottom) || attachments.length > 0) && (
                <Text style={[textStyle, { color: theme.foregroundPrimary, paddingTop: wrapped ? 48 : 16 }]} allowFontScaling={false}>
                    {renderText}
                </Text>
            )}

            {cover && (
                <View style={[styles.coverWrapper, { backgroundColor: theme.backgroundTertiary }]}>
                    <View style={styles.coverLoader}>
                        <LoaderSpinner />
                    </View>

                    {!!coverPath && coverPath.length > 0 && (
                        <SAnimatedView name={coverViewKey} style={[styles.cover, { backgroundColor: theme.overlayMedium, opacity: 0 }]}>
                            <FastImage
                                resizeMode="cover"
                                style={{ width: '100%', flexGrow: 1 }}
                                source={{ uri: coverPath, priority: 'normal', ...{ disableAnimations: true } as any }}
                            />
                        </SAnimatedView>
                    )}
                </View>
            )}

            {text.length > 0 && textCover && (
                <View style={[styles.textBoxCover, { backgroundColor: theme.overlayMedium, paddingVertical: wrapped ? 56 : 16 }]}>
                    <Text style={[textStyle, { color: theme.foregroundContrast }]} allowFontScaling={false}>
                        {renderText}
                    </Text>
                </View>
            )}

            {text.length > 0 && !attachments.length && (!coverAlign || coverAlign === SlideCoverAlign.Top) && (
                <Text style={[textStyle, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                    {renderText}
                </Text>
            )}

            {attachments.length > 0 && <FeedSlideAttachment attachment={attachments[0]} withText={text.length > 0} />}
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
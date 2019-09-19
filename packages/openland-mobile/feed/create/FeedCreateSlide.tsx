import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from '../FeedItemShadow';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { SlideInput, SlideCoverAlign } from 'openland-api/Types';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker from 'react-native-image-picker';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import Toast from 'openland-mobile/components/Toast';
import LinearGradient from 'react-native-linear-gradient';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        overflow: 'hidden',
    } as ViewStyle,
    tools: {
        position: 'absolute',
        left: 0, right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        height: 56,
        zIndex: 2
    } as ViewStyle,
    author: {
        height: 48,
        flexGrow: 1,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center'
    } as ViewStyle,
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12
    } as ViewStyle,
    authorName: {
        width: 120,
        height: 8,
        marginLeft: 8,
        borderRadius: 4
    } as ViewStyle,
    inputContainer: {
        justifyContent: 'center',
        flexGrow: 1,
    } as ViewStyle,
    input: {
        paddingHorizontal: 16,
        fontSize: 24,
        lineHeight: 36,
    } as TextStyle,
    coverWrapper: {
        flexGrow: 1,
    } as ViewStyle,
    coverLoader: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle
});

interface FeedCreateSlideProps {
    slide: SlideInput;
    index: number;
    onChangeText: (text: string) => void;
    onChangeCover: (uuid: string, width: number, height: number) => void;
    onChangeCoverAlign: (align: SlideCoverAlign) => void;
    onDelete?: () => void;
}

const ToolsContainer = React.memo((props: { align: 'top' | 'bottom', style: 'contrast' | 'default', children: any }) => {
    const { align, style, children } = props;
    const styleObject = [styles.tools, { top: align === 'top' ? 0 : undefined, bottom: align === 'bottom' ? 0 : undefined }];

    if (style === 'contrast') {
        if (align === 'top') {
            return (
                <LinearGradient colors={['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)']} style={styleObject}>
                    {children}
                </LinearGradient>
            );
        }

        return (
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)']} style={styleObject}>
                {children}
            </LinearGradient>
        );
    }

    return (
        <View style={styleObject}>
            {children}
        </View>
    );
});

export const FeedCreateSlide = React.memo((props: FeedCreateSlideProps) => {
    const { slide, onChangeText, onChangeCover, onChangeCoverAlign, onDelete } = props;
    const { text, coverAlign } = slide;
    const theme = React.useContext(ThemeContext);
    const textInputRef = React.useRef<TextInput>(null);
    const [coverLocalPath, setCoverLocalPath] = React.useState<string | undefined>(undefined);
    const [coverLoading, setCoverLoading] = React.useState(false);

    const handlePressSlide = React.useCallback(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    const handleDeleteSlide = React.useCallback(() => {
        if (onDelete) {
            if (text && text.length > 0) {
                AlertBlanket.builder()
                    .title('Delete slide')
                    .message('Delete this slide? This cannot be undone.')
                    .button('Cancel', 'cancel')
                    .action('Delete', 'destructive', () => {
                        onDelete();
                    }).show();
            } else {
                onDelete();
            }
        }
    }, [onDelete, text]);

    const handleAttachMediaPress = React.useCallback(async () => {
        if (await checkPermissions('gallery')) {
            Picker.launchImageLibrary(
                {
                    quality: 1,
                    mediaType: 'photo'
                },
                (response) => {
                    if (response.error) {
                        handlePermissionDismiss('gallery');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }

                    setCoverLoading(true);
                    setCoverLocalPath(response.uri);
                    onChangeCoverAlign(text && text.length > 0 ? SlideCoverAlign.Top : SlideCoverAlign.Cover);

                    UploadManagerInstance.registerSimpleUpload(
                        'image.jpg',
                        response.uri,
                        {
                            onProgress: (progress: number) => {
                                // temp ignore
                            },
                            onDone: (uuid) => {
                                setCoverLoading(false);
                                onChangeCover(uuid, response.width, response.height);
                            },
                            onFail: () => {
                                setCoverLoading(false);
                                setCoverLocalPath(undefined);

                                Toast.failure({ text: 'Error while uploading photo', duration: 1000 }).show();
                            }
                        },
                        response.fileSize
                    );
                }
            );
        }
    }, [text]);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    const showCover = (coverLocalPath || coverLoading);

    const headerStyle = showCover && (coverAlign === SlideCoverAlign.Cover || coverAlign === SlideCoverAlign.Top) ? 'contrast' : 'default';
    const footerStyle = showCover && (coverAlign === SlideCoverAlign.Cover || coverAlign === SlideCoverAlign.Bottom) ? 'contrast' : 'default';

    return (
        <TouchableWithoutFeedback onPress={handlePressSlide}>
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <ToolsContainer style={headerStyle} align="top">
                        <View style={styles.author} opacity={headerStyle === 'contrast' ? 0.56 : 1}>
                            <View style={[styles.authorAvatar, { backgroundColor: theme.backgroundTertiary }]} />
                            <View style={[styles.authorName, { backgroundColor: theme.backgroundTertiary }]} />
                        </View>

                        {!!onDelete && <ZIconButton src={require('assets/ic-delete-24.png')} style={headerStyle} onPress={handleDeleteSlide} />}
                    </ToolsContainer>

                    {showCover && (
                        <View style={[styles.coverWrapper, { backgroundColor: theme.backgroundTertiary }]}>
                            <FastImage
                                resizeMode="cover"
                                style={{ width: '100%', flexGrow: 1 }}
                                source={{ uri: coverLocalPath, priority: 'normal', ...{ disableAnimations: true } as any }}
                            />

                            {coverLoading && (
                                <View style={[styles.coverLoader, { backgroundColor: theme.overlayMedium }]}>
                                    <LoaderSpinner />
                                </View>
                            )}
                        </View>
                    )}

                    {!(showCover && coverAlign === SlideCoverAlign.Cover) && (
                        <View style={styles.inputContainer}>
                            {typeof text === 'string' && (
                                <TextInput
                                    ref={textInputRef}
                                    onChangeText={onChangeText}
                                    value={text}
                                    multiline={true}
                                    style={[styles.input, { color: theme.foregroundPrimary }]}
                                    placeholder="Enter text"
                                    placeholderTextColor={theme.foregroundTertiary}
                                    keyboardAppearance={theme.keyboardAppearance}
                                    allowFontScaling={false}
                                    {...{ scrollEnabled: false }}
                                />
                            )}
                        </View>
                    )}

                    <ToolsContainer style={footerStyle} align="bottom">
                        {!showCover && <ZIconButton src={require('assets/ic-gallery-24.png')} style={headerStyle} onPress={handleAttachMediaPress} />}
                        {/* <ZIconButton src={require('assets/ic-at-24.png')} /> */}
                    </ToolsContainer>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});
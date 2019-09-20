import * as React from 'react';
import { View, StyleSheet, TextInput, Dimensions, ViewStyle, TextStyle, TouchableWithoutFeedback, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FeedItemShadow } from '../FeedItemShadow';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { SlideInput, SlideCoverAlign, ImageRefInput } from 'openland-api/Types';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import Picker from 'react-native-image-picker';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import Toast from 'openland-mobile/components/Toast';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import FastImage from 'react-native-fast-image';
import { FeedCreateAddText } from './FeedCreateAddText';
import { FeedCreateTools } from './FeedCreateTools';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

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
    author: {
        height: 48,
        flexGrow: 1,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
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
    inputBox: {
        paddingVertical: 16,
        justifyContent: 'center',
    } as ViewStyle,
    inputBoxLarge: {
        paddingVertical: 10,
    } as ViewStyle,
    inputBoxMedium: {
        paddingVertical: 12,
    } as ViewStyle,
    input: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 16,
    } as TextStyle,
    coverWrapper: {
        flexGrow: 1,
    } as ViewStyle,
    coverLoader: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    alignContainer: {
        width: 114,
        alignItems: 'center',
        paddingBottom: 16
    } as ViewStyle,
});

const SUPPORTED_COVER_ALIGN: ({ align: SlideCoverAlign, icon: NodeRequire })[] = [{
    align: SlideCoverAlign.Top,
    icon: require('assets/feed/ic-layout-top-80.png')
}, {
    align: SlideCoverAlign.Bottom,
    icon: require('assets/feed/ic-layout-bottom-80.png')
}];

interface FeedCreateSlideProps {
    slide: SlideInput;
    index: number;
    onChangeText: (text: string) => void;
    onChangeCover: (cover?: ImageRefInput) => void;
    onChangeCoverAlign: (align: SlideCoverAlign) => void;
    onDelete?: () => void;
}

export const FeedCreateSlide = React.memo((props: FeedCreateSlideProps) => {
    const { slide, onChangeText, onChangeCover, onChangeCoverAlign, onDelete } = props;
    const { text, coverAlign } = slide;
    const theme = React.useContext(ThemeContext);
    const textInputRef = React.createRef<TextInput>();
    const [coverLocalPath, setCoverLocalPath] = React.useState<string | undefined>(undefined);
    const [coverLoading, setCoverLoading] = React.useState(false);

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

    const handleAddTextPress = React.useCallback(() => {
        onChangeText('');
        onChangeCoverAlign(SlideCoverAlign.Top);

        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [textInputRef.current]);

    const handleAttachMediaPress = React.useCallback(async (oldCoverAlign?: SlideCoverAlign | null) => {
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
                    onChangeCoverAlign(oldCoverAlign || (text && text.length > 0 ? SlideCoverAlign.Top : SlideCoverAlign.Cover));

                    UploadManagerInstance.registerSimpleUpload(
                        'image.jpg',
                        response.uri,
                        {
                            onProgress: (progress: number) => {
                                // temp ignore
                            },
                            onDone: (uuid) => {
                                setCoverLoading(false);
                                onChangeCover({ uuid, crop: { x: 0, y: 0, w: response.width, h: response.height } });
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

    const handleCoverPress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action('Change photo', () => {
            handleAttachMediaPress(coverAlign);
        }, false, require('assets/ic-edit-24.png'));

        builder.action('Delete photo', () => {
            setCoverLoading(false);
            setCoverLocalPath(undefined);
            onChangeCover();
        }, false, require('assets/ic-delete-24.png'));

        builder.show();
    }, [coverAlign]);

    const handleChangeLayout = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.title('Choose layout');
        builder.view(ctx => (
            <View flexDirection="row" justifyContent="center">
                {SUPPORTED_COVER_ALIGN.map((item, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => { onChangeCoverAlign(item.align); ctx.hide(); }}>
                        <View style={styles.alignContainer}>
                            <Image source={item.icon} style={{ width: 80, height: 106, tintColor: coverAlign === item.align ? theme.accentPrimary : theme.backgroundTertiary }} />
                            <View marginTop={17} width={22} height={22} borderRadius={11} borderWidth={coverAlign === item.align ? 7.5 : 2} borderColor={coverAlign === item.align ? theme.accentPrimary : theme.backgroundTertiary} />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        ));

        builder.show();
    }, [coverAlign]);

    const width = Math.min(Dimensions.get('screen').width, 414);
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    const showCover = (coverLocalPath || coverLoading);
    const canAddText = showCover && typeof text !== 'string';

    const headerStyle = showCover && (coverAlign === SlideCoverAlign.Cover || coverAlign === SlideCoverAlign.Top) ? 'contrast' : 'default';
    const footerStyle = showCover && (coverAlign === SlideCoverAlign.Cover || coverAlign === SlideCoverAlign.Bottom) ? 'contrast' : 'default';
    const authorStyles = {
        backgroundColor: theme.type === 'Dark' ? theme.foregroundContrast : theme.backgroundTertiary,
        opacity: theme.type === 'Dark' ? 0.56 : (headerStyle === 'contrast' ? 0.56 : 1)
    } as ViewStyle;

    let inputTextStyle = TextStyles.Body;
    let inputBoxStyle = [styles.inputBox];

    if (!showCover) {
        if (!text) {
            inputTextStyle = TextStyles.Post1;
            inputBoxStyle = [styles.inputBox, styles.inputBoxLarge];
        } else if (!text || text.length < 200) {
            if (text.length < 100) {
                inputTextStyle = TextStyles.Post1;
                inputBoxStyle = [styles.inputBox, styles.inputBoxLarge];
            } else {
                inputTextStyle = TextStyles.Post2;
                inputBoxStyle = [styles.inputBox, styles.inputBoxMedium];
            }
        }
    }

    const input = (
        <View
            style={[...inputBoxStyle, {
                flexGrow: !showCover ? 1 : undefined,
                paddingTop: !canAddText && coverAlign && coverAlign === SlideCoverAlign.Bottom ? 48 : undefined
            }]}
        >
            <TextInput
                ref={textInputRef}
                onChangeText={onChangeText}
                value={text || ''}
                multiline={true}
                style={[styles.input, inputTextStyle, { color: theme.foregroundPrimary }]}
                placeholder="Enter text"
                placeholderTextColor={theme.foregroundTertiary}
                keyboardAppearance={theme.keyboardAppearance}
                allowFontScaling={false}
                {...{ scrollEnabled: false }}
            />
        </View>
    );

    return (
        <View style={styles.box}>
            <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

            <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                <FeedCreateTools style={headerStyle} align="top">
                    <View style={styles.author}>
                        <View style={[styles.authorAvatar, authorStyles]} />
                        <View style={[styles.authorName, authorStyles]} />
                    </View>

                    {showCover && !canAddText && <ZIconButton src={require('assets/ic-layout-24.png')} style={headerStyle} onPress={handleChangeLayout} />}
                    {!!onDelete && <ZIconButton src={require('assets/ic-delete-24.png')} style={headerStyle} onPress={handleDeleteSlide} />}
                </FeedCreateTools>

                {!canAddText && coverAlign && coverAlign === SlideCoverAlign.Bottom && input}

                {showCover && (
                    <TouchableWithoutFeedback onPress={handleCoverPress}>
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
                    </TouchableWithoutFeedback>
                )}

                {!canAddText && (!coverAlign || coverAlign !== SlideCoverAlign.Bottom) && input}

                {(!showCover || canAddText) && (
                    <FeedCreateTools style={footerStyle} align="bottom">
                        {!showCover && <ZIconButton src={require('assets/ic-gallery-24.png')} style={headerStyle} onPress={() => handleAttachMediaPress()} />}
                        {canAddText && <FeedCreateAddText onPress={handleAddTextPress} />}
                    </FeedCreateTools>
                )}
            </View>
        </View>
    );
});
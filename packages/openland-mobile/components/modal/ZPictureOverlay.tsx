import * as React from 'react';
import { View, Animated, Dimensions, Platform, BackHandler, Text } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { SDevice } from 'react-native-s/SDevice';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { FastImageViewer } from 'react-native-s/FastImageViewer';
import { SShareButton } from 'react-native-s/SShareButton';
import { ActionSheetBuilder } from '../ActionSheet';
import Share from 'react-native-share';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { ZImage } from '../ZImage';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, SecondarinessAlpha } from 'openland-mobile/styles/AppStyles';
import Toast from '../Toast';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';

export const ZPictureOverlay = XMemo<{ config: ZPictureTransitionConfig, onClose: () => void }>((props) => {
    let theme = React.useContext(ThemeContext);

    let ref = React.createRef<FastImageViewer>();

    let progress = React.useRef(new Animated.Value(0)).current;
    let progressLinear = React.useRef(new Animated.Value(0)).current;
    let barOpacity = React.useRef(new Animated.Value(1)).current;
    let barVisible = true;

    let handleStarting = React.useCallback(() => {
        if (Platform.OS === 'android') {
            setTimeout(() => SStatusBar.setBarStyle('light-content'), 100);
        } else {
            SStatusBar.setBarStyle('light-content');
        }
        Animated.parallel([
            Animated.spring(progress, {
                toValue: 1,
                stiffness: 500,
                mass: 1,
                damping: 10000,
                useNativeDriver: true,
                isInteraction: false
            }),
            Animated.timing(progressLinear, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
                isInteraction: false
            })
        ]).start();
        if (props.config.onBegin) {
            props.config.onBegin();
        }
    }, []);

    let handleClosing = React.useCallback(() => {
        setTimeout(() => { SStatusBar.setBarStyle(theme.statusBar); }, 50);

        Animated.parallel([
            Animated.spring(progress, {
                toValue: 0,
                stiffness: 500,
                mass: 1,
                damping: 10000,
                useNativeDriver: true,
                isInteraction: false
            }),
            Animated.timing(progressLinear, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
                isInteraction: false
            })
        ]).start();
    }, [theme.statusBar]);

    let handleClosed = React.useCallback(() => {
        if (props.config.onEnd) {
            props.config.onEnd();
        }
        props.onClose();
    }, []);

    let handleCloseClick = React.useCallback(() => {
        if (ref.current) {
            ref.current.close();
        }
    }, []);

    let handleShareClick = React.useCallback(async () => {
        const url = props.config.url;
        let file: string | undefined;

        if (url.indexOf('http') === 0) {
            const loader = Toast.loader();
            loader.show();

            file = await DownloadManagerInstance.downloadImage(url, 'image.png');

            loader.hide();
        } else {
            file = await DownloadManagerInstance.copyFileWithNewName(url, 'image.png');
        }

        if (file) {
            let builder = new ActionSheetBuilder();

            builder.action('Share photo', () => Share.open({
                url: 'file://' + file
            }), false, require('assets/ic-share-24.png'));

            builder.action(Platform.select({ ios: 'Save to camera roll', android: 'Save to gallery' }), async () => {
                if (await checkPermissions('gallery')) {
                    await CameraRoll.saveToCameraRoll('file://' + file!);
                    Toast.success({ duration: 1000 }).show();
                }

            }, false, require('assets/ic-download-24.png'));

            builder.show();
        }
    }, []);

    let handleBackPress = React.useCallback(() => {
        handleCloseClick();
        return true;
    }, []);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    });

    let handleTap = React.useCallback(() => {
        if (barVisible) {
            barVisible = false;
            Animated.timing(barOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            }).start();
        } else {
            barVisible = true;
            Animated.timing(barOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            }).start();
        }
    }, []);

    const w = props.config.width;
    const h = props.config.height;
    const animate = props.config.animate!!;
    const containerW = Dimensions.get('screen').width;
    const containerH = Dimensions.get('screen').height;
    const size = layoutMedia(w, h, 1024, 1024);

    return (
        <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, flexDirection: 'column', alignItems: 'stretch' }} pointerEvents="box-none">
            <View
                style={{
                    position: 'absolute',
                    width: containerW,
                    height: containerH,
                }}
                pointerEvents="box-none"
            >
                <FastImageViewer
                    ref={ref}
                    srcWidth={size.width}
                    srcHeight={size.height}
                    width={containerW}
                    height={containerH}
                    onTap={handleTap}
                    startLayout={animate}
                    startLayoutRenderer={
                        (onLoaded) => (
                            <ZImage
                                source={props.config.url}
                                width={animate.width}
                                height={animate.height}
                                imageSize={{ width: size.width, height: size.height }}
                                onLoaded={onLoaded}
                                borderRadius={props.config.animate!!.borderRadius}
                                resize={props.config.isGif ? 'none' : 'cover'}
                                highPriority={true}
                            />
                        )}
                    onStarting={handleStarting}
                    onClosing={handleClosing}
                    onClosed={handleClosed}
                    crossFade={props.config.crossFade}
                >
                    {onLoaded => (
                        <ZImage
                            source={props.config.url}
                            width={size.width}
                            height={size.height}
                            imageSize={{ width: size.width, height: size.height }}
                            onLoaded={onLoaded}
                            resize={props.config.isGif ? 'none' : 'contain'}
                            highPriority={true}
                        />
                    )}
                </FastImageViewer>
            </View>
            <Animated.View
                style={{
                    height: SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top,
                    paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                    backgroundColor: theme.overlayMedium,
                    justifyContent: 'center',
                    opacity: Animated.multiply(progressLinear, barOpacity)
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                    <SCloseButton tintColor={theme.foregroundContrast} onPress={handleCloseClick} />
                    <SShareButton tintColor={theme.foregroundContrast} onPress={handleShareClick} />
                </View>
            </Animated.View>

            {(!!props.config.title || !!props.config.subtitle) && (
                <Animated.View
                    style={{
                        paddingBottom: SDevice.safeArea.bottom,
                        backgroundColor: theme.overlayMedium,
                        opacity: Animated.multiply(progressLinear, barOpacity),
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                >
                    <View flexDirection="column" height={52} paddingHorizontal={56} justifyContent="center">
                        {!!props.config.title && <Text style={{ ...TextStyles.Label2, color: theme.foregroundContrast, textAlign: 'center' }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{props.config.title}</Text>}
                        {!!props.config.subtitle && <Text style={{ ...TextStyles.Caption, color: theme.foregroundContrast, textAlign: 'center', opacity: SecondarinessAlpha }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{props.config.subtitle}</Text>}
                    </View>
                </Animated.View>
            )}
        </View>
    );

});
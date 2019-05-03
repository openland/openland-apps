import * as React from 'react';
import { View, Animated, Dimensions, Platform, CameraRoll, BackHandler, Text } from 'react-native';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { SDevice } from 'react-native-s/SDevice';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { FastImageViewer } from 'react-native-s/FastImageViewer';
import { SShareButton } from 'react-native-s/SShareButton';
import { ActionSheetBuilder } from '../ActionSheet';
import Share from 'react-native-share';
import { layoutMedia } from '../../../openland-web/utils/MediaLayout';
import { ZImage } from '../ZImage';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export const ZPictureOverlay = XMemo<{ config: ZPictureTransitionConfig, onClose: () => void }>((props) => {

    let theme = React.useContext(ThemeContext);

    let ref = React.createRef<FastImageViewer>();

    let progress = new Animated.Value(0);
    let progressInverted = Animated.add(1, Animated.multiply(progress, -1));
    let unredlayOpacity = progressInverted.interpolate({
        inputRange: [0, 0.5],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    let progressLinear = new Animated.Value(0);
    let progressLinearInverted = Animated.add(1, Animated.multiply(progressLinear, -1));
    let barOpacity = new Animated.Value(1);
    let barVisible = true;

    let previewLoaded = true;
    let fullLoaded = false;

    let [closing, setClosing] = React.useState(false);

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
        // if (!state.closing) {
        //     Animated.parallel([
        //         Animated.spring(progress, {
        //             toValue: 0,
        //             stiffness: 500,
        //             mass: 1,
        //             damping: 10000,
        //             useNativeDriver: true
        //         }),
        //         Animated.timing(progressLinear, {
        //             toValue: 0,
        //             duration: 150,
        //             useNativeDriver: true
        //         })
        //     ]).start(() => {
        //         if (props.config.onEnd) {
        //             props.config.onEnd();
        //         }
        //         props.onClose();
        //     });
        //     // Animated.timing(progress, {
        //     //     toValue: 0,
        //     //     duration: 6000,
        //     //     useNativeDriver: true
        //     // }).start(() => {
        //     //     props.onClose();
        //     // });
        //     setState({ closing: true });
        //     if (Platform.OS === 'ios') {
        //         setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        //     }
        // }
        if (ref.current) {
            ref.current.close();
        }
    }
        , [])

    let handleShareClick = React.useCallback(async () => {
        let file = await DownloadManagerInstance.copyFileWithNewName(props.config.url, 'image.png');

        if (file) {
            let builder = new ActionSheetBuilder();

            builder.action('Share', () => Share.open({
                url: 'file://' + file
            }));

            builder.action(Platform.select({ ios: 'Save to Camera Roll', android: 'Save to Gallery' }), async () => {
                await CameraRoll.saveToCameraRoll('file://' + file!);
            });

            builder.show();
        }
    }, []);

    // componentWillMount() {

    // }

    let handleBackPress = React.useCallback(() => {
        handleCloseClick();
        return true;
    }, []);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    })

    let handleTap = React.useCallback(() => {
        if (barVisible) {
            barVisible = false;
            Animated.timing(barOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            });
        } else {
            barVisible = true;
            Animated.timing(barOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            });
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
                                resize={props.config.isGif ? 'none' : undefined}
                                highPriority={true}
                            />
                        )}
                    onStarting={handleStarting}
                    onClosing={handleClosing}
                    onClosed={handleClosed}

                >
                    {onLoaded => (
                        <ZImage
                            source={props.config.url}
                            width={size.width}
                            height={size.height}
                            imageSize={{ width: size.width, height: size.height }}
                            onLoaded={onLoaded}
                            resize={props.config.isGif ? 'none' : undefined}
                            highPriority={true}
                        />
                    )}
                </FastImageViewer>
            </View>
            <Animated.View
                style={{
                    height: SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top,
                    paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    opacity: Animated.multiply(progressLinear, barOpacity)
                    // transform: [{
                    //     translateY:
                    //         Animated.multiply(
                    //             Animated.add(Animated.multiply(progressLinear, barOpacity), -1),
                    //             ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight)
                    // }]
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SCloseButton tintColor="#fff" onPress={handleCloseClick} />
                    <SShareButton tintColor="#fff" onPress={handleShareClick} />
                </View>
            </Animated.View>

            {(!!props.config.title || !!props.config.subtitle) && (
                <Animated.View
                    style={{
                        paddingBottom: SDevice.safeArea.bottom,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        opacity: Animated.multiply(progressLinear, barOpacity),
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                >
                    <View flexDirection="column" height={50} justifyContent="center">
                        {!!props.config.title && <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 15, fontWeight: TextStyles.weight.medium }}>{props.config.title}</Text>}
                        {!!props.config.subtitle && <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 13, opacity: 0.8, marginTop: 2 }}>{props.config.subtitle}</Text>}
                    </View>
                </Animated.View>
            )}
        </View>
    );

})
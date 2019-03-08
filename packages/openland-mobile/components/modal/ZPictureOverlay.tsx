import * as React from 'react';
import { View, Animated, Dimensions, Platform, CameraRoll, BackHandler } from 'react-native';
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

export class ZPictureOverlay extends React.PureComponent<{ config: ZPictureTransitionConfig, onClose: () => void }, { closing: boolean }> {

    ref = React.createRef<FastImageViewer>();

    progress = new Animated.Value(0);
    progressInverted = Animated.add(1, Animated.multiply(this.progress, -1));
    unredlayOpacity = this.progressInverted.interpolate({
        inputRange: [0, 0.5],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    progressLinear = new Animated.Value(0);
    progressLinearInverted = Animated.add(1, Animated.multiply(this.progressLinear, -1));
    barOpacity = new Animated.Value(1);
    barVisible = true;

    previewLoaded = true;
    fullLoaded = false;

    state = {
        closing: false
    };

    handleStarting = () => {
        if (Platform.OS === 'android') {
            setTimeout(() => SStatusBar.setBarStyle('light-content'), 100);
        } else {
            SStatusBar.setBarStyle('light-content');
        }
        Animated.parallel([
            Animated.spring(this.progress, {
                toValue: 1,
                stiffness: 500,
                mass: 1,
                damping: 10000,
                useNativeDriver: true,
                isInteraction: false
            }),
            Animated.timing(this.progressLinear, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
                isInteraction: false
            })
        ]).start();
        if (this.props.config.onBegin) {
            this.props.config.onBegin();
        }
    }

    handleClosing = () => {
        setTimeout(() => { SStatusBar.setBarStyle('dark-content'); }, 50);
        Animated.parallel([
            Animated.spring(this.progress, {
                toValue: 0,
                stiffness: 500,
                mass: 1,
                damping: 10000,
                useNativeDriver: true,
                isInteraction: false
            }),
            Animated.timing(this.progressLinear, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
                isInteraction: false
            })
        ]).start();
    }

    handleClosed = () => {
        if (this.props.config.onEnd) {
            this.props.config.onEnd();
        }
        this.props.onClose();
    }

    handleCloseClick = () => {
        // if (!this.state.closing) {
        //     Animated.parallel([
        //         Animated.spring(this.progress, {
        //             toValue: 0,
        //             stiffness: 500,
        //             mass: 1,
        //             damping: 10000,
        //             useNativeDriver: true
        //         }),
        //         Animated.timing(this.progressLinear, {
        //             toValue: 0,
        //             duration: 150,
        //             useNativeDriver: true
        //         })
        //     ]).start(() => {
        //         if (this.props.config.onEnd) {
        //             this.props.config.onEnd();
        //         }
        //         this.props.onClose();
        //     });
        //     // Animated.timing(this.progress, {
        //     //     toValue: 0,
        //     //     duration: 6000,
        //     //     useNativeDriver: true
        //     // }).start(() => {
        //     //     this.props.onClose();
        //     // });
        //     this.setState({ closing: true });
        //     if (Platform.OS === 'ios') {
        //         setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        //     }
        // }
        if (this.ref.current) {
            this.ref.current.close();
        }
    }

    handleShareClick = async () => {
        let file = await DownloadManagerInstance.addExtensionToFile(this.props.config.url, 'png');

        if (file) {
            let builder = new ActionSheetBuilder();

            builder.action('Share', () => Share.open({
                url: 'file://' + file
            }));

            builder.action('Save to Camera Roll', async () => {
                await CameraRoll.saveToCameraRoll(file!);
            });

            builder.show();
        }
    }

    // componentWillMount() {
        
    // }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.handleCloseClick();
        return true;
    }

    handleTap = () => {
        if (this.barVisible) {
            this.barVisible = false;
            Animated.timing(this.barOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            });
        } else {
            this.barVisible = true;
            Animated.timing(this.barOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                isInteraction: false
            });
        }
    }

    render() {

        const w = this.props.config.width;
        const h = this.props.config.height;
        const animate = this.props.config.animate!!;
        const containerW = Dimensions.get('screen').width;
        const containerH = Dimensions.get('screen').height;
        const size = layoutMedia(w, h, 1024, 1024);
        console.log(this.props.config.isGif);

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
                        ref={this.ref}
                        srcWidth={size.width}
                        srcHeight={size.height}
                        width={containerW}
                        height={containerH}
                        onTap={this.handleTap}
                        startLayout={animate}
                        startLayoutRenderer={
                            (onLoaded) => (
                                <ZImage
                                    source={this.props.config.url}
                                    width={animate.width}
                                    height={animate.height}
                                    imageSize={{ width: size.width, height: size.height }}
                                    onLoaded={onLoaded}
                                    borderRadius={this.props.config.animate!!.borderRadius}
                                    resize={this.props.config.isGif ? 'none' : undefined}
                                    highPriority={true}
                                />
                            )}
                        onStarting={this.handleStarting}
                        onClosing={this.handleClosing}
                        onClosed={this.handleClosed}

                    >
                        {onLoaded => (
                            <ZImage
                                source={this.props.config.url}
                                width={size.width}
                                height={size.height}
                                imageSize={{ width: size.width, height: size.height }}
                                onLoaded={onLoaded}
                                resize={this.props.config.isGif ? 'none' : undefined}
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
                        opacity: Animated.multiply(this.progressLinear, this.barOpacity)
                        // transform: [{
                        //     translateY:
                        //         Animated.multiply(
                        //             Animated.add(Animated.multiply(this.progressLinear, this.barOpacity), -1),
                        //             ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight)
                        // }]
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SCloseButton tintColor="#fff" onPress={this.handleCloseClick} />
                        <SShareButton tintColor="#fff" onPress={this.handleShareClick} />
                    </View>
                </Animated.View>

            </View>
        );
    }
}
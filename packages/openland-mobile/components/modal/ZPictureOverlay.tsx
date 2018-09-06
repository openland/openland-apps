import * as React from 'react';
import { View, Animated, StatusBar, Dimensions, Platform } from 'react-native';
import { ZAppConfig } from '../ZAppConfig';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { FastImageViewer } from 'react-native-fast-image-viewer';
import { FastHeaderBackButton } from 'react-native-fast-navigation/views/FastHeaderBackButton';

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
        if (Platform.OS === 'ios') {
            setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        }
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

    componentWillMount() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content');
        }
    }

    componentDidMount() {
        // if (this.props.config.onBegin) {
        //     this.props.config.onBegin();
        // }
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
        const containerW = Dimensions.get('window').width;
        const containerH = Dimensions.get('window').height;
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
                                <XPImage
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
                            <XPImage
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
                        height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight,
                        paddingTop: ZAppConfig.statusBarHeight,
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
                    <FastHeaderBackButton inverted={true} onPress={this.handleCloseClick} />
                </Animated.View>
            </View>
        );
    }
}
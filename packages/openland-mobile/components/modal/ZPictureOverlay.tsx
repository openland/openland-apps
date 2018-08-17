import * as React from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar, Dimensions, LayoutAnimation, Easing, Platform } from 'react-native';
import { ZAppConfig } from '../ZAppConfig';
import { ZHeaderBackButton } from '../navigation/ZHeaderBackButton';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { ZImagePreview } from '../media/ZImagePreview';
import { FastImageViewer } from 'react-native-fast-image-viewer';

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

    handleClose = () => {
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

    handleClosed = () => {
        if (Platform.OS === 'ios') {
            setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        }
        this.props.onClose();
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

    onPreviewLoaded = () => {
        if (this.previewLoaded) {
            return;
        }
        this.previewLoaded = true;
        if (this.fullLoaded) {
            Animated.parallel([
                Animated.spring(this.progress, {
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(this.progressLinear, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start();
        }
    }

    onDestLoaded = () => {
        if (this.fullLoaded) {
            return;
        }
        this.fullLoaded = true;
        if (this.previewLoaded) {
            Animated.parallel([
                Animated.spring(this.progress, {
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(this.progressLinear, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start();
        }
    }

    handleTap = () => {
        if (this.barVisible) {
            this.barVisible = false;
            Animated.timing(this.barOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            });
        } else {
            this.barVisible = true;
            Animated.timing(this.barOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
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
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);
        const baseScale = Math.max(animate.width / containerW, animate.height / containerH);

        return (
            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, flexDirection: 'column', alignItems: 'stretch' }} pointerEvents="box-none">
                {/* <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#000', opacity: Animated.multiply(this.progressLinear, this.barOpacity) }} /> */}

                <View
                    style={{
                        position: 'absolute',
                        width: containerW,
                        height: containerH,
                    }}
                    pointerEvents="box-none"
                >
                    {/* <Animated.View
                        style={{
                            width: containerW,
                            height: containerH,
                            transform: [
                                {
                                    translateX: Animated.multiply(animate.x + animate.width / 2 - containerW / 2, this.progressInverted)
                                },
                                {
                                    translateY: Animated.multiply(animate.y + animate.height / 2 - containerH / 2, this.progressInverted)
                                },
                                {
                                    scale: Animated.add(this.progress, Animated.multiply(baseScale, this.progressInverted))
                                },
                            ]
                        }}
                        pointerEvents="box-none"
                    > */}
                    {/* <Animated.View style={{ position: 'absolute', width: containerW, height: containerH, alignItems: 'center', justifyContent: 'center', opacity: this.unredlayOpacity }} pointerEvents="none">
                            <XPImage
                                source={{ uuid: this.props.config.uuid }}
                                imageSize={{ width: size.width, height: size.height }}
                                width={l.width}
                                height={l.height}
                                borderRadius={18 / baseScale}
                                onLoaded={this.onPreviewLoaded}
                            />
                        </Animated.View> */}
                    {/* <Animated.View style={{ position: 'absolute', width: containerW, height: containerH, opacity: this.progressLinear }}> */}
                    <FastImageViewer
                        ref={this.ref}
                        srcWidth={size.width}
                        srcHeight={size.height}
                        width={containerW}
                        height={containerH}
                        onTap={this.handleTap}
                        startLayout={animate}
                        onClosed={this.handleClosed}
                    >
                        <XPImage
                            source={{ uuid: this.props.config.uuid }}
                            width={size.width}
                            height={size.height}
                            imageSize={{ width: size.width, height: size.height }}
                            onLoaded={this.onDestLoaded}
                        />
                    </FastImageViewer>
                    {/* </Animated.View> */}
                    {/* </Animated.View> */}
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
                    <ZHeaderBackButton inverted={true} onPress={this.handleClose} />
                </Animated.View>
            </View>
        );
    }
}
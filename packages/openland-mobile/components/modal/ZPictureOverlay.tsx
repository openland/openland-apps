import * as React from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar, Dimensions, LayoutAnimation, Easing } from 'react-native';
import { ZAppConfig } from '../ZAppConfig';
import { ZHeaderBackButton } from '../navigation/ZHeaderBackButton';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { ZImagePreview } from '../media/ZImagePreview';

export class ZPictureOverlay extends React.PureComponent<{ config: ZPictureTransitionConfig, onClose: () => void }, { inited: boolean, closing: boolean }> {

    progress = new Animated.Value(0);

    state = {
        inited: false,
        closing: false
    };

    handleClose = () => {
        if (!this.state.closing && this.state.inited) {
            Animated.timing(this.progress, {
                toValue: 0,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true
            }).start();
            LayoutAnimation.configureNext({
                duration: 400,
                create: {
                    type: LayoutAnimation.Types.spring,
                    property: LayoutAnimation.Properties.scaleXY,
                    springDamping: 0.7
                },
                update: {
                    type: LayoutAnimation.Types.spring,
                    springDamping: 0.7
                }
            });
            this.setState({ closing: true });
            setTimeout(() => { this.props.onClose(); }, 400);
            setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        }
    }

    componentWillMount() {
        StatusBar.setBarStyle('light-content');
    }

    componentDidMount() {
        Animated.timing(this.progress, {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
        setTimeout(
            () => {
                LayoutAnimation.configureNext({
                    duration: 400,
                    create: {
                        type: LayoutAnimation.Types.spring,
                        property: LayoutAnimation.Properties.scaleXY,
                        springDamping: 0.7
                    },
                    update: {
                        type: LayoutAnimation.Types.spring,
                        springDamping: 0.7
                    }
                });
                this.setState({ inited: true });
            },
            0);
        // this.setState({ inited: true });
    }

    render() {

        const w = this.props.config.width;
        const h = this.props.config.height;
        const animate = this.props.config.animate!!;
        const size = layoutMedia(w, h, 1024, 1024);
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);
        const completed = this.state.inited && !this.state.closing;
        return (
            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, flexDirection: 'column', alignItems: 'stretch' }} pointerEvents="box-none">
                <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#000', opacity: this.progress }} />

                {/* {!completed && (
                    <View key="img" position="absolute" top={animate.y} left={animate.x} width={animate.width} height={animate.height} backgroundColor="#f00">
                        <XPImage source={{ uuid: this.props.config.uuid }} width={animate.width} height={animate.height} imageSize={size} />
                    </View>
                )}
                {completed && (
                    <View key="img" position="absolute" top={0} left={0} width={l.width} height={l.height}>
                        <XPImage source={{ uuid: this.props.config.uuid }} width={l.width} height={l.height} imageSize={size} />
                    </View>
                )} */}

                <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, opacity: this.progress }}>
                    <ZImagePreview
                        src={this.props.config.uuid}
                        srcWidth={w}
                        srcHeight={h}
                        width={Dimensions.get('window').width}
                        height={Dimensions.get('window').height}
                    />
                </Animated.View>

                <Animated.View style={{ height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, paddingTop: ZAppConfig.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.6)', transform: [{ translateY: Animated.multiply(Animated.add(this.progress, -1), ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight) }] }}>
                    <ZHeaderBackButton inverted={true} onPress={this.handleClose} />
                </Animated.View>
            </View>
        );
    }
}
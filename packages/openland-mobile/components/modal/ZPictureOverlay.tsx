import * as React from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar, Dimensions, LayoutAnimation, Easing, Platform } from 'react-native';
import { ZAppConfig } from '../ZAppConfig';
import { ZHeaderBackButton } from '../navigation/ZHeaderBackButton';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { ZImagePreview } from '../media/ZImagePreview';

export class ZPictureOverlay extends React.PureComponent<{ config: ZPictureTransitionConfig, onClose: () => void }, { closing: boolean }> {

    progress = new Animated.Value(0);
    progressInverted = Animated.add(1, Animated.multiply(this.progress, -1));

    state = {
        closing: false
    };

    handleClose = () => {
        if (!this.state.closing) {
            Animated.spring(this.progress, {
                toValue: 0,
                // easing: Easing.ease,
                useNativeDriver: true
            }).start();
            this.setState({ closing: true });
            setTimeout(() => { this.props.onClose(); }, 400);
            setTimeout(() => { StatusBar.setBarStyle('dark-content'); }, 50);
        }
    }

    componentWillMount() {
        StatusBar.setBarStyle('light-content');
    }

    componentDidMount() {
        Animated.spring(this.progress, {
            toValue: 1,
            // duration: 300,
            // easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }

    render() {

        const w = this.props.config.width;
        const h = this.props.config.height;
        const animate = this.props.config.animate!!;
        console.log(animate);
        const size = layoutMedia(w, h, 1024, 1024);
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);

        return (
            <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, flexDirection: 'column', alignItems: 'stretch' }} pointerEvents="box-none">
                <Animated.View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: '#000', opacity: this.progress }} />

                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        opacity: this.progress,
                        transform: [
                            {
                                translateY: Animated.multiply(animate.y - (Platform.OS === 'android' ? animate.height : 0), this.progressInverted)
                            },
                            {
                                translateX: Animated.multiply(animate.x - (Platform.OS === 'android' ? animate.width : 0), this.progressInverted)
                            },
                            {
                                scale: Animated.add(
                                    Animated.multiply(l.width / Dimensions.get('window').width, this.progress),
                                    Animated.multiply(animate.width / Dimensions.get('window').width, this.progressInverted)
                                )
                            }
                        ]
                    }}
                >
                    <View
                        style={{

                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height
                        }}
                    >
                        <ZImagePreview
                            src={this.props.config.uuid}
                            srcWidth={w}
                            srcHeight={h}
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height}
                        />
                    </View>
                </Animated.View>

                <Animated.View style={{ height: ZAppConfig.navigationBarHeight + ZAppConfig.statusBarHeight, paddingTop: ZAppConfig.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.6)', transform: [{ translateY: Animated.multiply(Animated.add(this.progress, -1), ZAppConfig.statusBarHeight + ZAppConfig.navigationBarHeight) }] }}>
                    <ZHeaderBackButton inverted={true} onPress={this.handleClose} />
                </Animated.View>
            </View>
        );
    }
}
import * as React from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, ViewStyle, Dimensions, TouchableOpacity, Image } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { SafeAreaView, NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderButtonDescription } from './ZHeaderButton';

interface Descriptor {
    progress: Animated.Value;
    position: Animated.Value;
    options: {
        title?: string;
        headerTitle?: any;
    };
    navigation: NavigationScreenProp<NavigationParams>;
}

interface Scene {
    index: number;
    descriptor: Descriptor;
}

interface Props {
    scenes: Scene[];
    scene: Scene;
    progress: Animated.Value;
    position: Animated.Value;
}

let styles = StyleSheet.create({
    title: {
        color: '#fff',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 44
    } as TextStyle,
    titleContainer: {
        position: 'absolute',
        width: '100%',
        height: 44
    } as ViewStyle
});

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);
const NAVIGATION_BAR_SIZE = 88;
const NAVIGATION_BAR_SIZE_LARGE = 120;
const defaultBackgroundOffset = new Animated.Value(NAVIGATION_BAR_SIZE - BACKGROUND_SIZE);

class ZHeaderComponent extends React.PureComponent<Props> {

    backgroundOffset: Animated.AnimatedInterpolation = defaultBackgroundOffset;
    wasOpen = false;

    handleBack = () => {
        this.props.scene.descriptor.navigation.goBack();
    }

    componentWillReceiveProps(nextProps: Props) {
        let offsets = nextProps.scenes.map((v, index) => {

            // Calculate position offset
            let interpolated = nextProps.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            let offsetInterporated = nextProps.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [SCREEN_WIDTH / 2, 1, -SCREEN_WIDTH / 2],
                extrapolate: 'clamp'
            });

            // Calculate navigation bar offset
            let computedOffset: Animated.AnimatedInterpolation = defaultBackgroundOffset;
            let contentOffset = v.descriptor.navigation.getParam('__z_header_actions_search_offset') as Animated.Value | undefined | null;
            if (contentOffset) {
                let invertedOffset = Animated.multiply(contentOffset, -1);
                let shiftedOffset = Animated.add(invertedOffset, NAVIGATION_BAR_SIZE_LARGE - BACKGROUND_SIZE);
                let clampedOffset = shiftedOffset.interpolate({
                    inputRange: [-BACKGROUND_SIZE + NAVIGATION_BAR_SIZE, 0],
                    outputRange: [-BACKGROUND_SIZE + NAVIGATION_BAR_SIZE, 0],
                    extrapolate: 'clamp'
                });
                computedOffset = clampedOffset;
            }

            return {
                backgroundOffset: Animated.multiply(computedOffset, interpolated),
                position: interpolated,
                index
            };
        });

        this.backgroundOffset = new Animated.Value(0);
        for (let f of offsets) {
            this.backgroundOffset = Animated.add(f.backgroundOffset, this.backgroundOffset);
        }
    }

    render() {
        console.warn(this.props);
        let titles = [];
        let w = Dimensions.get('window').width;
        for (let s of this.props.scenes) {
            let interpolated = this.props.position.interpolate({
                inputRange: [
                    s.index - 1,
                    s.index,
                    s.index + 1],
                outputRange: [0, 1, 0]
            });

            let offsetInterporated = this.props.position.interpolate({
                inputRange: [
                    s.index - 1,
                    s.index,
                    s.index + 1],
                outputRange: [w / 2, 1, -w / 2]
            });

            let titleRender: any = undefined;
            if (s.descriptor.options.headerTitle) {
                if (typeof s.descriptor.options.headerTitle === 'string') {
                    titleRender = <Text style={styles.title}>{s.descriptor.options.headerTitle}</Text>;
                } else {
                    titleRender = <View>{s.descriptor.options.headerTitle}</View>;
                }
            } else if (s.descriptor.options.title) {
                titleRender = <Text style={styles.title}>{s.descriptor.options.title}</Text>;
            }

            // console.log(s.descriptor.options.title);

            titles.push(
                <Animated.View
                    style={{
                        opacity: interpolated,
                        transform: [
                            { translateX: offsetInterporated }
                        ]
                    }}
                    key={'scene-' + titles.length}
                >
                    <View style={styles.titleContainer}>
                        {titleRender}
                    </View>
                </Animated.View>
            );
        }

        let right: any[] = [];
        let rightButtons = this.props.scene.descriptor.navigation.getParam('__z_header_actions', []) as ZHeaderButtonDescription[];
        for (let r of rightButtons) {
            right.push(r.render());
        }

        let backButtonOpacity = this.props.position.interpolate({
            inputRange: [
                0,
                1],
            outputRange: [0, 1]
        });

        // let offsetAnimated: any = this.backgroundOffset;
        // if (this.props.scene.descriptor.navigation.getParam('__z_header_actions_search', false)) {
        //     let contentOffset = this.props.scene.descriptor.navigation.getParam('__z_header_actions_search_offset') as Animated.Value;
        //     if (!this.wasOpen) {
        //         this.wasOpen = true;
        //         // this.backgroundOffset.setValue(88 - 120);
        //         // Animated.spring(
        //         //     this.backgroundOffset,
        //         //     {
        //         //         toValue: 0,
        //         //         useNativeDriver: true
        //         //     }
        //         // ).start();
        //     }
        //     offsetAnimated = Animated.add(Animated.multiply(contentOffset, -1), -maxSide + 120).interpolate({
        //         inputRange: [-22 - maxSide + 120, 0],
        //         outputRange: [-22 - maxSide + 120, 0],
        //         extrapolate: 'clamp'
        //     });
        // } else {
        //     if (this.wasOpen) {
        //         this.wasOpen = false;
        //         // this.backgroundOffset.setValue(0);
        //         Animated.spring(
        //             this.backgroundOffset,
        //             {
        //                 toValue: 88 - maxSide,
        //                 useNativeDriver: true
        //             }
        //         ).start();
        //     }
        // }

        return (
            <View height={88}>
                <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: [{ translateY: this.backgroundOffset }], backgroundColor: AppStyles.primaryColor, height: BACKGROUND_SIZE }} />
                <SafeAreaView zIndex={10}>
                    <View flexDirection="row">
                        <Animated.View style={{ opacity: backButtonOpacity, zIndex: 10 }}>
                            <TouchableOpacity onPress={this.handleBack}>
                                <Image
                                    source={require('assets/back-icon.png')}
                                    style={{
                                        height: 21,
                                        width: 13,
                                        marginLeft: 9,
                                        marginRight: 22,
                                        marginVertical: 12,
                                        resizeMode: 'contain',
                                        tintColor: '#fff'
                                    }}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                        <View flexGrow={1} flexBasis={0}>
                            {titles}
                        </View>
                        {right.length > 0 && (
                            <View paddingRight={15} paddingLeft={10}>
                                {right}
                            </View>
                        )}
                        {right.length === 0 && (<View width={44} />)}
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

export const ZHeader = (props: any) => <ZHeaderComponent {...props} />;
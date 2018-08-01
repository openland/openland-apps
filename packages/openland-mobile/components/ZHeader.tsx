import * as React from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, ViewStyle, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { SafeAreaView, NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderButtonDescription } from './ZHeaderButton';
import ViewOverflow from 'react-native-view-overflow';
import { isAndroid } from '../utils/isAndroid';
import { ZHeaderBackButton } from './ZHeaderBackButton';
import { VibrancyView } from 'react-native-blur';
import { ZAppConfig } from './ZAppConfig';
const ViewOverflowAnimated = Animated.createAnimatedComponent(ViewOverflow);

interface Descriptor {
    progress: Animated.Value;
    position: Animated.Value;
    options: {
        title?: string;
        headerTitle?: any;
        headeAppearance?: 'small';
        isTab?: boolean;
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

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);
const defaultBackgroundOffset = new Animated.Value(ZAppConfig.navigationBarHeight - BACKGROUND_SIZE);
const zeroValue = new Animated.Value(0);
const oneValue = new Animated.Value(1);

let styles = StyleSheet.create({

    title: {
        color: ZAppConfig.titleColor,
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        ...isAndroid ? {
            textAlign: 'left',
            fontSize: 20,
            fontWeight: '500',
            lineHeight: 56
        } : {
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '600',
                lineHeight: 44
            }
    } as TextStyle,
    titleLarge: {
        color: ZAppConfig.titleColor,
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'bottom',
        fontSize: isAndroid ? 28 : 32,
        fontWeight: 'bold',
        lineHeight: 140,
    } as TextStyle,
    titleContainer: {
        position: 'absolute',
        width: '100%',
        height: 44,
        paddingLeft: ZAppConfig.navigationBarBackWidth
    } as ViewStyle,
    titleLargContainer: {
        position: 'absolute',
        width: '100%',
        height: 140,
        paddingLeft: isAndroid ? ZAppConfig.navigationBarBackWidth : 15
    } as ViewStyle
});

export interface ZHeaderConfig {
    title?: string;
    offset?: Animated.Value | undefined | null;
}

class ZHeaderComponent extends React.PureComponent<Props> {

    handleBack = () => {
        this.props.scene.descriptor.navigation.goBack();
    }

    render() {

        // console.log(this.props);

        // Build Offsets
        let offsets = this.props.scenes.map((v) => {

            // Resolve param name
            let paramName = '__z_header_actions_search_offset';
            if (v.descriptor.options.isTab) {
                // console.log(v.descriptor);
                let r = (v.descriptor as any).state.routes[(v.descriptor as any).state.index].routeName;
                paramName = '__z_header_' + r + 'actions_search_offset';
                console.log(r);
            }

            // let config: ZHeaderConfig | undefined = v.descriptor.navigation.getParam('__z_header_config');
            // if (!config) {
            //     let parent = (v.descriptor.navigation as any).dangerouslyGetParent();
            //     if (parent) {
            //         //
            //     }
            // }

            // Calculate position offset
            let interpolated = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            let offsetInterporated = this.props.position.interpolate({
                inputRange: [
                    v.index - 1,
                    v.index,
                    v.index + 1],
                outputRange: [SCREEN_WIDTH / 2, 1, -SCREEN_WIDTH / 2],
                extrapolate: 'clamp'
            });

            // Small title opacity
            let titleOpacity: Animated.AnimatedInterpolation = interpolated;
            let largeTitleOpacity: Animated.AnimatedInterpolation = zeroValue;
            let largeTitleOffset: Animated.AnimatedInterpolation = zeroValue;
            let largeTitleOverscrol: Animated.AnimatedInterpolation = oneValue;

            // Calculate navigation bar offset
            let computedOffset: Animated.AnimatedInterpolation = defaultBackgroundOffset;
            let contentOffset = v.descriptor.navigation.getParam(paramName) as Animated.Value | undefined | null;
            if (contentOffset || v.descriptor.options.headeAppearance !== 'small') {
                let inputOffset = contentOffset ? contentOffset : zeroValue;
                let invertedOffset = Animated.multiply(inputOffset, -1);
                let shiftedOffset = Animated.add(invertedOffset, ZAppConfig.navigationBarHeightLarge + ZAppConfig.statusBarHeight - BACKGROUND_SIZE);
                let clampedOffset = shiftedOffset.interpolate({
                    inputRange: [-BACKGROUND_SIZE + ZAppConfig.navigationBarHeight, 0],
                    outputRange: [-BACKGROUND_SIZE + ZAppConfig.navigationBarHeight, 0],
                    extrapolate: 'clamp'
                });
                computedOffset = clampedOffset;

                if (!isAndroid) {
                    largeTitleOverscrol = invertedOffset.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 1.1],
                        extrapolate: 'clamp'
                    });
                }

                // Update title opacity for hiding when bar is expanded
                titleOpacity = Animated.multiply(interpolated, inputOffset.interpolate({
                    inputRange: [0, 10],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));

                // Calculate title offset
                largeTitleOpacity = Animated.multiply(interpolated, invertedOffset.interpolate({
                    inputRange: [-10, 0],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }));

                largeTitleOffset = invertedOffset;
            }

            return {
                backgroundOffset: Animated.multiply(computedOffset, interpolated),
                position: interpolated,
                titlePosition: isAndroid ? zeroValue : offsetInterporated,
                titleOpacity: titleOpacity,
                largeTitleOpacity: largeTitleOpacity,
                largeTitleOffset: largeTitleOffset,
                largeTitleFontSize: largeTitleOverscrol,
                scene: v
            };
        });

        //
        // Background Offset
        //

        let backgroundOffset: Animated.AnimatedInterpolation = new Animated.Value(0);
        for (let f of offsets) {
            backgroundOffset = Animated.add(f.backgroundOffset, backgroundOffset);
        }

        //
        // Back button opacity
        //

        let backButtonOpacity = this.props.position.interpolate({
            inputRange: [
                0,
                1],
            outputRange: [0, 1]
        });

        //
        // Rendering Titles
        //

        let titles = [];
        let w = Dimensions.get('window').width;
        for (let s of offsets) {
            let titleRender: any = undefined;
            let titleLarge: any = undefined;
            if (s.scene.descriptor.options.headerTitle) {
                if (typeof s.scene.descriptor.options.headerTitle === 'string') {
                    titleRender = <Text style={styles.title}>{s.scene.descriptor.options.headerTitle}</Text>;
                    titleLarge = <Text style={styles.titleLarge}>{s.scene.descriptor.options.headerTitle}</Text>;
                } else {
                    titleRender = <View>{s.scene.descriptor.options.headerTitle}</View>;
                }
            } else if (s.scene.descriptor.options.title) {
                titleRender = <Text style={styles.title}>{s.scene.descriptor.options.title}</Text>;
                titleLarge = <Text style={styles.titleLarge}>{s.scene.descriptor.options.title}</Text>;
            }

            // console.log(s.descriptor.options.title);

            if (titleRender) {
                titles.push(
                    <Animated.View
                        style={{
                            ...(styles.titleContainer as any),
                            opacity: s.titleOpacity,
                            transform: [
                                { translateX: s.titlePosition }
                            ]
                        }}
                        key={'scene-' + titles.length}
                    >
                        {titleRender}
                    </Animated.View>
                );
            }

            if (titleLarge) {
                if (isAndroid) {
                    titles.push(
                        <Animated.View
                            style={{
                                ...(styles.titleLargContainer as any),
                                opacity: s.largeTitleOpacity,
                                transform: [
                                    {
                                        translateX: s.titlePosition
                                    }
                                ]
                            }}
                            key={'scene-large-' + titles.length}
                            pointerEvents="none"
                        >
                            {titleLarge}
                        </Animated.View>
                    );
                } else {
                    titles.push(
                        <Animated.View
                            style={{
                                ...(styles.titleLargContainer as any),
                                opacity: s.largeTitleOpacity,
                                transform: [
                                    {
                                        translateX: s.titlePosition
                                    },
                                    {
                                        translateY: s.largeTitleOffset
                                    },
                                    {
                                        translateX: -SCREEN_WIDTH / 2 + 15
                                    },
                                    {
                                        translateY: 20
                                    },
                                    {
                                        scale: s.largeTitleFontSize
                                    },
                                    {
                                        translateY: -20
                                    },
                                    {
                                        translateX: SCREEN_WIDTH / 2 - 15
                                    },
                                ]
                            }}
                            key={'scene-large-' + titles.length}
                            pointerEvents="none"
                        >
                            {titleLarge}
                        </Animated.View>
                    );
                }
            }
        }

        //
        // Action Buttons
        //

        let right: any[] = [];
        let rightButtons = this.props.scene.descriptor.navigation.getParam('__z_header_actions', []) as ZHeaderButtonDescription[];
        for (let r of rightButtons) {
            right.push(r.render());
        }

        //
        // Complete Render
        //

        let content = (
            <>
                {/* Left */}
                <Animated.View style={{ height: '100%', position: 'absolute', left: 0, top: 0, width: ZAppConfig.navigationBarBackWidth, opacity: backButtonOpacity, zIndex: 3, backgroundColor: isAndroid ? ZAppConfig.navigationBarBackgroundColor : undefined }}>
                    <ZHeaderBackButton onPress={this.handleBack} />
                </Animated.View>

                {/* Center*/}
                <View flexGrow={1} flexBasis={0} zIndex={2}>
                    {titles}
                </View>

                {/* Right */}
                {right.length > 0 && (
                    <View paddingRight={15} paddingLeft={10} zIndex={3}>
                        {right}
                    </View>
                )}
                {right.length === 0 && (<View width={44} zIndex={3} />)}

                {/* Debug Statusbar */}
                <View style={{ position: 'absolute', left: 0, top: 0, right: 0, height: ZAppConfig.statusBarHeight, backgroundColor: '#ff0', zIndex: 3 }}>
                    {}
                </View>

                <ViewOverflowAnimated
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        transform: [{ translateY: backgroundOffset }],
                        height: BACKGROUND_SIZE,
                        zIndex: 1,
                        backgroundColor: ZAppConfig.navigationBarBackgroundColor
                    }}
                />
            </>
        );

        if (isAndroid) {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight, backgroundColor: ZAppConfig.navigationBarBackgroundColor }}>
                    {content}
                </ViewOverflow>
            );
        } else {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: ZAppConfig.navigationBarHeight, position: 'absolute', left: 0, right: 0, top: 0 }}>
                    {content}
                </ViewOverflow>
            );
        }
    }
}

export const ZHeader = (props: any) => <ZHeaderComponent {...props} />;
import * as React from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, ViewStyle, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { SafeAreaView, NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderButtonDescription } from './ZHeaderButton';
import ViewOverflow from 'react-native-view-overflow';
import { isAndroid } from '../utils/isAndroid';
import { ZHeaderBackButton } from './ZHeaderBackButton';
const ViewOverflowAnimated = Animated.createAnimatedComponent(ViewOverflow);

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
        color: '#fff',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'bottom',
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 140,
    } as TextStyle,
    titleContainer: {
        position: 'absolute',
        width: '100%',
        height: 44,
    } as ViewStyle,
    titleLargContainer: {
        position: 'absolute',
        width: '100%',
        height: 140,
    } as ViewStyle
});

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BACKGROUND_SIZE = Math.max(SCREEN_WIDTH, Dimensions.get('screen').height);
const NAVIGATION_BAR_SIZE = Platform.OS === 'ios' ? 44 : 56;
const NAVIGATION_BAR_SIZE_LARGE = 102;
const defaultBackgroundOffset = new Animated.Value(NAVIGATION_BAR_SIZE - BACKGROUND_SIZE);
const zeroValue = new Animated.Value(0);

class ZHeaderComponent extends React.PureComponent<Props> {

    handleBack = () => {
        this.props.scene.descriptor.navigation.goBack();
    }

    render() {

        // Build Offsets
        let offsets = this.props.scenes.map((v) => {

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

                // Update title opacity for hiding when bar is expanded
                titleOpacity = Animated.multiply(interpolated, contentOffset.interpolate({
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
                                }
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
                <ViewOverflowAnimated
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        transform: [{ translateY: backgroundOffset }],
                        backgroundColor: AppStyles.primaryColor,
                        height: BACKGROUND_SIZE,
                        zIndex: 1
                    }}
                />

                <ViewOverflowAnimated style={{ opacity: backButtonOpacity, zIndex: 2 }}>
                    <ZHeaderBackButton onPress={this.handleBack} />
                </ViewOverflowAnimated>
                <View flexGrow={1} flexBasis={0} zIndex={3}>
                    {titles}
                </View>
                {right.length > 0 && (
                    <View paddingRight={15} paddingLeft={10} zIndex={3}>
                        {right}
                    </View>
                )}
                {right.length === 0 && (<View width={44} zIndex={3} />)}
            </>
        );

        if (isAndroid) {
            return (
                <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: NAVIGATION_BAR_SIZE }}>
                    {content}
                </ViewOverflow>
            );
        } else {
            return (
                <SafeAreaView zIndex={10} forceInset={{ top: 'always', bottom: 'never' }}>
                    <ViewOverflow style={{ overflow: 'visible', flexDirection: 'row', height: NAVIGATION_BAR_SIZE }}>
                        {content}
                    </ViewOverflow>
                </SafeAreaView>
            );
        }
    }
}

export const ZHeader = (props: any) => <ZHeaderComponent {...props} />;
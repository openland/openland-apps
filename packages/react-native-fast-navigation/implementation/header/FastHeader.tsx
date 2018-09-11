import * as React from 'react';
import { View, Animated, StyleSheet, ViewStyle, Dimensions, Image, Platform } from 'react-native';
import { DeviceConfig } from '../../DeviceConfig';
import { FastHistoryManager } from '../../FastHistory';
import { FastBlurredView } from '../utils/FastBlurView';
import { FastHeaderTitle } from './FastHeaderTitle';
import { NormalizedRoute, BACKGROUND_SIZE } from './types';
import { buildDerivedContexts } from './FastHeaderDerivedState';
import { FastHeaderBackButton } from '../../views/FastHeaderBackButton';

let styles = StyleSheet.create({
    titleWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    } as ViewStyle,
    backgroundContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
        overflow: 'hidden'
    } as ViewStyle,
    container: {
        flexGrow: 1,
        flexBasis: 0,
        zIndex: 4
    } as ViewStyle,
    styleMainContainerTransparent: {
        overflow: 'visible',
        flexDirection: 'row',
        height: DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight,
        paddingTop: DeviceConfig.statusBarHeight,
    } as ViewStyle,
    styleMainContainerTransparentSearch: {
        marginTop: -DeviceConfig.navigationBarHeightLarge
    },
    hairline: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 0.5,
        backgroundColor: '#b7bdc6',
        zIndex: 10,
    } as ViewStyle,
});

export interface FastHeaderProps {
    routes: NormalizedRoute[];
    history: FastHistoryManager;
}
export class FastHeader extends React.PureComponent<FastHeaderProps> {

    lastIndex = 0;

    // Back Button
    handleBack = () => {
        this.props.history.pop();
    }

    render() {
        let contexts = buildDerivedContexts(this.props.routes);

        // let renderedContexts = [];
        return contexts.map((ctx, i) => {
            let titles: any[] = [];
            for (let s of ctx.routes) {
                if (!s.route.mounted) {
                    continue;
                }
                let headerText = s.route.config.title;
                let headerView = s.route.config.titleView ? s.route.config.titleView() : undefined;
                let rightView = undefined;
                if (s.route.config.buttons.length > 0) {
                    rightView = <View>{s.route.config.buttons.map((v) => <View key={'button-' + v.id}>{v.render()}</View>)}</View>;
                }

                let header = (
                    <View style={styles.titleWrapper} pointerEvents="box-none" key={s.route.record.key}>
                        <FastHeaderTitle
                            contentOffset={s.contentOffset}
                            index={1}
                            progress={s.position}
                            headerAppearance={s.route.config.appearance || 'large'}
                            appearance={Platform.OS === 'android' ? 'android' : 'ios'}
                            titleText={headerText}
                            titleView={headerView}
                            rightView={rightView}
                            headerHeight={ctx.hairlineOffset}
                            headerBaseHeight={s.headerBottom}
                            searchProgress={s.route.searchProgress}
                            config={s.route.config}
                            route={s.route.record.key}
                        />
                    </View>
                );

                titles.push(header);
            }

            let searchActive = !!(ctx.routes[0].route.config.search && ctx.routes[0].route.config.searchActive);

            //
            // Complete Render
            //

            let content = (
                <>
                    {/* Back button */}
                    <Animated.View
                        style={{
                            height: DeviceConfig.navigationBarHeight,
                            position: 'absolute',
                            left: 0,
                            top: DeviceConfig.statusBarHeight,
                            width: DeviceConfig.navigationBarBackWidth,
                            opacity: ctx.backOpacity,
                            zIndex: 3,
                            backgroundColor: Platform.OS === 'android' ? DeviceConfig.navigationBarBackgroundColor : undefined
                        }}
                    >
                        <FastHeaderBackButton onPress={this.handleBack} />
                    </Animated.View>

                    {/* Content */}
                    <View style={styles.container} pointerEvents="box-none">
                        {titles}
                    </View>

                    {/* Background */}
                    <View style={[styles.backgroundContainer, searchActive && { marginTop: -88 }]} pointerEvents="box-none">
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                transform: [
                                    { translateY: searchActive ? -BACKGROUND_SIZE + 88 + 44 + 44 : ctx.backgroundOffset }
                                ],
                                height: BACKGROUND_SIZE,
                                zIndex: 1
                            }}
                        >
                            {!DeviceConfig.debugBackground && (
                                <FastBlurredView
                                    style={{
                                        height: BACKGROUND_SIZE,
                                        width: '100%',
                                    }}
                                />)
                            }
                            {DeviceConfig.debugBackground && (
                                <View
                                    style={{
                                        height: BACKGROUND_SIZE,
                                        width: '100%',
                                        backgroundColor: '#0f0'
                                    }}
                                />
                            )}
                        </Animated.View>
                    </View>

                    {/* Hairline */}
                    <Animated.View
                        style={[styles.hairline, {
                            transform: [
                                { translateY: 88 },
                            ],
                            opacity: Animated.multiply(ctx.hairlineOpacity, 0.3),
                        }]}
                    />

                </>
            );

            if (DeviceConfig.navigationBarTransparent) {
                return (
                    <Animated.View
                        key={ctx.key}
                        pointerEvents="box-none"
                        style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            // width: ''
                            transform: [{ translateX: ctx.positionContainer }],
                            zIndex: 100
                        }}
                    >
                        <Animated.View
                            style={[
                                styles.styleMainContainerTransparent,
                                {
                                    transform: [{ translateX: ctx.positionContent }]
                                }
                            ]}
                        >
                            {content}
                        </Animated.View>

                        <Animated.View
                            style={{
                                zIndex: 100,
                                opacity: ctx.routes[0].route.searchProgress,
                                marginTop: searchActive ? 88 : 88 + 88 + 12,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0
                            }}
                            pointerEvents={searchActive ? 'auto' : 'box-none'}
                        >
                            {}
                        </Animated.View>

                        <Animated.View
                            key="shadow"
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                opacity: ctx.positionShadow,
                                backgroundColor: '#000',
                                zIndex: 1000,
                                transform: [{ translateY: ctx.backgroundOffset }],
                            }}
                            pointerEvents="none"
                        />
                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View
                        style={{
                            overflow: 'visible',
                            flexDirection: 'row',
                            height: DeviceConfig.navigationBarHeight + DeviceConfig.statusBarHeight,
                            backgroundColor: DeviceConfig.navigationBarBackgroundColor,
                            paddingTop: DeviceConfig.statusBarHeight,
                            transform: [{ translateX: ctx.positionContent }]
                        }}
                    >
                        {content}
                        {Platform.OS === 'android' && (
                            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
                                <Image source={require('assets/corner_left.png')} />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}>
                                <Image source={require('assets/corner_right.png')} />
                            </View>
                        )}
                    </Animated.View>
                );
            }
        });
    }
}
import * as React from 'react';
import { Animated, View, Text, StyleSheet, TextStyle, Dimensions, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { FastHeaderTitleProps } from './FastHeaderTitle';
import { DeviceConfig } from '../../DeviceConfig';
import { FastScrollValue } from '../../FastScrollValue';
import { FastHeaderBackButton } from '../../views/FastHeaderBackButton';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { SAnimated } from 'react-native-s/SAnimated';

const styles = StyleSheet.create({
    title: {
        color: '#000',
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 44
    } as TextStyle,
    titleLarge: {
        color: '#000',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 52,
        paddingLeft: 15
    } as TextStyle
});

export class FastHeaderTitleIOS extends React.PureComponent<FastHeaderTitleProps> {

    titleProgress = new Animated.Value(0);
    showed = false;
    subscribedValue: FastScrollValue | null = null;
    subscribed: string | null = null;

    private handleOffset = () => {
        if (!this.subscribedValue) {
            return;
        }
        let value = this.subscribedValue!!.offsetValue;
        // console.log('Offset: ' + state.value);
        let delta = this.props.config.search ? 92 : 32;
        if (value > delta) {
            if (!this.showed) {
                this.showed = true;
                Animated.timing(this.titleProgress, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        } else {
            if (this.showed) {
                this.showed = false;
                Animated.timing(this.titleProgress, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        }
    }

    componentWillMount() {
        this.subscribed = this.props.contentOffset.offset.addListener(this.handleOffset);
        this.subscribedValue = this.props.contentOffset;
        this.handleOffset();
    }

    componentWillUnmount() {
        if (this.subscribed) {
            this.subscribedValue!!.offset.removeListener(this.subscribed);
            this.subscribed = null;
            this.subscribedValue = null;
        }
    }

    componentWillReceiveProps(nextProps: FastHeaderTitleProps) {

        // Resubscribe
        if (this.subscribedValue !== nextProps.contentOffset) {
            if (this.subscribed) {
                this.subscribedValue!!.offset.removeListener(this.subscribed);
                this.subscribed = null;
                this.subscribedValue = null;
            }
            this.subscribed = nextProps.contentOffset.offset.addListener(this.handleOffset);
            this.subscribedValue = nextProps.contentOffset;
            let delta = nextProps.config.search ? 92 : 32;
            if (this.subscribedValue.offsetValue > delta) {
                this.showed = true;
                this.titleProgress.setValue(1);
            } else {
                this.showed = false;
                this.titleProgress.setValue(0);
            }
        }
    }

    handleSearchClose = () => {
        //
    }

    render() {
        let invertedSearchProgress = Animated.add(1, Animated.multiply(this.props.searchProgress, -1));

        const mainHeader = (
            <SAnimated.View name={AnimatedViewKeys.headerContent(this.props.route)} style={{ opacity: 0, flexDirection: 'row', width: '100%' }} pointerEvents="box-none">
                {/* <View key="main-header" style={{ flexDirection: 'row', flexWrap: 'nowrap' }} pointerEvents="box-none"> */}
                <View key="left-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 150 }} pointerEvents="none">
                    {this.props.index === 0 && <View width={0} opacity={0} pointerEvents="none" />}
                    {this.props.index !== 0 && <View pointerEvents="none" opacity={0}><FastHeaderBackButton /></View>}
                </View>
                {/* <View style={{ flexGrow: this.state.leftSize, flexBasis: this.state.leftSize }} pointerEvents="box-none" /> */}
                {/* {this.state.rightSize - this.state.leftSize > 0 && <View style={{ flexGrow: this.state.rightSize - this.state.leftSize, flexBasis: this.state.rightSize - this.state.leftSize, flexShrink: 100000 }} pointerEvents="box-none" />} */}
                <SAnimated.View name={AnimatedViewKeys.headerTitle(this.props.route)} style={{ flexShrink: 1, flexGrow: 1, flexDirection: 'column' }} pointerEvents="box-none">
                    {!this.props.titleView && this.props.titleText && <Text style={styles.title}>{this.props.titleText}</Text>}
                    {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                    {this.props.titleView}
                </SAnimated.View>
                {/* {this.state.rightSize - this.state.leftSize < 0 && <View style={{ flexGrow: -(this.state.rightSize - this.state.leftSize), flexBasis: -(this.state.rightSize - this.state.leftSize), flexShrink: 100000 }} pointerEvents="box-none" />} */}
                {/* <View style={{ flexGrow: this.state.rightSize, flexBasis: this.state.rightSize }} pointerEvents="box-none" /> */}
                <View key="right-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, alignItems: 'center' }} pointerEvents="box-none">
                    {this.props.rightView}
                </View>
                {/* </View> */}

                {/* <View key="left-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 150 }} onLayout={this.handleLeftLayout} pointerEvents="none">
                    {this.props.index === 0 && <View width={0} opacity={0} pointerEvents="none" />}
                    {this.props.index !== 0 && <View pointerEvents="none" opacity={0}><FastHeaderBackButton /></View>}
                </View>
                <View key="button-padding" style={{ flexGrow: 1, flexBasis: 0, opacity: 0, }} pointerEvents="box-none" /> */}
                {/* <View key="right-render" style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, alignItems: 'center' }} onLayout={this.handleRightLayout} pointerEvents="box-none">
                    {this.props.rightView}
                </View> */}
            </SAnimated.View>
        );

        const largeHeader = this.props.headerAppearance === 'large' && (
            <SAnimated.View name={AnimatedViewKeys.headerTitleLarge(this.props.route)} key="large-header" style={{ overflow: 'hidden', position: 'absolute', top: DeviceConfig.navigationBarHeight, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap', height: Dimensions.get('window').height }} pointerEvents="none">
                <Animated.View
                    style={{
                        flexShrink: 1,
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        opacity: invertedSearchProgress,
                        transform: [
                            {
                                translateY: Animated.add(this.props.headerBaseHeight, -(DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight))
                            }
                        ]
                    }}
                    pointerEvents="none"
                >
                    {!this.props.titleView && this.props.titleText && <Text style={styles.titleLarge}>{this.props.titleText}</Text>}
                    {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                </Animated.View>
            </SAnimated.View>
        );

        let search: any | undefined;
        let translateGlobal = 0;
        if (this.props.config.search) {
            let translate = this.props.config.searchActive ? 0 : Animated.add(this.props.headerHeight, -(DeviceConfig.navigationBarHeightLarge + DeviceConfig.statusBarHeight + DeviceConfig.navigationBarHeight));
            let translateStatic = this.props.config.searchActive ? DeviceConfig.statusBarHeight : 0;
            translateGlobal = this.props.config.searchActive ? -DeviceConfig.navigationBarHeightLarge - DeviceConfig.statusBarHeight : 0;
            search = (
                <SAnimated.View name={AnimatedViewKeys.headerSearch(this.props.route)} style={{ position: 'absolute', overflow: 'hidden', top: DeviceConfig.navigationBarHeightLarge + translateStatic, left: 0, right: 0, height: Dimensions.get('window').height }} pointerEvents="box-none">
                    <Animated.View style={{ lexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', height: 44, transform: [{ translateY: translate }] }} pointerEvents="box-none">
                        <View style={{ flexDirection: 'row', height: 36, marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={this.props.config.searchPress}>
                                <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1 }}>
                                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#8a8a8f', height: 36, opacity: 0.12, borderRadius: 8 }} />
                                    <Image source={require('assets/ic-search.png')} style={{ width: 14, height: 14, marginLeft: 13, marginRight: 7 }} />
                                    <Text style={{ fontSize: 16, color: 'rgba(138, 138, 143, 0.75)', lineHeight: 22 }}>Seach</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View
                                style={{
                                    opacity: this.props.config.searchActive ? 1 : 0,
                                    marginLeft: 15,
                                    marginRight: this.props.config.searchActive ? 0 : -70,
                                    width: 70 - 15
                                }}
                            >
                                <Animated.View opacity={this.props.searchProgress}>
                                    <Button title="Close" onPress={this.props.config.searchClosed!!} />
                                </Animated.View>
                            </View>
                        </View>
                    </Animated.View>
                </SAnimated.View>
            );
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: translateGlobal }} pointerEvents="box-none">
                {mainHeader}
                {largeHeader}
                {search}
            </View>
        );
    }
}
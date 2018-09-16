import * as React from 'react';
import { View, TouchableWithoutFeedback, Platform, Image, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SuperEllipseMask from 'react-native-super-ellipse-mask';
import { ZCounter } from './ZCounter';
import { SDevice } from 'react-native-s/SDevice';
import { BlurView } from 'react-native-blur';

export class ZBottomTabs extends React.PureComponent<{ selected: number, counter: number, onPress: (tab: number) => void }> {
    handlePress1 = () => {
        this.props.onPress(0);
    }
    handlePress2 = () => {
        this.props.onPress(1);
    }
    handlePress3 = () => {
        this.props.onPress(2);
    }
    handlePress4 = () => {
        this.props.onPress(3);
    }
    render() {

        let selectedColor = '#fff';
        let unselectedColor = '#C8C8F9';
        if (Platform.OS !== 'ios') {
            selectedColor = AppStyles.primaryColor;
            unselectedColor = '#C8C8F9';
        }
        let size = 29;

        let content = (
            <View
                style={{
                    height: 56,

                    // borderRadius: 24,
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 0 },
                    // shadowRadius: 5,
                    flexDirection: 'row',
                }}
            >
                <TouchableWithoutFeedback onPressIn={this.handlePress1} delayPressIn={0}>
                    <View
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 5
                        }}
                    >
                        <Image source={require('assets/ic-home-ios.png')} style={{ width: size, height: size, opacity: this.props.selected === 0 ? 1 : 0.6 }} resizeMode="contain" />
                        <Text style={{ color: '#fff', fontSize: 12, marginTop: 2, opacity: this.props.selected === 0 ? 1 : 0.6 }}>Feed</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPressIn={this.handlePress2} delayPressIn={0}>
                    <View
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View style={{ width: 29, height: 29, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Ionicons name={'ios-chatbubbles'} size={25} color={this.props.selected === 1 ? selectedColor : unselectedColor} /> */}
                            <Image source={require('assets/ic-messages-ios.png')} style={{ width: size, height: size, opacity: this.props.selected === 1 ? 1 : 0.6 }} resizeMode="contain" />
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 2
                                }}
                            >
                                <ZCounter value={this.props.counter} appearance="contrast" />
                            </View>
                        </View>
                        <Text style={{ color: '#fff', fontSize: 12, marginTop: 2, opacity: this.props.selected === 1 ? 1 : 0.6 }}>Messages</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPressIn={this.handlePress3} delayPressIn={0}>
                    <View
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 5
                        }}
                    >
                        {/* <Ionicons name={'ios-contact'} size={25} color={this.props.selected === 2 ? selectedColor : unselectedColor} /> */}
                        <Image source={require('assets/ic-directory-ios.png')} style={{ width: size, height: size, opacity: this.props.selected === 2 ? 1 : 0.6 }} resizeMode="contain" />
                        <Text style={{ color: '#fff', fontSize: 12, marginTop: 2, opacity: this.props.selected === 2 ? 1 : 0.6 }}>Directory</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPressIn={this.handlePress4} delayPressIn={0}>
                    <View
                        style={{
                            flexBasis: 0,
                            flexGrow: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 5
                        }}
                    >
                        {/* <Ionicons name={'ios-cog'} size={25} color={this.props.selected === 3 ? selectedColor : unselectedColor} /> */}
                        <Image source={require('assets/ic-settings-ios.png')} style={{ width: size, height: size, opacity: this.props.selected === 3 ? 1 : 0.6 }} resizeMode="contain" />
                        <Text style={{ color: '#fff', fontSize: 12, marginTop: 2, opacity: this.props.selected === 3 ? 1 : 0.6 }}>Settings</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

        if (Platform.OS === 'ios') {
            return (
                <View
                    style={{
                        backgroundColor: '#4256f4',
                        height: 56 + SDevice.safeArea.bottom,
                        paddingBottom: SDevice.safeArea.bottom
                    }}
                >
                    {content}
                </View>
            );
        }

        return (
            <View
                style={{
                    // marginBottom: 5,
                    // marginLeft: 10,
                    // marginRight: 10,
                    backgroundColor: '#49288f',
                    // borderRadius: 24,
                    height: 56,
                    elevation: 16
                }}
            >
                {content}
            </View>
        );
    }
}
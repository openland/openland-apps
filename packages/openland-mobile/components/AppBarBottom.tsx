import * as React from 'react';
import { View, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { AppStyles } from '../styles/AppStyles';
import { ZCounter } from './ZCounter';

export interface AppBarBottomItemProps {
    title: string;
    icon?: any;
    selected?: boolean;
    counter?: number;
    onPress?: () => void;
}

export class AppBarBottomItem extends React.PureComponent<AppBarBottomItemProps> {
    render() {
        let size = Platform.OS === 'android' ? 22 : 28;
        return (
            <TouchableWithoutFeedback onPressIn={this.props.onPress} delayPressIn={0}>
                <View
                    style={{
                        flexBasis: 0,
                        flexGrow: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={this.props.icon}
                            resizeMode="contain"
                            style={{
                                width: size,
                                height: size,
                                opacity: 1,
                                tintColor: Platform.OS === 'android' ? (this.props.selected ? '#0284FE' : '#737373') : (this.props.selected ? AppStyles.primaryColor : '#99a2b0')
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -2,
                                right: -5
                            }}
                        >
                            {this.props.counter !== undefined && (<ZCounter value={this.props.counter} appearance="contrast" />)}
                        </View>
                    </View>
                    <Text
                        style={{
                            color: Platform.OS === 'android' ? (this.props.selected ? '#0284FE' : '#000000') : (this.props.selected ? AppStyles.primaryColor : '#99a2b0'),
                            fontSize: Platform.OS === 'android' ? 14 : 12,
                            fontWeight: Platform.OS === 'android' ? '500' : '400',
                            lineHeight: Platform.OS === 'android' ? 18 : 16,
                            height: Platform.OS === 'android' ? 18 : 16,
                            overflow: 'visible',
                            opacity: Platform.OS === 'android' ? (this.props.selected ? 1 : 0.5) : 1
                        }}
                    >
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export class AppBarBottom extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    paddingBottom: SDevice.safeArea.bottom,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    // shadowColor: '#000',
                    // shadowOpacity: 0.2,
                    // shadowOffset: { width: 0, height: 1 }
                }}
            >
                <View style={{ height: 1, backgroundColor: AppStyles.separatorColor, opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', height: Platform.OS === 'android' ? 56 : 48 }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
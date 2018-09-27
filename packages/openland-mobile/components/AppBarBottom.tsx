import * as React from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
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
                            width: 25,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={this.props.icon}
                            resizeMode="center"
                            style={{
                                width: 25,
                                height: 25,
                                opacity: this.props.selected ? 1 : 0.6,
                                tintColor: AppStyles.primaryColor
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: 4,
                                right: 2
                            }}
                        >
                            {this.props.counter !== undefined && (<ZCounter value={this.props.counter} appearance="contrast" />)}
                        </View>
                    </View>
                    <Text
                        style={{
                            color: AppStyles.primaryColor,
                            fontSize: 12,
                            marginTop: 2,
                            opacity: this.props.selected ? 1 : 0.6
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
                    alignItems: 'stretch'
                }}
            >
                <View style={{ height: 0.5, backgroundColor: AppStyles.separatorColor }} />
                <View style={{ flexDirection: 'row', height: 48 }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
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
                            width: 28,
                            height: 28,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={this.props.icon}
                            resizeMode="stretch"
                            style={{
                                width: 28,
                                height: 28,
                                opacity: this.props.selected ? 1 : 1,
                                tintColor: this.props.selected ? '#fff' : '#99a2b0'
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
                            color: this.props.selected ? '#fff' : '#99a2b0',
                            fontSize: 12,
                            lineHeight: 16,
                            height: 16,
                            overflow: 'visible',
                            opacity: this.props.selected ? 1 : 1
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
                    backgroundColor: '#354856',
                    paddingBottom: SDevice.safeArea.bottom,
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}
            >
                {/* <View style={{ height: 1, backgroundColor: AppStyles.separatorColor }} /> */}
                <View style={{ flexDirection: 'row', height: 48 }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
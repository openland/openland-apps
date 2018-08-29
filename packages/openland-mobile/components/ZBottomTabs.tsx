import * as React from 'react';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SuperEllipseMask from 'react-native-super-ellipse-mask';
import { ZCounter } from './ZCounter';

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
    render() {

        let content = (
            <View
                style={{
                    height: 48,

                    // borderRadius: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 5,
                    flexDirection: 'row'
                }}
            >
                <TouchableWithoutFeedback onPressIn={this.handlePress1} delayPressIn={0}>
                    <View
                        style={{
                            flexGrow: 1,
                            flexBasis: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 5
                        }}
                    >
                        <Ionicons name={'ios-flame'} size={25} color={this.props.selected === 0 ? '#fff' : '#C8C8F9'} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPressIn={this.handlePress2} delayPressIn={0}>
                    <View
                        style={{
                            flexGrow: 1,
                            flexBasis: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View style={{ width: 48, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={'ios-chatbubbles'} size={25} color={this.props.selected === 1 ? '#fff' : '#C8C8F9'} />
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
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPressIn={this.handlePress3} delayPressIn={0}>
                    <View
                        style={{
                            flexGrow: 1,
                            flexBasis: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 5
                        }}
                    >
                        <Ionicons name={'ios-cog'} size={25} color={this.props.selected === 2 ? '#fff' : '#C8C8F9'} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

        if (Platform.OS === 'ios') {
            return (
                <View
                    style={{
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    <SuperEllipseMask
                        radius={16}
                        style={{
                            height: 48,
                            backgroundColor: AppStyles.primaryColor
                        }}
                    >
                        {content}
                    </SuperEllipseMask>
                </View>
            );
        }

        return (
            <View
                style={{
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    backgroundColor: AppStyles.primaryColor,
                    borderRadius: 24,
                    height: 48,
                }}
            >
                {content}
            </View>
        );
    }
}
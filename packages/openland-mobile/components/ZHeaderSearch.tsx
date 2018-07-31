import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { View, Animated } from 'react-native';
import { ZKeyboardAvoidingView } from './ZKeyboardAvoidingView';

export class ZHeaderSearch extends React.PureComponent<{ show: boolean, navigation: NavigationScreenProp<NavigationParams> }> {

    private lastValue = false;
    private contentOffset = new Animated.Value(0);

    componentDidMount() {
        this.props.navigation.setParams({ '__z_header_actions_search': this.props.show });
        this.props.navigation.setParams({ '__z_header_actions_search_offset': this.contentOffset });
        this.lastValue = this.props.show;
    }
    componentDidUpdate() {
        if (this.lastValue !== this.props.show) {
            this.props.navigation.setParams({ '__z_header_actions_search': this.props.show });
            this.lastValue = this.props.show;
        }
    }
    componentWillUnmount() {
        this.props.navigation.setParams({ '__z_header_actions_search': false, '__z_header_actions_search_offset': undefined });
    }

    render() {
        return (
            <ZKeyboardAvoidingView>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={1}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View height={58} />
                    {this.props.children}
                </Animated.ScrollView>
            </ZKeyboardAvoidingView>
        );
    }
}
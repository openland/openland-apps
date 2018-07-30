import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ScrollView, Animated } from 'react-native';

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
            <Animated.ScrollView
                paddingTop={44}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={1}
            >
                {this.props.children}
            </Animated.ScrollView>
        );
    }
}
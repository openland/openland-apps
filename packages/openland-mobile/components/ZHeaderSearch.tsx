import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { View, Animated, ViewStyle } from 'react-native';
import { ZKeyboardAvoidingView } from './ZKeyboardAvoidingView';

export class ZHeaderSearch extends React.Component<{ useParent?: boolean, navigation: NavigationScreenProp<NavigationParams> }> {

    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );
    // Work-around for freezing navive animation driver
    private scrollViewStyle = {
        opacity: Animated.add(1, Animated.multiply(0, this.contentOffset))
    } as any;

    componentDidMount() {
        this.contentOffset.addListener((v) => console.log(v));
        if (this.props.useParent) {
            let parent = (this.props.navigation as any).dangerouslyGetParent() as NavigationScreenProp<NavigationParams>;
            let routeName = this.props.navigation.state.routeName;
            if (parent) {
                parent.setParams({ ['__z_header_' + routeName + 'actions_search_offset']: this.contentOffset });
            }
        } else {
            this.props.navigation.setParams({ '__z_header_actions_search_offset': this.contentOffset });
        }
    }

    render() {
        return (
            <ZKeyboardAvoidingView>
                <Animated.ScrollView
                    style={this.scrollViewStyle}
                    onScroll={this.contentOffsetEvent}
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
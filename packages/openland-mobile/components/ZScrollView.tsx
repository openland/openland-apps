import * as React from 'react';
import { ScrollViewProps, Animated } from 'react-native';
import { ZSafeAreaContext } from './layout/ZSafeAreaContext';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';

export interface ZScrollViewProps extends ScrollViewProps {
    syncWithBar?: boolean;
    adjustPaddings?: 'all' | 'top' | 'bottom' | 'none';
}

export class ZScrollView extends React.Component<ZScrollViewProps> {

    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );

    render() {
        let { syncWithBar, adjustPaddings, ...other } = this.props;
        return (
            <>
                <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} />
                <ZSafeAreaContext.Consumer>
                    {area => {
                        return (
                            <Animated.ScrollView
                                keyboardDismissMode="interactive"
                                {...other}
                                style={[other.style, {
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset)),
                                    backgroundColor: '#fff'
                                }]}
                                onScroll={this.contentOffsetEvent}
                                scrollEventThrottle={1}
                                scrollIndicatorInsets={{
                                    bottom: area.bottom,
                                    top: area.top
                                }}
                                contentContainerStyle={{
                                    paddingTop: area.top,
                                    paddingBottom: area.bottom
                                }}
                            >
                                {this.props.children}
                            </Animated.ScrollView>
                        );
                    }}
                </ZSafeAreaContext.Consumer>
            </>
        );
    }
}
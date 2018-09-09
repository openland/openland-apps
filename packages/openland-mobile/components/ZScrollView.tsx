import * as React from 'react';
import { ScrollViewProps, Animated } from 'react-native';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { FastScrollValue } from 'react-native-fast-navigation/FastScrollValue';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

export interface ZScrollViewProps extends ScrollViewProps {
    syncWithBar?: boolean;
    adjustPaddings?: 'all' | 'top' | 'bottom' | 'none';
}

export class ZScrollView extends React.Component<ZScrollViewProps> {
    private contentOffset = new FastScrollValue();

    render() {
        let { syncWithBar, adjustPaddings, ...other } = this.props;
        return (
            <>
                <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} />
                <ASSafeAreaContext.Consumer>
                    {area => {
                        return (
                            <Animated.ScrollView
                                keyboardDismissMode="interactive"
                                {...other}
                                style={[other.style, {
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                    backgroundColor: '#fff'
                                }]}
                                onScroll={this.contentOffset.event}
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
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}
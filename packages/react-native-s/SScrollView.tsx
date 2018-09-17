import * as React from 'react';
import { ScrollViewProps, Animated, Platform } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { STrackedValue } from './STrackedValue';

export interface SScrollViewProps extends ScrollViewProps {
    syncWithBar?: boolean;
    adjustPaddings?: 'all' | 'top' | 'bottom' | 'none';
}

export class SScrollView extends React.Component<SScrollViewProps> {
    private contentOffset = new STrackedValue();

    render() {
        let { syncWithBar, adjustPaddings, ...other } = this.props;
        return (
            <>
                <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                <ASSafeAreaContext.Consumer>
                    {area => {
                        return (
                            <Animated.ScrollView
                                keyboardDismissMode="interactive"
                                {...other}
                                style={[other.style, {
                                    backgroundColor: Platform.OS === 'ios' ? '#fff' : undefined,
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset))
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
import * as React from 'react';
import { ScrollViewProps, Animated, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { STrackedValue } from './STrackedValue';

export interface SScrollViewProps extends ScrollViewProps {
    syncWithBar?: boolean;
    adjustPaddings?: 'all' | 'top' | 'bottom' | 'none';
    safeAreaViaMargin?: boolean;
    onScrollListener?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollRef?: React.RefObject<ScrollView>;
}

export class SScrollView extends React.Component<SScrollViewProps> {
    private contentOffset = new STrackedValue();

    render() {
        let { syncWithBar, adjustPaddings, scrollRef, ...other } = this.props;
        return (
            <>
                <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                <ASSafeAreaContext.Consumer>
                    {area => {
                        return (
                            <Animated.ScrollView
                                keyboardShouldPersistTaps="handled"
                                keyboardDismissMode="interactive"
                                {...other}
                                ref={scrollRef}
                                style={[other.style, {
                                    // backgroundColor: Platform.OS === 'ios' ? '#fff' : undefined,
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                    marginBottom: this.props.safeAreaViaMargin ? area.bottom : undefined
                                }]}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.contentOffset.offset } } }],
                                    {
                                        useNativeDriver: true,
                                        listener: this.props.onScrollListener as any
                                    }
                                )}
                                scrollEventThrottle={1}
                                scrollIndicatorInsets={{
                                    bottom: area.bottom,
                                    top: area.top
                                }}
                                contentContainerStyle={{
                                    paddingTop: area.top,
                                    paddingBottom: !this.props.safeAreaViaMargin ? area.bottom : undefined
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
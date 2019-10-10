import * as React from 'react';
import { Animated, FlatListProps, View } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { STrackedValue } from './STrackedValue';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

export interface SFlatListProps<T> extends FlatListProps<T> {
    safeAreaViaMargin?: boolean;
}

export class SFlatList<T> extends React.Component<SFlatListProps<T>> {
    private contentOffset = new STrackedValue();

    renderLoader = (
        <View height={56} alignItems="center" justifyContent="center">
            <LoaderSpinner />
        </View>
    );

    render() {
        let { safeAreaViaMargin, legacyImplementation, onEndReachedThreshold, refreshing, ListFooterComponent, ...other } = this.props;
        let AnimatedFlatList = (Animated as any).FlatList;
        return (
            <>
                <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                <ASSafeAreaContext.Consumer>
                    {area => {
                        return (
                            <AnimatedFlatList<T>
                                keyboardShouldPersistTaps="always"
                                keyboardDismissMode="interactive"
                                {...other}
                                style={{
                                    // backgroundColor: Platform.OS === 'ios' ? '#fff' : undefined,
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                    marginBottom: safeAreaViaMargin ? area.bottom : undefined
                                }}
                                onScroll={this.contentOffset.event}
                                scrollEventThrottle={1}
                                scrollIndicatorInsets={{
                                    bottom: area.bottom,
                                    top: area.top
                                }}
                                contentContainerStyle={{
                                    paddingTop: area.top,
                                    paddingBottom: !safeAreaViaMargin ? area.bottom : undefined
                                }}
                                legacyImplementation={true}
                                onEndReachedThreshold={1}
                                refreshing={refreshing}
                                ListFooterComponent={refreshing ? this.renderLoader : ListFooterComponent}
                            />
                        );
                    }}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}
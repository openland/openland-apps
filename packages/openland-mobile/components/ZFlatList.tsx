import * as React from 'react';
import { FlatList, FlatListProps, Animated } from 'react-native';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { FastScrollValue } from 'react-native-fast-navigation/FastScrollValue';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface ZFlatListProps<T> extends FlatListProps<T> {
    syncWithBar?: boolean;
    fixedHeight?: number;
}

export class ZFlatListComponent<T> extends React.PureComponent<ZFlatListProps<T> & { insets: { top: number, bottom: number } }> {

    private contentOffset = new FastScrollValue();

    render() {

        let { syncWithBar, fixedHeight, ...other } = this.props;

        return (
            <>
                <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} />
                <AnimatedFlatList
                    removeClippedSubviews={true}
                    {...other}
                    style={[other.style, {
                        // Work-around for freezing navive animation driver
                        opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                    }]}
                    contentContainerStyle={this.props.inverted ?
                        {
                            paddingBottom: this.props.insets.top,
                            paddingTop: this.props.insets.bottom
                        } : {
                            paddingTop: this.props.insets.top,
                            paddingBottom: this.props.insets.bottom
                        }}
                    scrollIndicatorInsets={{
                        bottom: this.props.insets.bottom,
                        top: this.props.insets.top
                    }}
                    onScroll={this.contentOffset.event}
                    scrollEventThrottle={1}
                    {...fixedHeight ? {
                        getItemLayout: (item: any, index: number) => ({ offset: index * fixedHeight!!, length: fixedHeight, index })
                    } : {}}
                />
            </>
        );
    }
}

export const ZFlatList = function <T>(props: ZFlatListProps<T>) {
    return (
        <ASSafeAreaContext.Consumer>
            {(area) => <ZFlatListComponent {...props} insets={area} />}
        </ASSafeAreaContext.Consumer>
    );
};
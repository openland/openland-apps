import * as React from 'react';
import { FlatList, FlatListProps, Animated } from 'react-native';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZSafeAreaContext } from './layout/ZSafeAreaContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface ZFlatListProps<T> extends FlatListProps<T> {
    syncWithBar?: boolean;
    fixedHeight?: number;
}

export class ZFlatListComponent<T> extends React.PureComponent<ZFlatListProps<T> & { insets: { top: number, bottom: number } }> {

    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );

    render() {

        let { syncWithBar, fixedHeight, ...other } = this.props;

        return (
            <>
                <ZHeaderConfigRegistrator config={new ZHeaderConfig({ contentOffset: this.contentOffset })} />
                <AnimatedFlatList
                    {...other}
                    style={[other.style, {
                        // Work-around for freezing navive animation driver
                        opacity: Animated.add(1, Animated.multiply(0, this.contentOffset)),
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
                    onScroll={this.contentOffsetEvent}
                    scrollEventThrottle={1}
                    {...fixedHeight ? {
                        getItemLayout: (item: any, index: number) => ({ offset: index * fixedHeight!!, length: fixedHeight, index })
                    } : {}}
                />
            </>
        );
    }
}

export const ZFlatList = function <T>(props: ZFlatListProps<T> ) {
    return (
        <ZSafeAreaContext.Consumer>
            {(area) => <ZFlatListComponent {...props} insets={area} />}
        </ZSafeAreaContext.Consumer>
    );
};
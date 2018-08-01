import * as React from 'react';
import { FlatList, FlatListProps, Animated } from 'react-native';
import { ZAppContentContext, ZAppContentProvider } from './ZAppContent';
import { ZAppConfig } from './ZAppConfig';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface ZFlatListProps<T> extends FlatListProps<T> {
    syncWithBar?: boolean;
}

export class ZFlatListComponent<T> extends React.PureComponent<ZFlatListProps<T> & { provider: ZAppContentProvider }> {

    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );

    componentDidMount() {
        if (this.props.syncWithBar !== false) {
            this.props.provider.registerScroller(this.contentOffset);
        }
    }

    render() {

        let { syncWithBar, provider, ...other } = this.props;

        return (
            <AnimatedFlatList
                {...other}
                style={[other.style, {
                    // Work-around for freezing navive animation driver
                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset)),
                }]}
                contentContainerStyle={this.props.inverted ?
                    {
                        paddingTop: provider.topContentInset
                    } : {
                        paddingTop: provider.topContentInset
                    }}
                onScroll={this.contentOffsetEvent}
                scrollEventThrottle={1}
            />
        );
    }
}

export const ZFlatList = function <T>(props: FlatListProps<T>) {
    return (
        <ZAppContentContext.Consumer>
            {(context) => <ZFlatListComponent {...props} provider={context!!} />}
        </ZAppContentContext.Consumer>
    );
};
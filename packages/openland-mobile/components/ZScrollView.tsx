import * as React from 'react';
import { ScrollViewProps, Animated, View } from 'react-native';
import { ZAppContentContext, ZAppContentProvider } from './ZAppContent';
import { ZAppConfig } from './ZAppConfig';

export interface ZScrollViewProps extends ScrollViewProps {
    syncWithBar?: boolean;
    adjustPaddings?: 'all' | 'top' | 'bottom' | 'none';
}

class ZScrollViewComponent extends React.Component<ZScrollViewProps & { provider: ZAppContentProvider }> {

    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );

    componentDidMount() {
        this.contentOffset.addListener((v) => console.log(v));
        if (this.props.syncWithBar !== false) {
            this.props.provider.registerScroller(this.contentOffset);
        }
    }

    render() {
        let { syncWithBar, provider, adjustPaddings, ...other } = this.props;
        return (
            <Animated.ScrollView
                {...other}
                style={[other.style, {
                    // Work-around for freezing navive animation driver
                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset)),
                }]}
                onScroll={this.contentOffsetEvent}
                scrollEventThrottle={1}
            >
                {(!adjustPaddings || adjustPaddings === 'all' || adjustPaddings === 'top') &&
                    <View height={provider.topContentInset} />
                }

                {this.props.children}
            </Animated.ScrollView>
        );
    }
}

export const ZScrollView = (props: ZScrollViewProps & { children?: any }) => {
    return (
        <ZAppContentContext.Consumer>
            {(context) => <ZScrollViewComponent {...props} provider={context!!}>{props.children}</ZScrollViewComponent>}
        </ZAppContentContext.Consumer>
    );
};
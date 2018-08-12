import * as React from 'react';
import { ScrollViewProps, Animated } from 'react-native';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZSafeAreaContext } from './layout/ZSafeAreaContext';

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
                <ZHeaderConfigRegistrator config={new ZHeaderConfig({ contentOffset: this.contentOffset })} />
                <ZSafeAreaContext.Consumer>
                    {area => (
                        <Animated.ScrollView
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
                            keyboardDismissMode="interactive"
                        >
                            {this.props.children}
                        </Animated.ScrollView>
                    )}
                </ZSafeAreaContext.Consumer>
            </>
        );
    }
}
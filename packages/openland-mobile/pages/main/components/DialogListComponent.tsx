import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { MobileMessenger } from '../../../messenger/MobileMessenger';
import { Animated } from 'react-native';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';

export class DialogListComponent extends React.PureComponent<{ engine: MobileMessenger }> {
    private contentOffset = new Animated.Value(0);
    private contentOffsetEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.contentOffset } } }],
        { useNativeDriver: true }
    );
    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {area => {
                    return (
                        <>
                            <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} />
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={this.props.engine.dialogs}
                                style={{ flexGrow: 1 }}
                                onScroll={this.contentOffsetEvent}
                                headerPadding={4}
                            />
                        </>
                    );
                }}
            </ZSafeAreaContext.Consumer>
        );
    }
}
import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessenger } from '../../../messenger/MobileMessenger';
import { Animated } from 'react-native';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
// import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
// import { FastScrollValue } from 'react-native-fast-navigation/FastScrollValue';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

export class DialogListComponent extends React.PureComponent<{ engine: MobileMessenger }> {
    // private contentOffset = new FastScrollValue();

    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {area => {
                    return (
                        <>
                            {/* <FastHeaderConfigRegistrator config={new FastHeaderConfig({ contentOffset: this.contentOffset })} /> */}
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={this.props.engine.dialogs}
                                style={[{ flexGrow: 1 }, {
                                    // Work-around for freezing navive animation driver
                                    // opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                } as any]}
                                // onScroll={this.contentOffset.event}
                                headerPadding={4}
                            />
                        </>
                    );
                }}
            </ASSafeAreaContext.Consumer>
        );
    }
}
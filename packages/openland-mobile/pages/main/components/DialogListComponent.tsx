import * as React from 'react';
import { ASListView } from 'react-native-async-view/ASListView';
import { MobileMessenger } from '../../../messenger/MobileMessenger';
import { Animated } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { SDevice } from 'react-native-s/SDevice';

export class DialogListComponent extends React.PureComponent<{ dialogs: ASDataView<DialogDataSourceItem> }> {
    private contentOffset = new STrackedValue();

    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {area => {
                    return (
                        <>
                            <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                            <ASListView
                                overscrollCompensation={true}
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={this.props.dialogs}
                                style={[{ flexGrow: 1 }, {
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                } as any]}
                                onScroll={this.contentOffset.event}
                                headerPadding={4}
                            />
                        </>
                    );
                }}
            </ASSafeAreaContext.Consumer>
        );
    }
}
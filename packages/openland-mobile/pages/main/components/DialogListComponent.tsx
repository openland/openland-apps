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

    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {area => {
                    return (
                        <>
                            <ASListView
                                overscrollCompensation={true}
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={this.props.dialogs}
                                style={[{ flexGrow: 1 }]}
                                headerPadding={4}
                            />
                        </>
                    );
                }}
            </ASSafeAreaContext.Consumer>
        );
    }
}
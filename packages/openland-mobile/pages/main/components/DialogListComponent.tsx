import * as React from 'react';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASListView } from 'react-native-async-view/ASListView';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { MobileMessenger } from '../../../messenger/MobileMessenger';

export class DialogListComponent extends React.PureComponent<{ engine: MobileMessenger }> {
    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {area => {
                    return (
                        <ASView style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                            <ASFlex flexDirection="column" alignItems="stretch">
                                <ASListView
                                    flexGrow={1}
                                    contentPaddingTop={area.top + 4}
                                    contentPaddingBottom={area.bottom + 4}
                                    dataView={this.props.engine.dialogs}
                                />
                            </ASFlex>
                        </ASView>
                    );
                }}
            </ZSafeAreaContext.Consumer>
        );
    }
}
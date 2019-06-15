import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from './components/notificationCenter/NotificationCenterHeader';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { NotificationCenterStateHandler, NotificationCenterState } from 'openland-engines/NotificationCenterState';
import { AppTheme } from 'openland-mobile/themes/themes';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { NotificationCenterEmpty } from './components/notificationCenter/NotificationCenterEmpty';
import { Platform } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { NotificationCenterHandlers } from './components/notificationCenter/NotificationCenterHandlers';

interface NotificationCenterPageProps {
    theme: AppTheme;
    engine: NotificationCenterEngine;
}

interface NotificationCenterPageState {
    state: NotificationCenterState;
}

class NotificationCenterPage extends React.PureComponent<NotificationCenterPageProps, NotificationCenterPageState> implements NotificationCenterStateHandler {
    private unmount: (() => void) | null = null;

    constructor(props: NotificationCenterPageProps) {
        super(props);

        this.state = {
            state: this.props.engine.getState()
        }
    }

    componentWillMount() {
        this.unmount = this.props.engine.subscribe(this);
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
            this.unmount = null;
        }
    }

    onNotificationCenterUpdated(state: NotificationCenterState) {
        this.setState({ state });
    }

    handleManagePress = () => {
        const notifications = this.state.state.notifications;

        NotificationCenterHandlers.handleManagePress(notifications);
    }

    render() {
        const { theme } = this.props;
        const { state } = this.state;

        const isEmpty = state.notifications.length <= 0;
        const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

        return (
            <>
                <NotificationCenterHeader theme={theme} />

                {!isEmpty && <SHeaderButton key={'manage-btn-' + isEmpty} title="Manage" icon={manageIcon} onPress={this.handleManagePress} />}
                {isEmpty && <SHeaderButton key={'manage-btn-' + isEmpty} />}

                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            {isEmpty && (
                                <NotificationCenterEmpty />
                            )}
                            {!isEmpty && (
                                <ASListView
                                    contentPaddingTop={area.top}
                                    contentPaddingBottom={area.bottom}
                                    dataView={getMessenger().notifications}
                                    style={{ flexGrow: 1 }}
                                    headerPadding={4}
                                />
                            )}
                        </>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}

const NotificationCenterWrapper = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const engine = getMessenger().engine.notificationCenter;

    return <NotificationCenterPage theme={theme} engine={engine} />;
});

export const NotificationCenter = withApp(NotificationCenterWrapper, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });
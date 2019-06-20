import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { NotificationCenterHeader } from 'openland-mobile/notificationCenter/NotificationCenterHeader';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { AppTheme } from 'openland-mobile/themes/themes';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { NotificationCenterEmpty } from 'openland-mobile/notificationCenter/NotificationCenterEmpty';
import { Platform } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { NotificationCenterHandlers } from 'openland-mobile/notificationCenter/NotificationCenterHandlers';
import { NON_PRODUCTION } from '../Init';

interface NotificationCenterPageProps {
    theme: AppTheme;
    engine: NotificationCenterEngine;
}

class NotificationCenterPage extends React.PureComponent<NotificationCenterPageProps, { dataSourceGeneration: number }> {
    constructor(props: any) {
        super(props);
        this.state = { dataSourceGeneration: 0 };
    }

    private unmount?: () => void;
    private unmount1?: () => void;

    componentWillMount() {
        this.unmount = this.props.engine.subscribe();
        this.unmount1 = this.props.engine.dataSource.dumbWatch(() => this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }));
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
        if (this.unmount1) {
            this.unmount1();
        }
    }

    handleManagePress = () => {
        NotificationCenterHandlers.handleManagePress(this.props.engine.dataSource.getItems());
    }

    render() {
        const { theme } = this.props;

        const isEmpty = this.props.engine.dataSource.getSize() === 0 && this.props.engine.dataSource.isInited();

        if (isEmpty) {
            return (
                <>
                    <NotificationCenterHeader theme={theme} />
                    {NON_PRODUCTION && <SHeaderButton key={'btn-' + isEmpty} />}
                    <NotificationCenterEmpty />
                </>
            )
        }

        const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

        return (
            <>
                <NotificationCenterHeader theme={theme} />
                {NON_PRODUCTION && <SHeaderButton key={'btn-' + isEmpty} title="Manage" icon={manageIcon} onPress={this.handleManagePress} />}
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={getMessenger().notifications}
                                style={{ flexGrow: 1 }}
                                headerPadding={4}
                            />
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
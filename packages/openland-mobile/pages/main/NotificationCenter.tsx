import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { NotificationCenterEmpty } from 'openland-mobile/notificationCenter/NotificationCenterEmpty';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { NotificationCenterHandlers } from 'openland-mobile/notificationCenter/NotificationCenterHandlers';
import { NON_PRODUCTION } from '../Init';
import { SHeader } from 'react-native-s/SHeader';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { Animated } from 'react-native';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';

interface NotificationCenterPageProps {
    engine: NotificationCenterEngine;
}

class NotificationCenterPage extends React.PureComponent<NotificationCenterPageProps, { dataSourceGeneration: number }> {
    private unmount?: () => void;
    private unmount1?: () => void;
    private contentOffset = new STrackedValue();

    constructor(props: any) {
        super(props);
        this.state = { dataSourceGeneration: 0 };
    }

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
        const isEmpty = this.props.engine.dataSource.getSize() === 0 && this.props.engine.dataSource.isInited();

        if (isEmpty) {
            return (
                <>
                    <SHeader title="Notifications" />
                    {NON_PRODUCTION && <SHeaderButton key={'btn-' + isEmpty} />}
                    <NotificationCenterEmpty />
                </>
            );
        }

        return (
            <>
                <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                <SHeader title="Notifications" />
                {NON_PRODUCTION && <ZManageButton key={'btn-' + isEmpty} onPress={this.handleManagePress} />}
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={getMessenger().notifications}
                                style={[{ flexGrow: 1 }, {
                                    // Work-around for freezing navive animation driver
                                    opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                                } as any]}
                                onScroll={this.contentOffset.event}
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
    const engine = getMessenger().engine.notificationCenter;

    return <NotificationCenterPage engine={engine} />;
});

export const NotificationCenter = withApp(NotificationCenterWrapper);
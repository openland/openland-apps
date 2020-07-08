import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { NotificationCenterEmpty } from 'openland-mobile/notificationCenter/NotificationCenterEmpty';
import { SHeader } from 'react-native-s/SHeader';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { Animated } from 'react-native';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { ActiveTabContext, STrackedValueRefContext } from './Home';

interface NotificationCenterPageProps {
    engine: NotificationCenterEngine;
    tabEnabled: boolean;
    contentOffsetRef?: React.MutableRefObject<STrackedValue | undefined>;
}

class NotificationCenterPage extends React.PureComponent<NotificationCenterPageProps, { dataSourceGeneration: number }> {
    private unmount?: () => void;
    private unmount1?: () => void;
    private contentOffset = new STrackedValue();

    constructor(props: any) {
        super(props);
        this.state = { dataSourceGeneration: 0 };
        if (props.contentOffsetRef) {
            props.contentOffsetRef.current = this.contentOffset;
        }
    }

    componentWillMount() {
        this.unmount1 = this.props.engine.dataSource.dumbWatch(() => this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }));
    }

    componentWillReceiveProps(newProps: NotificationCenterPageProps) {
        if (newProps.tabEnabled !== this.props.tabEnabled) {
            if (newProps.tabEnabled) {
                if (!this.unmount) {
                    this.unmount = this.props.engine.subscribe();
                }
            } else {
                if (this.unmount) {
                    this.unmount();
                    this.unmount = undefined;
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
        if (this.unmount1) {
            this.unmount1();
        }
    }

    render() {
        const isEmpty = this.props.engine.dataSource.getSize() === 0 && this.props.engine.dataSource.isInited();

        if (isEmpty) {
            return (
                <>
                    <SHeader title="Notifications" />
                    <NotificationCenterEmpty />
                </>
            );
        }

        return (
            <>
                <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} />
                <SHeader title="Notifications" />
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            <ASListView
                                overscrollCompensation={true}
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

const NotificationCenterWrapper = React.memo((props: PageProps) => {
    const engine = getMessenger().engine.notificationCenter;
    const tabEnabled = React.useContext(ActiveTabContext);
    const contentOffsetRef = React.useContext(STrackedValueRefContext);

    return <NotificationCenterPage engine={engine} tabEnabled={tabEnabled} contentOffsetRef={contentOffsetRef} />;
});

export const NotificationCenter = withApp(NotificationCenterWrapper);
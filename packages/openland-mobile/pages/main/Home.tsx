import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { View } from 'react-native';
import { ZBottomTabs } from '../../components/ZBottomTabs';
import { Directory } from './Directory';
import { Dialogs } from './Dialogs';
import { Settings } from './Settings';
import { ZAppConfig } from '../../components/ZAppConfig';
import { ZHeaderContextDirect } from '../../components/navigation/ZHeaderContextDirect';
import { ZHeaderContextChild } from '../../components/navigation/ZHeaderContextChild';
import { YQuery } from 'openland-y-graphql/YQuery';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';

export class Home extends React.PureComponent<NavigationInjectedProps, { tab: number }> {
    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            tab: 1
        };
    }

    handleTabChange = (index: number) => {
        this.setState({ tab: index });
    }

    render() {
        return (
            <ZHeaderContextDirect navigation={this.props.navigation}>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#fff', flexDirection: 'column', alignItems: 'stretch' }}>
                    <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 0 ? 1 : 0 }} pointerEvents={this.state.tab === 0 ? 'box-none' : 'none'}>
                            <ZHeaderContextChild enabled={this.state.tab === 0}>
                                <Directory {...this.props} />
                            </ZHeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 1 ? 1 : 0 }} pointerEvents={this.state.tab === 1 ? 'box-none' : 'none'}>
                            <ZHeaderContextChild enabled={this.state.tab === 1}>
                                <Dialogs {...this.props} />
                            </ZHeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 2 ? 1 : 0 }} pointerEvents={this.state.tab === 2 ? 'box-none' : 'none'}>
                            <ZHeaderContextChild enabled={this.state.tab === 2}>
                                <Settings {...this.props} />
                            </ZHeaderContextChild>
                        </View>
                    </View>
                    <YQuery query={GlobalCounterQuery}>
                        {resp => (
                            <View style={{ position: 'absolute', bottom: ZAppConfig.bottomNavigationBarInset, left: 0, right: 0 }}>
                                <ZBottomTabs counter={resp.data && resp.data.counter.unreadCount || 0} selected={this.state.tab} onPress={this.handleTabChange} />
                            </View>
                        )}

                    </YQuery>
                </View>
            </ZHeaderContextDirect>
        );
    }
}
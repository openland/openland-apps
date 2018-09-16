import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Platform } from 'react-native';
import { ZBottomTabs } from '../../components/ZBottomTabs';
import { Directory } from './Directory';
import { Dialogs } from './Dialogs';
import { Settings } from './Settings';
import { YQuery } from 'openland-y-graphql/YQuery';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';
import { Feed } from './Feed';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderContextChild } from 'react-native-s/navigation/HeaderContextChild';
import { SDevice } from 'react-native-s/SDevice';

export class Home extends React.PureComponent<{}, { tab: number }> {
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
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
                <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 54 : 0}>
                    <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 0 ? 1 : 0 }} pointerEvents={this.state.tab === 0 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 0}>
                                <Feed {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 1 ? 1 : 0 }} pointerEvents={this.state.tab === 1 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 1}>
                                <Dialogs {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 2 ? 1 : 0 }} pointerEvents={this.state.tab === 2 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 2}>
                                <Directory {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 3 ? 1 : 0 }} pointerEvents={this.state.tab === 3 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 3}>
                                <Settings {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                    </View>
                </ASSafeAreaProvider>
                <YQuery query={GlobalCounterQuery}>
                    {resp => (
                        <View style={{ position: Platform.OS === 'ios' ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0 }}>
                            <ZBottomTabs counter={resp.data && resp.data.counter.unreadCount || 0} selected={this.state.tab} onPress={this.handleTabChange} />
                        </View>
                    )}
                </YQuery>
            </View>
        );
    }
}
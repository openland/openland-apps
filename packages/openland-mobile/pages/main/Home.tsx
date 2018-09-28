import * as React from 'react';
import { View, Platform } from 'react-native';
import { Directory } from './Directory';
import { Dialogs } from './Dialogs';
import { Settings } from './Settings';
import { YQuery } from 'openland-y-graphql/YQuery';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { HeaderContextChild } from 'react-native-s/navigation/HeaderContextChild';
import { PageProps } from '../../components/PageProps';
import { AppBarBottom, AppBarBottomItem } from '../../components/AppBarBottom';

export class Home extends React.PureComponent<PageProps, { tab: number }> {
    constructor(props: PageProps) {
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
                                <Directory {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 1 ? 1 : 0 }} pointerEvents={this.state.tab === 1 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 1}>
                                <Dialogs {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 2 ? 1 : 0 }} pointerEvents={this.state.tab === 2 ? 'box-none' : 'none'}>
                            <HeaderContextChild enabled={this.state.tab === 2}>
                                <Settings {...this.props as any} />
                            </HeaderContextChild>
                        </View>
                    </View>
                </ASSafeAreaProvider>
                <YQuery query={GlobalCounterQuery}>
                    {resp => (
                        <View style={{ position: Platform.OS === 'ios' ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0 }}>
                            <AppBarBottom>
                                <AppBarBottomItem
                                    title="Directory"
                                    icon={require('assets/ic-directory-ios.png')}
                                    selected={this.state.tab === 0}
                                    onPress={() => this.handleTabChange(0)}
                                />
                                <AppBarBottomItem
                                    title="Messages"
                                    icon={require('assets/ic-messages-ios.png')}
                                    selected={this.state.tab === 1}
                                    counter={resp.data!!.counter.unreadCount}
                                    onPress={() => this.handleTabChange(1)}
                                />
                                <AppBarBottomItem
                                    title="Settings"
                                    icon={require('assets/ic-settings-ios.png')}
                                    selected={this.state.tab === 2}
                                    onPress={() => this.handleTabChange(2)}
                                />
                            </AppBarBottom>
                        </View>
                    )}
                </YQuery>
            </View>
        );
    }
}
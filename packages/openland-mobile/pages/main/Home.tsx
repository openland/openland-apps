import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { View } from 'react-native';
import { ZBottomTabs } from '../../components/ZBottomTabs';
import { Directory } from './Directory';
import { Dialogs } from './Dialogs';
import { Settings } from './Settings';
import { ZAppConfig } from '../../components/ZAppConfig';

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
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff', flexDirection: 'column', alignItems: 'stretch' }}>
                <View style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 0 ? 1 : 0 }} pointerEvents={this.state.tab === 0 ? 'box-none' : 'none'}>
                        <Directory {...this.props} />
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 1 ? 1 : 0 }} pointerEvents={this.state.tab === 1 ? 'box-none' : 'none'}>
                        <Dialogs {...this.props} />
                    </View>
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: this.state.tab === 2 ? 1 : 0 }} pointerEvents={this.state.tab === 2 ? 'box-none' : 'none'}>
                        <Settings {...this.props} />
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: ZAppConfig.bottomNavigationBarInset, left: 0, right: 0 }}>
                    <ZBottomTabs selected={this.state.tab} onPress={this.handleTabChange} />
                </View>
            </View>
        );
    }
}
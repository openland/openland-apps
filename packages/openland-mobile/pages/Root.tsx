import * as React from 'react';
import { SRouting } from 'react-native-s/SRouting';
import { Platform, Dimensions, View, LayoutChangeEvent, LayoutAnimation } from 'react-native';
import { SNavigationView } from 'react-native-s/SNavigationView';
import { AppStyles } from '../styles/AppStyles';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { randomKey } from 'react-native-s/utils/randomKey';

export interface RootProps {
    routing: SRouting;
    padLayout?: boolean;
}

let isPad = !!(Platform.OS === 'ios' && (Platform as any).isPad);

export class Root extends React.PureComponent<RootProps, { width: number, height: number, masterRouting?: SRouting, masterKey?: string }> {

    constructor(props: RootProps) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        };

        isPad = isPad && this.props.padLayout !== false;

        if (isPad) {
            this.props.routing.navigationManager.setPushHandler(this.handlePush);
        }
    }

    private handlePush = (route: string, params?: any) => {
        let man = new NavigationManager(this.props.routing.navigationManager.routes, route, params);
        this.setState({ masterRouting: new SRouting(man), masterKey: randomKey() });
        return true;
    }

    private handleLayoutChange = (e: LayoutChangeEvent) => {
        let w = Dimensions.get('window').width;
        let h = Dimensions.get('window').height;
        if (Platform.OS === 'ios') {
            if (this.state.width !== w || this.state.height !== h) {
                LayoutAnimation.configureNext({
                    duration: 250,
                    update: {
                        type: 'linear'
                    }
                });
            }
        }
        this.setState({ width: w, height: h });
    }

    render() {
        if (isPad) {
            return (
                <View width="100%" height="100%" flexDirection="row" onLayout={this.handleLayoutChange}>
                    <SNavigationView
                        width={300}
                        height={this.state.height}
                        routing={this.props.routing}
                        navigationBarStyle={{
                            accentColor: AppStyles.primaryColor,
                            backgroundColor: '#fff',
                            isOpaque: Platform.OS === 'ios' ? false : true
                        }}
                    />
                    <View height={'100%'} width={0.5} backgroundColor={AppStyles.separatorColor} />
                    <View width={this.state.width - 300} height={'100%'}>
                        {this.state.masterRouting && (
                            <SNavigationView
                                key={this.state.masterKey!!}
                                width={this.state.width - 300}
                                height={this.state.height}
                                routing={this.state.masterRouting}
                                navigationBarStyle={{
                                    accentColor: AppStyles.primaryColor,
                                    backgroundColor: '#fff',
                                    isOpaque: Platform.OS === 'ios' ? false : true
                                }}
                            />
                        )}
                    </View>
                </View>
            );
        }

        return (
            <View width="100%" height="100%" flexDirection="row" onLayout={this.handleLayoutChange}>
                <SNavigationView
                    width={this.state.width}
                    height={this.state.height}
                    routing={this.props.routing}
                    navigationBarStyle={{
                        accentColor: AppStyles.primaryColor,
                        backgroundColor: '#fff',
                        isOpaque: Platform.OS === 'ios' ? false : true
                    }}
                />
            </View>
        );
    }
}
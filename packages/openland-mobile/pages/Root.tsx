import * as React from 'react';
import { SRouting } from 'react-native-s/SRouting';
import { Platform, Dimensions, View, LayoutChangeEvent, LayoutAnimation } from 'react-native';
import { SNavigationView } from 'react-native-s/SNavigationView';
import { AppStyles } from '../styles/AppStyles';

export interface RootProps {
    routing: SRouting;
}

export class Root extends React.PureComponent<RootProps, { width: number, height: number }> {
    constructor(props: RootProps) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        };
    }

    private handleLayoutChange = (e: LayoutChangeEvent) => {
        if (Platform.OS === 'ios') {
            LayoutAnimation.configureNext({
                duration: 250,
                update: {
                    type: 'linear'
                }
            });
        }
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
    }

    render() {
        let isPad = !!(Platform.OS === 'ios' && (Platform as any).isPad);
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
                        {}
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
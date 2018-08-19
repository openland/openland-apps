import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, LayoutChangeEvent, requireNativeComponent, Image } from 'react-native';
import { ZHeader } from '../../components/ZHeader';
import { ZAppConfig } from '../../components/ZAppConfig';
import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';

// const AggressiveImage = requireNativeComponent('AggressiveImage') as any;

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { layout?: { width: number, height: number } }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {

        };
    }

    handleLayout = (event: LayoutChangeEvent) => {
        this.setState({ layout: { width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height } });
    }

    render() {
        return (
            <>
                <ZHeader title="Some title" />
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: ZAppConfig.bottomNavigationBarInset, flexDirection: 'column' }} onLayout={this.handleLayout}>
                    <ZSafeAreaView>
                        {/* <AggressiveImage source={Image.resolveAssetSource(require('assets/chat-bubble-out.png')).uri} style={{ width: 100, height: 100, backgroundColor: '#f00' }} /> */}
                        {}
                    </ZSafeAreaView>
                </View>
            </>
        );
    }
}

export const Navigation = withApp(NavigationComponent);
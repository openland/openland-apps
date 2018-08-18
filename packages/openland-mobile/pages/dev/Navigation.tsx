import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, LayoutChangeEvent } from 'react-native';
import { ZHeader } from '../../components/ZHeader';
import { ZAppConfig } from '../../components/ZAppConfig';

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
                    {}
                </View>
            </>
        );
    }
}

export const Navigation = withApp(NavigationComponent);
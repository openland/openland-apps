import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, LayoutChangeEvent } from 'react-native';
import { ZHeader } from '../../components/ZHeader';
import { ZAppConfig } from '../../components/ZAppConfig';
import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';
import { ASView } from 'react-native-async-view/ASView';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';

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
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: ZAppConfig.bottomNavigationBarInset, flexDirection: 'column', backgroundColor: '#fff' }} onLayout={this.handleLayout}>
                    <ZSafeAreaView style={{ width: '100%', height: '100%' }}>
                        <ASView style={{ width: 300, height: 300 }}>
                            <ASFlex>
                                <ASText>Hello</ASText>
                            </ASFlex>
                        </ASView>
                        {/* <ASDisplayList
                            data={[{ title: 'Hello' }, { title: 'Hello2' }, { title: 'Hello3' }]}
                            renderItem={this.renderItem}
                            style={{ width: '100%', height: '100%' }}
                        /> */}
                        {/* <ASDisplayNode>
                            <ASView direction="row">
                                <ASText>Hello world</ASText>
                            </ASView>
                        </ASDisplayNode> */}
                    </ZSafeAreaView>
                </View>
            </>
        );
    }
}

export const Navigation = withApp(NavigationComponent);
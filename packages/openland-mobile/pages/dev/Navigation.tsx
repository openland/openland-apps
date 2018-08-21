import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, LayoutChangeEvent, requireNativeComponent, Image } from 'react-native';
import { ZHeader } from '../../components/ZHeader';
import { ZAppConfig } from '../../components/ZAppConfig';
import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';
import { ASDisplayNode } from '../../components/asyncdisplay/ASDisplayNode';
import { ASView, ASText } from '../../components/asyncdisplay/Views';
import { ASDisplayList } from '../../components/asyncdisplay/ASDisplayList';

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

    renderItem = (src: any) => {
        return (
            <ASView>
                <ASText>{src.title}</ASText>
            </ASView>
        );
    }

    render() {
        return (
            <>
                <ZHeader title="Some title" />
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: ZAppConfig.bottomNavigationBarInset, flexDirection: 'column' }} onLayout={this.handleLayout}>
                    <ZSafeAreaView style={{ width: '100%', height: '100%' }}>
                        <ASDisplayList
                            data={[{ title: 'Hello' }, { title: 'Hello2' }, { title: 'Hello3' }]}
                            renderItem={this.renderItem}
                            style={{ width: '100%', height: '100%' }}
                        />
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
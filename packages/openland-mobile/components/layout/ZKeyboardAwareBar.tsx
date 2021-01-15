import * as React from 'react';
import { View, Platform, LayoutChangeEvent } from 'react-native';
import { ZBlurredView } from '../ZBlurredView';

import { ASKeyboardTracker } from 'react-native-async-view/ASKeyboardTracker';
import { ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { SDevice } from 'react-native-s/SDevice';

class ZKeyboardAwareBarComponent extends React.PureComponent<{ context?: { updateSize: (size: number) => void }, overrideTransform?: number }> {

    handleLayout = (event: LayoutChangeEvent) => {
        if (this.props.context) {
            this.props.context.updateSize(event.nativeEvent.layout.height - SDevice.safeArea.bottom);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios' && this.props.context) {
            this.props.context.updateSize(0);
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                    <ASKeyboardTracker overrideTransform={this.props.overrideTransform}>
                        <View
                            onLayout={this.handleLayout}
                            style={{
                                flexDirection: 'column',
                                alignItems: 'stretch',
                            }}
                        >
                            <ZBlurredView intensity="normal" style={{ alignItems: 'stretch', flexDirection: 'column', paddingBottom: SDevice.safeArea.bottom }}>
                                {this.props.children}
                            </ZBlurredView>
                        </View>
                    </ASKeyboardTracker>
                </View>
            );
        }
        return (
            <View>
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }} onLayout={this.handleLayout}>
                    <ZBlurredView fallbackColor="transparent" intensity="high" style={{ paddingBottom: SDevice.safeArea.bottom, alignItems: 'stretch', flexDirection: 'column' }}>
                        {this.props.children}
                    </ZBlurredView>
                </View>
            </View>
        );
    }
}

export const ZKeyboardAwareBar = (props: { children: any, overrideTransform?: number }) => {
    return (
        <ASKeyboardAcessoryViewContext.Consumer>
            {context => (<ZKeyboardAwareBarComponent context={context} overrideTransform={props.overrideTransform}>{props.children}</ZKeyboardAwareBarComponent>)}
        </ASKeyboardAcessoryViewContext.Consumer>
    );
};
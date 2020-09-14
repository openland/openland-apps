import * as React from 'react';
import { View, Platform, LayoutChangeEvent } from 'react-native';
import { ZBlurredView } from '../ZBlurredView';

import { ASKeyboardTracker } from 'react-native-async-view/ASKeyboardTracker';
import { ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { SDevice } from 'react-native-s/SDevice';

class ZKeyboardAwareBarComponent extends React.PureComponent<{ context?: { updateSize: (size: number) => void } }> {

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
                <View position="absolute" left={0} bottom={0} right={0}>
                    <ASKeyboardTracker>
                        <View
                            onLayout={this.handleLayout}
                            style={{
                                flexDirection: 'column',
                                alignItems: 'stretch',
                            }}
                        >
                            <ZBlurredView intensity="normal" alignItems="stretch" flexDirection="column" paddingBottom={SDevice.safeArea.bottom}>
                                {this.props.children}
                            </ZBlurredView>
                        </View>
                    </ASKeyboardTracker>
                </View>
            );
        }
        return (
            <View>
                <View flexDirection="column" alignItems="stretch" onLayout={this.handleLayout}>
                    <ZBlurredView fallbackColor="transparent" intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: SDevice.safeArea.bottom }}>
                        {this.props.children}
                    </ZBlurredView>
                </View>
            </View>
        );
    }
}

export const ZKeyboardAwareBar = (props: { children: any }) => {
    return (
        <ASKeyboardAcessoryViewContext.Consumer>
            {context => (<ZKeyboardAwareBarComponent context={context}>{props.children}</ZKeyboardAwareBarComponent>)}
        </ASKeyboardAcessoryViewContext.Consumer>
    );
};
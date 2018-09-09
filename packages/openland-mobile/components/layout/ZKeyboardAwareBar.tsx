import * as React from 'react';
import { View, Platform, LayoutChangeEvent } from 'react-native';
import { ZBlurredView } from '../ZBlurredView';

import { ASKeyboardTracker } from 'react-native-async-view/ASKeyboardTracker';
import { ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { DeviceConfig } from 'react-native-fast-navigation/DeviceConfig';

class ZKeyboardAwareBarComponent extends React.PureComponent<{ context?: { updateSize: (size: number) => void } }> {

    handleLayout = (event: LayoutChangeEvent) => {
        if (this.props.context) {
            console.log('JS Keybard height: ' + (event.nativeEvent.layout.height - DeviceConfig.bottomNavigationBarInset));
            if (Platform.OS === 'ios') {
                this.props.context.updateSize(event.nativeEvent.layout.height - DeviceConfig.bottomNavigationBarInset);
            } else {
                this.props.context.updateSize(event.nativeEvent.layout.height - DeviceConfig.bottomNavigationBarInset);
            }
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
                            style={{
                                flexDirection: 'column',
                                alignItems: 'stretch',
                            }}
                            onLayout={this.handleLayout}
                        >
                            <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                            <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" paddingBottom={DeviceConfig.bottomNavigationBarInset}>
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
                    <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                    <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: DeviceConfig.bottomNavigationBarInset }}>
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
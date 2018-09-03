import * as React from 'react';
import { View, Platform, LayoutChangeEvent } from 'react-native';
import { ZBlurredView } from '../ZBlurredView';
import { ZAppConfig } from '../ZAppConfig';
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view';
import { ZKeyboardAwareBarContext } from './ZKeyboardAwareContainer';

class ZKeyboardAwareBarComponent extends React.PureComponent<{ context?: { updateSize: (size: number) => void } }> {

    handleLayout = (event: LayoutChangeEvent) => {
        if (this.props.context) {
            if (Platform.OS === 'ios') {
                this.props.context.updateSize(event.nativeEvent.layout.height - ZAppConfig.bottomNavigationBarInset - 100);
            } else {
                this.props.context.updateSize(event.nativeEvent.layout.height - ZAppConfig.bottomNavigationBarInset);
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
                    <KeyboardTrackingView manageScrollView={false} allowHitsOutsideBounds={false} addBottomView={false}>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                marginBottom: -ZAppConfig.bottomNavigationBarInset - 100,
                            }}
                            onLayout={this.handleLayout}
                        >
                            <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                            <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: ZAppConfig.bottomNavigationBarInset + 100 }}>
                                {this.props.children}
                            </ZBlurredView>
                        </View>
                    </KeyboardTrackingView>
                </View>
            );
        }
        return (
            <View>
                <View flexDirection="column" alignItems="stretch" onLayout={this.handleLayout}>
                    <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                    <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: ZAppConfig.bottomNavigationBarInset }}>
                        {this.props.children}
                    </ZBlurredView>
                </View>
            </View>
        );
    }
}

export const ZKeyboardAwareBar = (props: { children: any }) => {
    return (
        <ZKeyboardAwareBarContext.Consumer>
            {context => (<ZKeyboardAwareBarComponent context={context}>{props.children}</ZKeyboardAwareBarComponent>)}
        </ZKeyboardAwareBarContext.Consumer>
    );
};
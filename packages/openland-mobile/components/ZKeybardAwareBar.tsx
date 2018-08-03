import * as React from 'react';
import { InputAccessoryView, View, Platform } from 'react-native';
import { ZBlurredView } from './ZBlurredView';
import { ZAppConfig } from './ZAppConfig';
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view';

export class ZKeyboardAwareBar extends React.PureComponent {
    render() {
        if (Platform.OS === 'ios') {
            return (
                <View position="absolute" left={0} bottom={0} right={0}>
                    <KeyboardTrackingView manageScrollView={false}>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                marginBottom: -ZAppConfig.bottomNavigationBarInset,
                            }}
                        >
                            <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                            <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: ZAppConfig.bottomNavigationBarInset }}>
                                {this.props.children}
                            </ZBlurredView>
                        </View>
                    </KeyboardTrackingView>
                </View>
            );
        }
        return (
            <View position="absolute" left={0} bottom={0} right={0}>
                <InputAccessoryView>
                    <View flexDirection="column" alignItems="stretch">
                        <View height={0.5} backgroundColor="#b7bdc6" opacity={0.3} />
                        <ZBlurredView intensity="high" alignItems="stretch" flexDirection="column" style={{ paddingBottom: ZAppConfig.bottomNavigationBarInset }}>
                            {this.props.children}
                        </ZBlurredView>
                    </View>
                </InputAccessoryView>
            </View>
        );
    }
}
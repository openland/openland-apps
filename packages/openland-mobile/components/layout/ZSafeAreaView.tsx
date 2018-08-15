import * as React from 'react';
import { StyleProp, ViewStyle, View, ViewProps } from 'react-native';
import { ZSafeAreaContext } from './ZSafeAreaContext';

export class ZSafeAreaView extends React.PureComponent<ViewProps> {
    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {context => (
                    <View {...this.props} style={[this.props.style, { top: context.top, bottom: context.bottom }]}>
                        {this.props.children}
                    </View>
                )}
            </ZSafeAreaContext.Consumer>
        );
    }
}
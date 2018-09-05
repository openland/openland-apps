import * as React from 'react';
import { StyleProp, ViewStyle, View, ViewProps } from 'react-native';
import { ZSafeAreaContext } from './ZSafeAreaContext';

export class ZSafeAreaView extends React.PureComponent<ViewProps> {
    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {context => (
                    <View {...this.props} style={[this.props.style, { paddingTop: context.top, paddingBottom: context.bottom }]}>
                        {this.props.children}
                    </View>
                )}
            </ZSafeAreaContext.Consumer>
        );
    }
}
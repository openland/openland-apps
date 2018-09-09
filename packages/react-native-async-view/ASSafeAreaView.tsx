import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { ASSafeAreaContext } from './ASSafeAreaContext';

export class ASSafeAreaView extends React.PureComponent<ViewProps> {
    render() {
        return (
            <ASSafeAreaContext.Consumer>
                {context => (
                    <View {...this.props} style={[this.props.style, { paddingTop: context.top, paddingBottom: context.bottom }]}>
                        {this.props.children}
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        );
    }
}
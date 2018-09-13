import * as React from 'react';
import { ViewProps, View } from 'react-native';

export interface SSafeArea {
    top: number;
    bottom: number;
}

export const SSafeAreaContext = React.createContext<SSafeArea>({ top: 0, bottom: 0 });

export const SSafeAreaProvider = (props: { top?: number, bottom?: number, children?: any }) => {
    return (
        <SSafeAreaContext.Consumer>
            {area => (
                <SSafeAreaContext.Provider value={{ top: (props.top !== undefined ? props.top : 0) + area.top, bottom: (props.bottom !== undefined ? props.bottom : 0) + area.bottom }}>
                    {props.children}
                </SSafeAreaContext.Provider>
            )}
        </SSafeAreaContext.Consumer>
    );
};

export class SSafeAreaView extends React.PureComponent<ViewProps> {
    render() {
        return (
            <SSafeAreaContext.Consumer>
                {context => (
                    <View {...this.props} style={[this.props.style, { paddingTop: context.top, paddingBottom: context.bottom }]}>
                        {this.props.children}
                    </View>
                )}
            </SSafeAreaContext.Consumer>
        );
    }
}
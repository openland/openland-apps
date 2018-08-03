import * as React from 'react';
import { TouchableWithoutFeedback, ViewProps, View } from 'react-native';
import { AppStyles } from 'openland-mobile/styles/AppStyles';

export class ZListItem extends React.PureComponent<ViewProps & { onPress?: () => void, selected?: boolean }, { pressed: boolean }> {
    constructor(props: ViewProps) {
        super(props);
        this.state = { pressed: false };
    }

    private handlePressIn = () => {
        this.setState({ pressed: true });
        if (this.props.onPress) { this.props.onPress(); }
    }

    private handlePressOut = () => {
        this.setState({ pressed: false });
    }

    render() {

        return (
            <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                <View style={[{ backgroundColor: (this.state.pressed || this.props.selected) ? AppStyles.primaryColor : '#fff' }]}>
                    <View {...this.props} style={this.props.style} key={this.state.pressed ? 'pressed' : 'idle'}>
                        {this.props.children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
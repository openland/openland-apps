import * as React from 'react';
import { TouchableWithoutFeedback, ViewProps, View, StyleProp, ViewStyle } from 'react-native';
import { AppStyles } from 'openland-mobile/styles/AppStyles';

export interface ZListItemProps {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    selected?: boolean;
    children: (selected: boolean) => React.ReactElement<any>;
}

export class ZListItem extends React.PureComponent<ZListItemProps, { pressed: boolean }> {
    constructor(props: ZListItemProps) {
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
                    <View {...this.props} style={this.props.style}>
                        {this.props.children(!!(this.state.pressed || this.props.selected))}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
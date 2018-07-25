import * as React from 'react';
import { TouchableHighlight, View } from 'react-native';

export class ZListItem extends React.PureComponent<{ height?: number, separatorPaddingStart?: number, onPress?: () => void }> {
    render() {
        let height = this.props.height ? this.props.height : 44;
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor="#f8f8fb">
                <View style={{ height: height + 1, flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
                    <View style={{ height: height, flexDirection: 'row' }}>
                        {this.props.children}
                    </View>
                    <View style={{ backgroundColor: 'grey', height: 1, marginLeft: this.props.separatorPaddingStart }} />
                </View>
            </TouchableHighlight>
        );
    }
}
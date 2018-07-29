import * as React from 'react';
import { View, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

export class ZListItemGroup extends React.PureComponent<{ header?: string }> {
    render() {
        let components: any[] = [];
        React.Children.forEach(this.props.children, (c) => {
            if (c !== null && c !== undefined) {
                if (components.length > 0) {
                    components.push(<View key={'div-' + components.length} style={{ paddingLeft: 15 }} width="100%"><View backgroundColor={AppStyles.separatorColor} height={1} /></View>);
                }
                components.push(c);
            }
        });

        return (
            <View>
                {this.props.header && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.header}</Text>}
                <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
                {components}
                <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
            </View>
        );
    }
}
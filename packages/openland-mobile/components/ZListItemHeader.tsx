import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text } from 'react-native';
import { ZAvatar } from './ZAvatar';

export class ZListItemHeader extends React.PureComponent<{ photo?: string | null, id?: string, title?: string | null, subtitle?: string | null, path?: string }> {
    render() {
        return (
            <ZListItemBase path={this.props.path} height={80} backgroundColor="#fff" separator={false}>
                <View width={80} height={80} alignItems="center" justifyContent="center">
                    <ZAvatar src={this.props.photo} placeholderTitle={this.props.title} placeholderKey={this.props.id} size={60} />
                </View>
                <View flexGrow={1} flexBasis={0} justifyContent="center" marginLeft={5} paddingRight={10}>
                    <Text style={{ height: 19, lineHeight: 19, marginBottom: 5, fontWeight: '500', fontSize: 16, color: '#181818' }} numberOfLines={1}>{this.props.title}</Text>
                    <Text style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 18, height: 18 }} numberOfLines={1}>{this.props.subtitle}</Text>
                </View>
            </ZListItemBase>
        );
    }
}
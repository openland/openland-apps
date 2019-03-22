import * as React from 'react';
import { ZListItemBase } from '../../../components/ZListItemBase';
import { View, Text } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

export class ZUserListItem extends React.PureComponent<{ id: string, name: string, photo?: string, online?: boolean, onPress: () => void }> {
    render() {
        return (
            <ZListItemBase separator={false} height={50} onPress={this.props.onPress}>
                <View paddingTop={5} paddingBottom={5} paddingLeft={13} paddingRight={12}>
                    <ZAvatar size={40} src={this.props.photo} userId={this.props.id} placeholderKey={this.props.id} placeholderTitle={this.props.name} online={this.props.online} />
                </View>
                <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
                    <Text numberOfLines={1} style={{ fontSize: 16, color: '#000000' }}>{this.props.name}</Text>
                    {/* <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.role}</Text> */}
                </View>
            </ZListItemBase>
        );
    }
}
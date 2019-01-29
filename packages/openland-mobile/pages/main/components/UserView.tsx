import * as React from 'react';
import { UserShort } from 'openland-api/Types';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, Image } from 'react-native';
import { PresenceComponent } from './PresenceComponent';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

export const UserView = (props: { user: UserShort, isAdmin?: boolean, role?: string, enabled?: boolean, onPress: () => void, onLongPress?: () => void }) => (
    <ZListItemBase key={props.user.id} separator={false} height={60} onPress={props.onPress} onLongPress={props.onLongPress} enabled={props.enabled}>
        <View paddingLeft={15} paddingRight={15} alignSelf="center" opacity={props.enabled === false ? 0.5 : 1}>
            <ZAvatar size={42} src={props.user.photo} userId={props.user.id} placeholderKey={props.user.id} placeholderTitle={props.user.name} />
        </View>
        <View alignSelf="center" flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column" opacity={props.enabled === false ? 0.5 : 1}>
            <View flexDirection="row">
                {props.isAdmin && <Image source={require('assets/ic-star-16.png')} style={{ tintColor: '#fbc139', alignSelf: 'center', marginRight: 2, marginBottom: 4 }} />}
                <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', color: '#181818', height: 22, marginBottom: 0 }}>{props.user.name}{props.user.primaryOrganization && <Text style={{ fontSize: 15, color: '#99a2b0' }}>  {props.user.primaryOrganization.name}</Text>}</Text>
            </View>
            <PresenceComponent uid={props.user.id} style={{ fontSize: 14, color: '#99a2b0', height: 16 }} onlineStyle={{ color: '#0084fe' }} />
        </View>
    </ZListItemBase>
);
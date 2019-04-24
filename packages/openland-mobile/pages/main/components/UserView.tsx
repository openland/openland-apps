import * as React from 'react';
import { UserShort } from 'openland-api/Types';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, Image } from 'react-native';
import { PresenceComponent } from './PresenceComponent';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface UserViewProps {
    user: UserShort;
    isAdmin?: 'admin' | 'owner' | undefined;
    role?: string;
    enabled?: boolean;
    onPress: () => void;
    onLongPress?: () => void;
    subtitle?: string;
    paddingRight?: number;
}

export const UserView = (props: UserViewProps) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ZListItemBase key={props.user.id} separator={false} height={60} onPress={props.onPress} onLongPress={props.onLongPress} enabled={props.enabled}>
            <View paddingLeft={16} paddingRight={16} alignSelf="center" opacity={props.enabled === false ? 0.5 : 1}>
                <ZAvatar size={42} src={props.user.photo} userId={props.user.id} placeholderKey={props.user.id} placeholderTitle={props.user.name} online={props.user.online} />
            </View>
            <View alignSelf="center" flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column" opacity={props.enabled === false ? 0.5 : 1} paddingRight={props.paddingRight}>
                <View flexDirection="row">
                    {props.isAdmin && <Image source={require('assets/ic-star-16.png')} style={{ tintColor: props.isAdmin === 'owner' ? '#fbc139' : '#c0c0c0', alignSelf: 'center', marginRight: 2, marginBottom: 4 }} />}
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', color: theme.textColor, height: 22, marginBottom: 0 }}>{props.user.name}{props.user.primaryOrganization && <Text style={{ fontSize: 15, color: theme.accentColor }}>  {props.user.primaryOrganization.name}</Text>}</Text>
                </View>
                {props.subtitle ? <Text style={{ fontSize: 14, marginTop: 4, color: theme.accentColor }}>{props.subtitle}</Text> : <PresenceComponent isBot={props.user.isBot} uid={props.user.id} lastSeen={props.user.lastSeen} online={props.user.online} style={{ fontSize: 14, color: theme.accentColor, height: 20, marginBottom: -4 }} onlineStyle={{ color: theme.accentColor }} />}
            </View>
        </ZListItemBase>
    );
}
import * as React from 'react';
import { UserShort, RoomMemberRole, OrganizationMemberRole, UserBadge } from 'openland-api/Types';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, Image } from 'react-native';
import { PresenceComponent } from './PresenceComponent';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface UserViewProps {
    user: UserShort;
    role?: RoomMemberRole | OrganizationMemberRole;
    badge?: UserBadge | null;
    enabled?: boolean;
    onPress: () => void;
    onLongPress?: () => void;
    subtitle?: string;
    subtitleColor?: string;
    paddingRight?: number;
}

export const UserView = (props: UserViewProps) => {
    const { user, role, badge, enabled, onPress, onLongPress, subtitle, subtitleColor, paddingRight } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <ZListItemBase key={user.id} separator={false} height={60} onPress={onPress} onLongPress={onLongPress} enabled={enabled}>
            <View paddingLeft={16} paddingRight={16} alignSelf="center" opacity={enabled === false ? 0.5 : 1}>
                <ZAvatar size={42} src={user.photo} userId={user.id} placeholderKey={user.id} placeholderTitle={user.name} online={user.online} />
            </View>
            <View alignSelf="center" flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column" opacity={enabled === false ? 0.5 : 1} paddingRight={paddingRight || 16}>
                <View flexDirection="row">
                    {(role === 'OWNER' || role === 'ADMIN') && <Image source={require('assets/ic-crown-16.png')} style={{ tintColor: (role === 'OWNER' ? '#fbc139' : '#c0c0c0'), alignSelf: 'center', marginRight: 2, marginBottom: 4 }} />}
                    {!!badge && <Image source={require('assets/ic-star-16.png')} style={{ tintColor: theme.accentPrimary, alignSelf: 'center', marginRight: 2, marginBottom: 4 }} />}
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '500', color: theme.foregroundPrimary, height: 22, marginBottom: 0 }}>{user.name}{user.primaryOrganization && <Text style={{ fontSize: 15, color: theme.foregroundSecondary }}>  {user.primaryOrganization.name}</Text>}</Text>
                </View>
                {subtitle ? <Text style={{ fontSize: 14, marginTop: 4, color: subtitleColor ? subtitleColor : theme.accentPrimary }}>{subtitle}</Text> : <PresenceComponent isBot={user.isBot} uid={user.id} lastSeen={user.lastSeen} online={user.online} style={{ fontSize: 14, color: theme.foregroundSecondary, height: 20, marginBottom: -4 }} onlineStyle={{ color: theme.accentPrimary }} />}
            </View>
        </ZListItemBase>
    );
};
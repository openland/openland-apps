import * as React from 'react';
import { UserShort, RoomMemberRole, OrganizationMemberRole, UserBadge } from 'openland-api/spacex.types';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, Image } from 'react-native';
import { PresenceComponent } from './PresenceComponent';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface UserViewProps {
    user: UserShort;
    memberRole?: RoomMemberRole | OrganizationMemberRole;
    badge?: UserBadge | null;
    enabled?: boolean;
    onPress: () => void;
    onLongPress?: () => void;
    subtitle?: string;
    subtitleColor?: string;
    paddingRight?: number;
}

export const UserView = (props: UserViewProps) => {
    const { user, memberRole, badge, enabled, onPress, onLongPress, subtitle, subtitleColor, paddingRight } = props;
    const theme = React.useContext(ThemeContext);

    let showCrown = memberRole === 'OWNER' || memberRole === 'ADMIN';
    let isOwner = memberRole === 'OWNER';

    return (
        <ZListItemBase key={user.id} separator={false} height={56} onPress={onPress} onLongPress={onLongPress} enabled={enabled}>
            <View paddingLeft={16} paddingRight={16} alignSelf="center" opacity={enabled === false ? 0.5 : 1}>
                <ZAvatar size="medium" photo={user.photo} id={user.id} title={user.name} online={user.online} />
            </View>
            <View alignSelf="center" flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column" opacity={enabled === false ? 0.5 : 1} paddingRight={paddingRight || 16}>
                <View flexDirection="row">
                    {showCrown && <Image source={require('assets/ic-crown-16.png')} style={{ tintColor: (isOwner ? '#fbc139' : '#c0c0c0'), alignSelf: 'center', marginRight: 3 }} />}
                    {!!badge && <Image source={require('assets/ic-star-admin-16.png')} style={{ tintColor: theme.accentPrimary, alignSelf: 'center', marginRight: 3 }} />}
                    <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, flexGrow: 1, flexBasis: 0 }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{user.name}{user.primaryOrganization && <Text style={{ ...TextStyles.Label2, color: theme.foregroundTertiary }}> {user.primaryOrganization.name}</Text>}</Text>
                </View>
                {subtitle ? <Text style={{ ...TextStyles.Subhead, color: subtitleColor ? subtitleColor : theme.foregroundTertiary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{subtitle}</Text> : <PresenceComponent isBot={user.isBot} uid={user.id} lastSeen={user.lastSeen} online={user.online} style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} onlineStyle={{ color: theme.accentPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} />}
            </View>
        </ZListItemBase>
    );
};
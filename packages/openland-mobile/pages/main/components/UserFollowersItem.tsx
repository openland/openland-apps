import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';

import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getCounterValue } from 'openland-y-utils/getCounterValue';
import { pluralForm } from 'openland-y-utils/plural';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZFollowButton } from 'openland-mobile/components/ZFollowButton';

interface UserFollowerItemProps {
    id: string;
    name: string;
    photo: string | null;
    about: string | null;
    followersCount: number;
    followedByMe: boolean;
    hideButton?: boolean;
}

export const UserFollowersItem = React.memo<UserFollowerItemProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext);
    const client = getClient();
    const { id, name, photo, about, followersCount, followedByMe, hideButton } = props;
    const subtitle = about || `${getCounterValue(followersCount, 10000)} ${pluralForm(followersCount, ['follower', 'followers'])}`;
    const isMe = getMessenger().engine.user.id === id;

    const onFollowPress = React.useCallback(() => client.mutateSocialFollow({ uid: id }), [id, client]);
    const onPress = React.useCallback(() => router!.push('ProfileUser', { id }), [id, router]);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            <View style={{ flexDirection: 'row', paddingVertical: 6, alignItems: 'center' }}>
                <ZAvatar id={id} title={name} photo={photo} size={'small'} />
                <View style={{ marginLeft: 16, width: '100%', flexShrink: 1, paddingLeft: 5 }}>
                    <Text style={TextStyles.Label1}>{name}</Text>
                    <Text
                        style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                        numberOfLines={1}
                    >
                        {subtitle}
                    </Text>
                </View>
                {!hideButton && !isMe && (
                    <ZFollowButton
                        isFollowing={followedByMe}
                        onPress={onFollowPress}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
});
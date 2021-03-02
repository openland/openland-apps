import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { VoiceChatParticipant_user } from 'openland-api/spacex.types';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZFollowButton } from 'openland-mobile/components/ZFollowButton';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

interface RaisedHandsProps {
    hide: () => void;
    users: VoiceChatParticipant_user[];
    roomId: string;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal }) => {
    const { theme } = props;
    return (
        <View
            style={{
                flexGrow: 1,
                paddingHorizontal: 32,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={require('assets/art-empty.png')}
                style={{ width: 240, height: 150, marginBottom: 4 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 6,
                }}
            >
                All quiet
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
            >
                Noone raised their hand
            </Text>
        </View>
    );
});

const RaisedHandUserView = React.memo(
    (props: { user: VoiceChatParticipant_user; roomId: string; theme: ThemeGlobal }) => {
        const client = useClient();
        const { user, theme } = props;
        const promoteUser = React.useCallback(async () => {
            await client.mutateVoiceChatPromote({ id: props.roomId, uid: user.id });
        }, []);
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
                <ZAvatar id={user.id} title={user.name} photo={user.photo} size="medium" />
                <View style={{ marginLeft: 16, width: '100%', flexShrink: 1, paddingLeft: 5 }}>
                    <Text
                        style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                        numberOfLines={1}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                        numberOfLines={1}
                    >
                        {user.followersCount} followers
                    </Text>
                </View>
                <ZFollowButton isFollowing={false} onPress={promoteUser} />
            </View>
        );
    },
);

const RaisedHandsContent = React.memo((props: RaisedHandsProps) => {
    const theme = useTheme();
    if (!props.users.length) {
        return <EmptyView theme={theme} />;
    }
    return (
        <View
            style={{
                paddingHorizontal: 16,
                flexGrow: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            {props.users.map((i) => (
                <RaisedHandUserView user={i} theme={theme} roomId={props.roomId} />
            ))}
        </View>
    );
});

export const showRaisedHands = (users: VoiceChatParticipant_user[], roomId: string) => {
    showBottomSheet({
        title: 'Raised hands',
        cancelable: true,
        view: ({ hide }) => {
            return <RaisedHandsContent users={users} hide={hide} roomId={roomId} />;
        },
    });
};

import * as React from 'react';
import { Clipboard, Platform, Share, Text, View } from 'react-native';
import Toast from 'openland-mobile/components/Toast';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { useClient } from 'openland-api/useClient';
import { SharedRoomKind } from 'openland-api/spacex.types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { t } from 'openland-mobile/text/useText';

const RoomInviteContent = React.memo(
    (props: { theme: ThemeGlobal }) => {
        const voiceChatData = getMessenger().engine.voiceChat.useVoiceChat();
        const client = useClient();
        const [roomInviteLink, setRoomInviteLink] = React.useState<string | undefined>();
        const [loading, setLoading] = React.useState(false);

        React.useEffect(() => {
            (async () => {
                if (
                    voiceChatData?.parentRoom?.kind === SharedRoomKind.GROUP &&
                    !roomInviteLink &&
                    !loading
                ) {
                    setLoading(true);
                    const invite = await client.queryRoomInviteLink(
                        { roomId: voiceChatData.parentRoom.id },
                        { fetchPolicy: 'network-only' },
                    );

                    setRoomInviteLink(invite.link);
                    setLoading(false);
                }
            })();
        }, [voiceChatData?.parentRoom, roomInviteLink, loading]);

        const inviteEntity = voiceChatData?.parentRoom || voiceChatData?.me!.user;
        const link = roomInviteLink
            ? `https://openland.com/invite/${roomInviteLink}`
            : inviteEntity
                ? `https://openland.com/${inviteEntity.shortname || inviteEntity.id}` : null;

        const handleShare = () => {
            if (!loading && link) {
                Share.share(
                    Platform.select({
                        ios: { url: link },
                        android: { message: link },
                        default: { message: link },
                    }),
                );
            }
        };
        const handleCopy = () => {
            if (!loading && link) {
                Clipboard.setString(link);
                Toast.showCopied();
            }
        };

        return (
            <View>
                <View
                    style={{
                        borderRadius: 12,
                        backgroundColor: props.theme.backgroundTertiaryTrans,
                        paddingHorizontal: 16,
                        paddingVertical: 13,
                        marginHorizontal: 16,
                        marginBottom: 8,
                    }}
                >
                    {loading ? (
                        <View style={{ height: 24 }}>
                            <ZLoader />
                        </View>
                    ) : (
                        <Text style={{ ...TextStyles.Body, color: props.theme.foregroundPrimary }} allowFontScaling={false}>
                            {link}
                        </Text>
                    )}
                </View>
                <ZListItem
                    leftIcon={require('assets/ic-copy-24.png')}
                    onPress={handleCopy}
                    text={t('copyLink', 'Copy link')}
                    small={true}
                />
                <ZListItem
                    leftIcon={require('assets/ic-share-24.png')}
                    onPress={handleShare}
                    text={t('shareLink', 'Share link')}
                    small={true}
                />
            </View>
        );
    });

export const showRoomInvite = ({ roomId, theme }: { roomId: string; theme: ThemeGlobal }) => {
    const builder = new ActionSheetBuilder();
    builder
        .title(t('inviteFriends', 'Invite friends'))
        .view(() => (
            <RoomInviteContent theme={theme} />
        ))
        .show();
};
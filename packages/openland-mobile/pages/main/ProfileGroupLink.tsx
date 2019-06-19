import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { Share, Clipboard } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from '../../components/ZListItem';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { RoomWithoutMembers_room_SharedRoom } from 'openland-api/Types';
import { trackEvent } from 'openland-mobile/analytics';

const ProfileGroupLinkContent = XMemo<PageProps>((props) => {
    const room = props.router.params.room as RoomWithoutMembers_room_SharedRoom;
    const invite = getClient().useRoomInviteLink({ roomId: room.id }, { fetchPolicy: 'network-only' }).link;
    const link = 'https://openland.com/invite/' + invite;
    const chatType = room.isChannel ? 'channel' : 'group';

    const handleCopyClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: chatType,
            action_type: 'link_copied'
        });

        Clipboard.setString(link);
    }, [link]);

    const handleShareClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: chatType,
            action_type: 'link_shared'
        });

        Share.share({ message: link });
    }, [link]);

    return (
        <ZTrack event="invite_view" params={{ invite_type: chatType }}>
            <ZListItemGroup header={null} footer="Anyone with link can join as group member">
                <ZListItem
                    key="add"
                    text={link}
                    appearance="action"
                    onPress={handleShareClick}
                    copy={true}
                />
            </ZListItemGroup>
            <ZListItemGroup>
                <ZListItem
                    appearance="action"
                    text="Copy link"
                    onPress={handleCopyClick}
                />
                <ZListItem
                    appearance="action"
                    text="Share link"
                    onPress={handleShareClick}
                />
                <ZListItem
                    appearance="action"
                    text="Revoke link"
                    onPress={async () => {
                        startLoader();
                        try {
                            await getClient().mutateRoomRenewInviteLink({ roomId: props.router.params.id });
                            await getClient().refetchRoomInviteLink({ roomId: props.router.params.id });
                        } catch (e) {
                            Alert.alert(e);
                        }
                        stopLoader();

                    }}
                />
            </ZListItemGroup>
        </ZTrack>
    )
});

class ProfileGroupLinkComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Invitation link" />
                <SScrollView>
                    <ProfileGroupLinkContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileGroupLink = withApp(ProfileGroupLinkComponent, { navigationAppearance: 'small' });
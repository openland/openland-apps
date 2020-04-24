import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { Share, Clipboard } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from '../../components/ZListItem';
import Alert from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { trackEvent } from 'openland-mobile/analytics';
import { InviteLinkView } from './components/InviteLinkView';
import { formatError } from 'openland-y-forms/errorHandling';

const ProfileGroupLinkContent = React.memo((props: PageProps) => {
    const { id, isChannel } = props.router.params.room as RoomChat_room_SharedRoom;
    const invite = getClient().useRoomInviteLink({ roomId: id }, { fetchPolicy: 'network-only' })
        .link;
    const link = 'https://openland.com/invite/' + invite;
    const chatType = isChannel ? 'channel' : 'group';

    React.useEffect(() => {
        trackEvent('invite_link_view', {
            invite_type: 'group',
        });
    }, []);

    const handleCopyClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: chatType,
            action_type: 'link_copied',
        });

        Clipboard.setString(link);
        Toast.showCopiedLink();
    }, [link]);

    const handleShareClick = React.useCallback(() => {
        trackEvent('invite_link_action', {
            invite_type: chatType,
            action_type: 'link_shared',
        });

        Share.share({ message: link });
    }, [link]);

    const handleRevokeClick = React.useCallback(async () => {
        const loader = Toast.loader();
        loader.show();
        try {
            await getClient().mutateRoomRenewInviteLink({ roomId: id });
            await getClient().refetchRoomInviteLink({ roomId: id });
        } catch (e) {
            Alert.alert(formatError(e));
        }
        loader.hide();
    }, [id]);

    return (
        <>
            <SHeader title={isChannel ? 'Channel link' : 'Group link'} />
            <ZTrack event="invite_view" params={{ invite_type: chatType }}>
                <InviteLinkView
                    link={link}
                    onPress={handleShareClick}
                    footer="Anyone with link can join as group member"
                />
                <ZListGroup>
                    <ZListItem
                        leftIcon={require('assets/ic-copy-24.png')}
                        small={true}
                        text="Copy link"
                        onPress={handleCopyClick}
                    />
                    <ZListItem
                        leftIcon={require('assets/ic-share-24.png')}
                        small={true}
                        text="Share link"
                        onPress={handleShareClick}
                    />
                    <ZListItem
                        leftIcon={require('assets/ic-refresh-24.png')}
                        small={true}
                        text="Revoke link"
                        onPress={handleRevokeClick}
                    />
                </ZListGroup>
            </ZTrack>
        </>
    );
});

class ProfileGroupLinkComponent extends React.PureComponent<PageProps> {
    render() {
        const { props } = this;
        return (
            <SScrollView>
                <ProfileGroupLinkContent {...props} />
            </SScrollView>
        );
    }
}

export const ProfileGroupLink = withApp(ProfileGroupLinkComponent, {
    navigationAppearance: 'small',
});

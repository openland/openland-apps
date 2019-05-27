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

const ProfileGroupLinkContent = XMemo<PageProps>((props) => {
    let invite = getClient().useRoomInviteLink({ roomId: props.router.params.id }, { fetchPolicy: 'network-only' }).link;
    let link = 'https://openland.com/invite/' + invite;

    return (
        <>
            <ZListItemGroup header={null} footer="Anyone with link can join as group member">
                <ZListItem
                    key="add"
                    text={link}
                    appearance="action"
                    onPress={() => Share.share({ message: link })}
                    copy={true}
                />
            </ZListItemGroup>
            <ZListItemGroup >
                <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(link)} />
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
            <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ message: link })} />
        </>
    )
});

class ProfileGroupLinkComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Invitation link" />
                {/* <SHeaderButton title="Done" onPress={() => this.props.router.dismiss()} /> */}
                <SScrollView>
                    <ProfileGroupLinkContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileGroupLink = withApp(ProfileGroupLinkComponent, { navigationAppearance: 'small' });
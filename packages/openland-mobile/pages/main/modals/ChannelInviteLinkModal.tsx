import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { Share, Alert, Clipboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ZListItem } from '../../../components/ZListItem';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { RoomInviteLinkQuery, RoomRenewInviteLinkMutation } from 'openland-api';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

class ChannelInviteLinkModalComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Room invite link" />
                <SScrollView>
                    <YQuery query={RoomInviteLinkQuery} variables={{ roomId: this.props.router.params.id }}>
                        {data => (
                            <>
                                <ZListItemGroup footer="People can join channel by following this link. You can renew the link at any time">
                                    {data && data.data && data.data.link && (<ZListItem
                                        key="add"
                                        text={`https://openland.com/joinChannel/${data.data!.link}`}
                                        appearance="action"
                                        onPress={() => Share.share({ message: `https://openland.com/joinChannel/${data.data!.link}` })}
                                    />)}
                                </ZListItemGroup>
                                <ZListItemGroup >
                                    <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(`https://openland.com/joinChannel/${data.data!.link}`)} />
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ message: `https://openland.com/joinChannel/${data.data!.link}` })} />
                                    <YMutation mutation={RoomRenewInviteLinkMutation} variables={{ roomId: this.props.router.params.id }} refetchQueriesVars={[{ query: RoomInviteLinkQuery, variables: { roomId: this.props.router.params.id } }]}>
                                        {renew => <ZListItem
                                            appearance="action"
                                            text="Renew link"
                                            onPress={async () => {
                                                startLoader();
                                                try {
                                                    await renew({ variables: { roomId: this.props.router.params.id } });
                                                } catch (e) {
                                                    new AlertBlanketBuilder().alert(e);
                                                }
                                                stopLoader();

                                            }}
                                        />}
                                    </YMutation>
                                </ZListItemGroup>
                            </>)}

                    </YQuery>

                </SScrollView>
            </>
        );
    }
}

export const ChannelInviteLinkModal = withApp(ChannelInviteLinkModalComponent, { navigationAppearance: 'small' });
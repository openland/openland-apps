import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { Share, Alert, Clipboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChannelRenewInviteLinkMutation } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { ChannelInviteLinkQuery } from 'openland-api';

class ChannelInviteLinkModalComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Channel invite link" />
                <SScrollView>
                    <YQuery query={ChannelInviteLinkQuery} variables={{ channelId: this.props.router.params.id }}>
                        {data => (
                            <>
                                <ZListItemGroup footer="People can join channel by following this link. You can renew the link at any time">
                                    {data && data.data && data.data.link && (<ZListItem
                                        key="add"
                                        text={`https://app.openland.com/joinChannel/${data.data!.link}`}
                                        appearance="action"
                                        onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: `Join Openland! - Messaging for smart people https://app.openland.com/joinChannel/${data.data!.link}` })}
                                    />)}
                                </ZListItemGroup>
                                <ZListItemGroup >
                                    <ZListItem appearance="action" text="Copy link" onPress={() => Clipboard.setString(`Join Openland! - Messaging for smart people https://app.openland.com/joinChannel/${data.data!.link}`)} />
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: `Join Openland! - Messaging for smart people https://app.openland.com/joinChannel/${data.data!.link}` })} />
                                    <YMutation mutation={ChannelRenewInviteLinkMutation} variables={{ channelId: this.props.router.params.id }} refetchQueriesVars={[{ query: ChannelInviteLinkQuery, variables: { channelId: this.props.router.params.id } }]}>
                                        {renew => <ZListItem
                                            appearance="action"
                                            text="Renew link"
                                            onPress={async () => {
                                                startLoader();
                                                try {
                                                    await renew({ variables: { channelId: this.props.router.params.id } });
                                                } catch (e) {
                                                    Alert.alert(e);
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
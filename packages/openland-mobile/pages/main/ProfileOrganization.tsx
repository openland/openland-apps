import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { OrganizationQuery, ProfileUpdateMutation, ProfileQuery, AccountSettingsQuery, OrganizationRemoveMemberMutation, OrganizationChangeMemberRoleMutation, OrganizationMembersQuery, OrganizationPublicInviteQuery, ConversationSettingsUpdateMutation } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { Alert, View, Text, Image, TouchableHighlight } from 'react-native';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api';
import { UserViewAsync } from '../compose/ComposeInitial';
import { ChannelViewAsync, ArrowWrapper } from './OrgChannels';
import { XPStyles } from 'openland-xp/XPStyles';

class ProfileOrganizationComponent extends React.Component<PageProps> {

    handleSend = () => {
        this.props.router.pushAndReset('Conversation', { 'flexibleId': this.props.router.params.id });
    }

    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={AccountSettingsQuery}>
                    {settings => (
                        <ZQuery query={OrganizationQuery} variables={{ organizationId: this.props.router.params.id }}>
                            {(resp) => {
                                return (
                                    <>
                                        <SScrollView backgroundColor={'#fff'}>
                                            <ZListItemHeader
                                                photo={resp.data.organization.photo}
                                                id={resp.data.organization.id}
                                                title={resp.data.organization.name}
                                                subtitle="Organization"
                                                action="Send message"
                                                onPress={this.handleSend}
                                            />
                                            {(resp.data.organization.isMine || resp.data.organization.isOwner || this.props.router.params.conversationId) && (
                                                <ZListItemGroup header={null}>

                                                    {this.props.router.params.conversationId &&
                                                        <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.router.params.conversationId }} {...{ compact: true }}>
                                                            {conv => conv.data ? (
                                                                <YMutation mutation={ConversationSettingsUpdateMutation}>
                                                                    {(update) => {
                                                                        let toggle = async () => {
                                                                            startLoader();
                                                                            try {
                                                                                await update({ variables: { conversationId: conv.data!.chat.id, settings: { mute: !conv.data!.chat.settings.mute } } });
                                                                            } catch (e) {
                                                                                Alert.alert(e.message);
                                                                            }
                                                                            stopLoader();
                                                                        };
                                                                        return (
                                                                            <ZListItem
                                                                                leftIcon={require('assets/ic-cell-notif-ios.png')}
                                                                                title="Notifications"
                                                                                compact={true}
                                                                                toggle={!conv.data!.chat.settings.mute}
                                                                                onToggle={toggle}
                                                                                onPress={toggle}
                                                                            />
                                                                        );
                                                                    }
                                                                    }
                                                                </YMutation>
                                                            ) : null}
                                                        </YQuery>

                                                    }
                                                    {resp.data.organization.isMine && resp.data.organization.id !== (settings.data && settings.data.primaryOrganization && settings.data.primaryOrganization.id) && <YMutation mutation={ProfileUpdateMutation} refetchQueries={[AccountSettingsQuery]}>
                                                        {updateProfile => (
                                                            <ZListItem
                                                                text="Make primary"

                                                                appearance="action"
                                                                onPress={async () => {
                                                                    startLoader();
                                                                    await updateProfile({ variables: { input: { alphaPrimaryOrganizationId: resp.data.organization.id } } });
                                                                    stopLoader();

                                                                }}
                                                            />
                                                        )}
                                                    </YMutation>}
                                                </ZListItemGroup>
                                            )}
                                            <ZListItemGroup header="Information" actionRight={resp.data.organization.isOwner ? { title: 'Edit info', onPress: () => this.props.router.push('EditOrganization', { id: this.props.router.params.id }) } : undefined}>
                                                {resp.data.organization.about && <ZListItem multiline={true} title="about" text={resp.data.organization.about} />}
                                                {resp.data.organization.website && <ZListItem title="website" text={resp.data.organization.website} />}
                                                {resp.data.organization.facebook && <ZListItem title="facebook" text={resp.data.organization.facebook} />}
                                                {resp.data.organization.twitter && <ZListItem title="twitter" text={resp.data.organization.twitter} />}
                                            </ZListItemGroup>

                                            <ZListItemGroup header="Public channels" divider={false} actionRight={resp.data.organization.channels.length > 3 ? { title: 'Show all', onPress: () => this.props.router.push('OrgChannels', { organizationId: resp.data.organization.id, title: resp.data.organization.name + ' channels' }) } : undefined}>
                                                {resp.data.organization.channels.filter((c, i) => i <= 2).map((v) => (
                                                    <ArrowWrapper>
                                                        <ChannelViewAsync
                                                            key={v!!.id}
                                                            item={v!}
                                                            onPress={() => this.props.router.push('Conversation', { flexibleId: v!!.id })}
                                                        />

                                                    </ArrowWrapper>
                                                ))}
                                            </ZListItemGroup>

                                            <YMutation mutation={OrganizationChangeMemberRoleMutation} refetchQueriesVars={[{ query: OrganizationQuery, variables: { organizationId: this.props.router.params.id } }]}>
                                                {changeRole => (
                                                    <YMutation mutation={OrganizationRemoveMemberMutation} refetchQueriesVars={[{ query: OrganizationQuery, variables: { organizationId: this.props.router.params.id } }]}>
                                                        {remove => (
                                                            <ZListItemGroup header="Members" divider={false}>
                                                                {resp.data.organization.isMine &&
                                                                    <TouchableHighlight underlayColor={XPStyles.colors.selectedListItem} onPress={() => this.props.router.push('OrganizationInviteLinkModal')}>
                                                                        <View flexDirection="row" height={60} alignItems="center" >
                                                                            <View marginLeft={16} marginRight={16} width={40} height={40} borderRadius={20} borderWidth={1} borderColor={XPStyles.colors.brand} justifyContent="center" alignItems="center">
                                                                                <Image source={require('assets/ic-add.png')} />
                                                                            </View>
                                                                            <Text style={{ color: '#4747ec', fontWeight: '500', fontSize: 16 }}>Add members</Text>
                                                                            <View style={{ position: 'absolute', bottom: 0, width: '100%' }} height={1} flexGrow={1} marginLeft={70} backgroundColor={XPStyles.colors.selectedListItem} />

                                                                        </View>
                                                                    </TouchableHighlight>
                                                                }

                                                                {resp.data.organization.members.map((v) => (
                                                                    // <ZListItem
                                                                    //     key={v.user.id}
                                                                    //     text={v.user.name}
                                                                    //     leftAvatar={{ photo: v.user.picture, title: v.user.name, key: v.user.id }}
                                                                    //     description={v.role === 'OWNER' ? 'owner' : undefined}

                                                                    // />
                                                                    <View>
                                                                        <UserViewAsync
                                                                            item={v.user}
                                                                            onPress={() => this.props.router.push('ProfileUser', { id: v.user.id })}
                                                                            onLongPress={v.user.id !== getMessenger().engine.user.id ? async () => {
                                                                                let builder = new ActionSheetBuilder();

                                                                                builder.action(
                                                                                    v.role === 'MEMBER' ? 'Make owner' : 'Make member',
                                                                                    () => {
                                                                                        Alert.alert(`Are you sure you want to make ${v.user.name} ${v.role === 'MEMBER' ? 'owner' : 'member'}?`, undefined, [{
                                                                                            onPress: async () => {
                                                                                                startLoader();
                                                                                                try {
                                                                                                    await changeRole({ variables: { memberId: v.user.id, organizationId: this.props.router.params.id, newRole: (v.role === 'MEMBER' ? 'OWNER' : 'MEMBER') as any } });
                                                                                                } catch (e) {
                                                                                                    Alert.alert(e.message);
                                                                                                }
                                                                                                stopLoader();
                                                                                            },
                                                                                            text: v.role === 'MEMBER' ? 'Make owner' : 'Make member',
                                                                                        },
                                                                                        {
                                                                                            text: 'Cancel',
                                                                                            style: 'cancel'
                                                                                        }]);
                                                                                    },
                                                                                );

                                                                                builder.action(
                                                                                    'Remove',
                                                                                    () => {
                                                                                        Alert.alert(`Are you sure you want to remove ${v.user.name}?`, undefined, [{
                                                                                            onPress: async () => {
                                                                                                startLoader();
                                                                                                try {
                                                                                                    await remove({ variables: { memberId: v.user.id, organizationId: this.props.router.params.id } });
                                                                                                } catch (e) {
                                                                                                    Alert.alert(e.message);
                                                                                                }
                                                                                                stopLoader();
                                                                                            },
                                                                                            text: 'Remove',
                                                                                            style: 'destructive'
                                                                                        },
                                                                                        {
                                                                                            text: 'Cancel',
                                                                                            style: 'cancel'
                                                                                        }]);
                                                                                    },
                                                                                    true
                                                                                );
                                                                                builder.show();

                                                                            } : undefined}
                                                                        />
                                                                        <Text style={{ position: 'absolute', right: 16, height: 60, lineHeight: 60, fontSize: 15, color: '#99a2b0' }}>{v.role === 'OWNER' ? 'Owner' : undefined}</Text>
                                                                    </View>
                                                                ))}
                                                            </ZListItemGroup>
                                                        )}
                                                    </YMutation>
                                                )}
                                            </YMutation>

                                        </SScrollView>
                                    </>
                                );
                            }}
                        </ZQuery>
                    )}

                </ZQuery>
            </>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, { navigationAppearance: 'small-hidden' });
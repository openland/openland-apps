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
import { Alert } from 'react-native';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api';

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
                                                    {resp.data.organization.isOwner && <ZListItem text="Edit info" appearance="action" onPress={() => this.props.router.push('EditOrganization', { id: this.props.router.params.id })} />}
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
                                                    {this.props.router.params.conversationId &&
                                                        <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.router.params.conversationId }}>
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
                                                                                text="Notifications"
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
                                                </ZListItemGroup>
                                            )}
                                            <ZListItemGroup header="Information">
                                                {resp.data.organization.about && <ZListItem multiline={true} title="about" text={resp.data.organization.about} />}
                                                {resp.data.organization.website && <ZListItem title="website" text={resp.data.organization.website} />}
                                                {resp.data.organization.facebook && <ZListItem title="facebook" text={resp.data.organization.facebook} />}
                                                {resp.data.organization.twitter && <ZListItem title="twitter" text={resp.data.organization.twitter} />}
                                            </ZListItemGroup>

                                            <ZListItemGroup header="Public channels">
                                                {resp.data.organization.channels.map((v) => (
                                                    <ZListItem
                                                        key={v!!.id}
                                                        leftAvatar={{ photo: v!!.photo, title: v!!.title, key: v!!.id }}
                                                        text={v!!.title}
                                                        onPress={() => this.props.router.pushAndReset('Conversation', { flexibleId: v!!.id })}
                                                    />
                                                ))}
                                            </ZListItemGroup>

                                            <YMutation mutation={OrganizationChangeMemberRoleMutation} refetchQueriesVars={[{ query: OrganizationQuery, variables: { organizationId: this.props.router.params.id } }]}>
                                                {changeRole => (
                                                    <YMutation mutation={OrganizationRemoveMemberMutation} refetchQueriesVars={[{ query: OrganizationQuery, variables: { organizationId: this.props.router.params.id } }]}>
                                                        {remove => (
                                                            <ZListItemGroup header="Members" >
                                                                {resp.data.organization.isMine && <ZListItem
                                                                    key="add"
                                                                    text=" 👋 Invite via Link"
                                                                    appearance="action"
                                                                    path="OrganizationInviteLinkModal"
                                                                />}

                                                                {resp.data.organization.members.map((v) => (
                                                                    <ZListItem
                                                                        key={v.user.id}
                                                                        text={v.user.name}
                                                                        leftAvatar={{ photo: v.user.picture, title: v.user.name, key: v.user.id }}
                                                                        description={v.role === 'OWNER' ? 'owner' : undefined}
                                                                        onPress={() => this.props.router.push('ProfileUser', { id: v.user.id })}
                                                                        onLongPress={v.user.id !== getMessenger().engine.user.id ? async () => {
                                                                            console.warn('boom', JSON.stringify(v));
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
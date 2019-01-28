import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import {
    OrganizationQuery,
    AccountSettingsQuery,
    RoomQuery,
} from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChannelViewAsync, ArrowWrapper } from './OrgChannels';
import { UserView } from './components/UserView';
import { Modals } from './modals/Modals';
import { formatError } from 'openland-y-forms/errorHandling';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';

class ProfileOrganizationComponent extends React.Component<PageProps> {

    render() {
        // const toggleMute = async () => {
        //     startLoader();
        //     try {
        //         getClient().mutateRoomSettingsUpdate({
        //             roomId: this.props.router.params.conversationId,
        //             settings: {
        //                 mute: !conv.data!.room!.settings.mute,
        //             },
        //         })
        //         await update({
        //             variables: {
        //                 roomId: conv.data!.room!.id,
        //                 settings: {
        //                     mute: !conv.data!.room!.settings.mute,
        //                 },
        //             },
        //         });
        //     } catch (e) {
        //         Alert.alert(e.message);
        //     }
        //     stopLoader();
        // };
        return (
            <>
                <SHeader title="Info" />
                <SScrollView backgroundColor={'#fff'}>
                    <ZQuery query={AccountSettingsQuery}>
                        {settings => (
                            <ZQuery
                                query={OrganizationQuery}
                                variables={{ organizationId: this.props.router.params.id }}
                            >
                                {resp => {
                                    return (
                                        <>
                                            <ZListItemHeader
                                                photo={resp.data.organization.photo}
                                                id={resp.data.organization.id}
                                                title={resp.data.organization.name}
                                                subtitle={resp.data.organization.isCommunity ? 'Community' : 'Organization'}
                                            />
                                            {resp.data.organization.isOwner && <SHeaderButton title="Edit" onPress={() => this.props.router.push('EditOrganization', { id: this.props.router.params.id })} />}
                                            {(resp.data.organization.isMine || resp.data.organization.isOwner || resp.data.organization.isAdmin || this.props.router.params.conversationId) && (
                                                <ZListItemGroup header="Manage" divider={false}>
                                                    {this.props.router.params.conversationId && (
                                                        <YQuery
                                                            query={RoomQuery}
                                                            variables={{
                                                                id: this.props.router.params.conversationId,
                                                            }}
                                                            {...{ leftIcon: true }}
                                                        >
                                                            {conv => conv.data ? (
                                                                <ZListItem
                                                                    leftIcon={require('assets/ic-cell-notif-ios.png')}
                                                                    text="Notifications"
                                                                    toggle={!conv.data!.room!.settings.mute}
                                                                    onToggle={async () => {
                                                                        startLoader();
                                                                        try {
                                                                            await getClient().mutateRoomSettingsUpdate({
                                                                                roomId: conv.data!.room!.id,
                                                                                settings: {
                                                                                    mute: !conv.data!.room!.settings.mute,
                                                                                },
                                                                            });
                                                                        } catch (e) {
                                                                            Alert.alert(e.message);
                                                                        }
                                                                        stopLoader();
                                                                    }}
                                                                />
                                                            ) : null
                                                            }
                                                        </YQuery>
                                                    )}
                                                    {resp.data.organization.isMine && resp.data.organization.id !== (settings.data && settings.data.me!.primaryOrganization && settings.data.me!.primaryOrganization!.id) && (
                                                        <ZListItem
                                                            text="Make primary"
                                                            appearance="action"
                                                            onPress={async () => {
                                                                startLoader();
                                                                try {
                                                                    await getClient().mutateProfileUpdate({
                                                                        input: {
                                                                            alphaPrimaryOrganizationId: resp.data.organization.id,
                                                                        },
                                                                    });
                                                                    await getClient().refetchAccountSettings();
                                                                } finally {
                                                                    stopLoader();
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </ZListItemGroup>
                                            )}
                                            <ZListItemGroup
                                                divider={false}
                                                header="About"
                                            >
                                                {resp.data.organization.about && (
                                                    <ZListItem multiline={true} text={resp.data.organization.about} copy={true} />
                                                )}
                                                {resp.data.organization.about && (
                                                    <View height={10} />
                                                )}
                                                {resp.data.organization.shortname && (
                                                    <ZListItem title="Shortname" text={'@' + resp.data.organization.shortname} copy={true} />
                                                )}
                                                {resp.data.organization.website && (
                                                    <ZListItem title="Website" text={resp.data.organization.website} copy={true} />
                                                )}
                                                {resp.data.organization.twitter && (
                                                    <ZListItem title="Twitter" text={resp.data.organization.twitter} copy={true} />
                                                )}
                                                {resp.data.organization.facebook && (
                                                    <ZListItem title="Facebook" text={resp.data.organization.facebook} copy={true} />
                                                )}
                                                {resp.data.organization.linkedin && (
                                                    <ZListItem title="Linkedin" text={resp.data.organization.linkedin} copy={true} />
                                                )}

                                            </ZListItemGroup>

                                            {resp.data.organization.rooms.length > 0 && (
                                                <ZListItemGroup
                                                    header="Rooms"
                                                    divider={false}
                                                >
                                                    {resp.data.organization.rooms
                                                        .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0))
                                                        .filter((c, i) => i <= 2)
                                                        .map(v => (
                                                            <ArrowWrapper>
                                                                <ChannelViewAsync
                                                                    key={v!!.id}
                                                                    item={v!}
                                                                    onPress={() =>
                                                                        this.props.router.push(
                                                                            'Conversation',
                                                                            {
                                                                                flexibleId: v!!.id,
                                                                            },
                                                                        )
                                                                    }
                                                                />
                                                            </ArrowWrapper>
                                                        ))}
                                                    {resp.data.organization.rooms.length > 3 && (
                                                        <ZListItem
                                                            leftIcon={require('assets/ic-more-24.png')}
                                                            text="More rooms"
                                                            path="OrgChannels"
                                                            pathParams={{
                                                                organizationId: resp.data.organization.id,
                                                                title: resp.data.organization.name + ' rooms',
                                                            }}
                                                            navigationIcon={false}
                                                        />)}
                                                </ZListItemGroup>
                                            )}

                                            {/* <YMutation
                                                mutation={OrganizationChangeMemberRoleMutation}
                                                refetchQueriesVars={[
                                                    {
                                                        query: OrganizationQuery,
                                                        variables: {
                                                            organizationId: this.props.router.params.id,
                                                        },
                                                    },
                                                ]}
                                            >
                                                {changeRole => (
                                                    <YMutation
                                                        mutation={OrganizationRemoveMemberMutation}
                                                        refetchQueriesVars={[
                                                            {
                                                                query: OrganizationQuery,
                                                                variables: {
                                                                    organizationId: this.props.router.params.id,
                                                                },
                                                            },
                                                        ]}
                                                    >
                                                        {remove => ( */}
                                            <ZListItemGroup header="Members" divider={false} >
                                                {resp.data.organization.isMine && (
                                                    <ZListItem
                                                        leftIcon={require('assets/ic-add-24.png')}
                                                        text="Add Members"
                                                        onPress={() => {
                                                            Modals.showUserMuptiplePicker(this.props.router,
                                                                {
                                                                    title: 'Add',
                                                                    action: async (users) => {
                                                                        startLoader();
                                                                        try {
                                                                            await getMessenger().engine.client.mutateOrganizationAddMember({ userIds: users.map(u => u.id), organizationId: resp.data.organization.id })
                                                                        } catch (e) {
                                                                            Alert.alert(formatError(e));
                                                                        }
                                                                        stopLoader();
                                                                        this.props.router.back();
                                                                    }
                                                                },
                                                                'Add members',
                                                                resp.data.organization.members.map(u => u.user.id),
                                                                { path: 'OrganizationInviteLinkModal', pathParams: { id: resp.data.organization.id } });
                                                        }}
                                                    />
                                                )}

                                                {resp.data.organization.members.map(
                                                    v => (
                                                        // <ZListItem
                                                        //     key={v.user.id}
                                                        //     text={v.user.name}
                                                        //     leftAvatar={{ photo: v.user.picture, title: v.user.name, key: v.user.id }}
                                                        //     description={v.role === 'OWNER' ? 'owner' : undefined}

                                                        // />
                                                        <UserView
                                                            user={
                                                                v.user
                                                            }
                                                            // isAdmin={v.role === 'ADMIN' || v.role === 'OWNER'}

                                                            onPress={() => this.props.router.push('ProfileUser', { id: v.user.id, })}
                                                            onLongPress={v.user.id === getMessenger().engine.user.id || (resp.data.organization.isOwner || resp.data.organization.isAdmin) ?
                                                                async () => {

                                                                    let builder = new ActionSheetBuilder();

                                                                    if (v.user.id !== getMessenger().engine.user.id && resp.data.organization.isOwner) {
                                                                        builder.action(v.role === 'MEMBER' ? 'Make admin' : 'Revoke admin status',
                                                                            () => {
                                                                                Alert.builder()
                                                                                    .title(`Are you sure you want to make ${v.user.name} ${v.role === 'MEMBER' ? 'admin' : 'member'}?`)
                                                                                    .button('Cancel', 'cancel')
                                                                                    .action(v.role === 'MEMBER' ? 'Make admin' : 'Revoke', 'default', async () => {
                                                                                        await getClient().mutateOrganizationChangeMemberRole({
                                                                                            memberId: v.user.id,
                                                                                            organizationId: this.props.router.params.id,
                                                                                            newRole: (v.role === 'MEMBER' ? 'OWNER' : 'MEMBER') as any,
                                                                                        });
                                                                                        await getClient().refetchOrganization({ organizationId: this.props.router.params.id });
                                                                                    }).show();
                                                                            },
                                                                        );
                                                                    }
                                                                    if (resp.data.organization.isOwner || resp.data.organization.isAdmin || v.user.id !== getMessenger().engine.user.id) {
                                                                        builder.action(v.user.id === getMessenger().engine.user.id ? 'Leave organization' : 'Remove from organization',
                                                                            () => {
                                                                                Alert.builder()
                                                                                    .title(v.user.id === getMessenger().engine.user.id ? 'Are you sure want to leave?' : `Are you sure want to remove ${v.user.name}?`)
                                                                                    .button('Cancel', 'cancel')
                                                                                    .action(v.user.id === getMessenger().engine.user.id ? 'Leave' : 'Remove', 'destructive', async () => {
                                                                                        await getClient().mutateOrganizationRemoveMember({
                                                                                            memberId: v.user.id,
                                                                                            organizationId: this.props.router.params.id,
                                                                                        });
                                                                                        await getClient().refetchOrganization({ organizationId: this.props.router.params.id });
                                                                                    })
                                                                                    .show()

                                                                            },
                                                                            true,
                                                                        );
                                                                    }

                                                                    builder.show();
                                                                }
                                                                : undefined
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </ZListItemGroup>
                                            {/* )}
                                                    </YMutation>
                                                )}
                                            </YMutation> */}
                                        </>
                                    );
                                }}
                            </ZQuery>
                        )}
                    </ZQuery>
                </SScrollView>
            </>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import {
    OrganizationQuery,
    ProfileUpdateMutation,
    AccountSettingsQuery,
    OrganizationRemoveMemberMutation,
    OrganizationChangeMemberRoleMutation,
    RoomQuery,
    RoomSettingsUpdateMutation,
} from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { YMutation } from 'openland-y-graphql/YMutation';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { View, Text } from 'react-native';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { YQuery } from 'openland-y-graphql/YQuery';
import { UserViewAsync } from '../compose/ComposeInitial';
import { ChannelViewAsync, ArrowWrapper } from './OrgChannels';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

class ProfileOrganizationComponent extends React.Component<PageProps> {

    render() {
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
                                                subtitle="Organization"
                                                action={resp.data.organization.isOwner ? 'Edit profile' : undefined}
                                                onPress={() => this.props.router.push('EditOrganization', { id: this.props.router.params.id })}
                                            />
                                            {(resp.data.organization.isMine || resp.data.organization.isOwner || resp.data.organization.isAdmin || this.props.router.params.conversationId) && (
                                                <ZListItemGroup header={null} divider={false}>
                                                    {this.props.router.params.conversationId && (
                                                        <YQuery
                                                            query={RoomQuery}
                                                            variables={{
                                                                id: this.props.router.params.conversationId,
                                                            }}
                                                            {...{ leftIcon: true }}
                                                        >
                                                            {conv => conv.data ? (
                                                                <YMutation
                                                                    mutation={RoomSettingsUpdateMutation}
                                                                >
                                                                    {update => {
                                                                        let toggle = async () => {
                                                                            startLoader();
                                                                            try {
                                                                                await update({
                                                                                    variables: {
                                                                                        roomId: conv.data!.room!.id,
                                                                                        settings: {
                                                                                            mute: !conv.data!.room!.settings.mute,
                                                                                        },
                                                                                    },
                                                                                });
                                                                            } catch (e) {
                                                                                new AlertBlanketBuilder().alert(e.message);
                                                                            }
                                                                            stopLoader();
                                                                        };
                                                                        return (
                                                                            <ZListItem
                                                                                leftIcon={require('assets/ic-cell-notif-ios.png')}
                                                                                text="Notifications"
                                                                                toggle={!conv.data!.room!.settings.mute}
                                                                                onToggle={toggle}
                                                                                onPress={toggle}
                                                                            />
                                                                        );
                                                                    }}
                                                                </YMutation>
                                                            ) : null
                                                            }
                                                        </YQuery>
                                                    )}
                                                    {resp.data.organization.isMine && resp.data.organization.id !== (settings.data && settings.data.me!.primaryOrganization && settings.data.me!.primaryOrganization!.id) && (
                                                        <YMutation
                                                            mutation={ProfileUpdateMutation}
                                                            refetchQueries={[AccountSettingsQuery]}
                                                        >
                                                            {updateProfile => (
                                                                <ZListItem
                                                                    text="Make primary"
                                                                    appearance="action"
                                                                    onPress={async () => {
                                                                        startLoader();
                                                                        await updateProfile(
                                                                            {
                                                                                variables: {
                                                                                    input: {
                                                                                        alphaPrimaryOrganizationId: resp.data.organization.id,
                                                                                    },
                                                                                },
                                                                            },
                                                                        );
                                                                        stopLoader();
                                                                    }}
                                                                />
                                                            )}
                                                        </YMutation>
                                                    )}
                                                </ZListItemGroup>
                                            )}
                                            <ZListItemGroup
                                                divider={false}
                                                header={null}
                                            >
                                                {resp.data.organization.about && (
                                                    <ZListItem multiline={true} title="About" text={resp.data.organization.about} copy={true} />
                                                )}
                                                {resp.data.organization.shortname && (
                                                    <ZListItem multiline={true} title="Shortname" text={'@' + resp.data.organization.shortname} copy={true} />
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

                                            <ZListItemGroup
                                                header="Rooms"
                                                divider={false}
                                                actionRight={
                                                    resp.data.organization.rooms.length > 3
                                                        ? {
                                                            title: 'Show all',
                                                            onPress: () =>
                                                                this.props.router.push(
                                                                    'OrgChannels',
                                                                    {
                                                                        organizationId: resp.data.organization.id,
                                                                        title: resp.data.organization.name + ' rooms',
                                                                    },
                                                                ),
                                                        }
                                                        : undefined
                                                }
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
                                            </ZListItemGroup>

                                            <YMutation
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
                                                        {remove => (
                                                            <ZListItemGroup header="Members" divider={false} >
                                                                {resp.data.organization.isMine && (
                                                                    <ZListItem
                                                                        leftIcon={require('assets/ic-add-24.png')}
                                                                        text="Add Members"
                                                                        path="OrganizationInviteLinkModal"
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
                                                                        <View>
                                                                            <UserViewAsync
                                                                                item={
                                                                                    v.user
                                                                                }
                                                                                isAdmin={v.role === 'ADMIN' || v.role === 'OWNER'}

                                                                                onPress={() => this.props.router.push('ProfileUser', { id: v.user.id, })}
                                                                                onLongPress={v.user.id === getMessenger().engine.user.id || (resp.data.organization.isOwner || resp.data.organization.isAdmin) ?
                                                                                    async () => {

                                                                                        let builder = new ActionSheetBuilder();

                                                                                        if (v.user.id !== getMessenger().engine.user.id && resp.data.organization.isOwner) {
                                                                                            builder.action(v.role === 'MEMBER' ? 'Make admin' : 'Revoke admin status',
                                                                                                () => {
                                                                                                    new AlertBlanketBuilder()
                                                                                                        .title(`Are you sure you want to make ${v.user.name} ${v.role === 'MEMBER' ? 'admin' : 'member'}?`)
                                                                                                        .button('Cancel', 'cancel')
                                                                                                        .button(v.role === 'MEMBER' ? 'Make admin' : 'Revoke admin status', 'default', async () => {
                                                                                                            startLoader();
                                                                                                            try {
                                                                                                                await changeRole({
                                                                                                                    variables: {
                                                                                                                        memberId: v.user.id,
                                                                                                                        organizationId: this.props.router.params.id,
                                                                                                                        newRole: (v.role === 'MEMBER' ? 'OWNER' : 'MEMBER') as any,
                                                                                                                    },
                                                                                                                });
                                                                                                            } catch (e) {
                                                                                                                new AlertBlanketBuilder().alert(e.message);
                                                                                                            }
                                                                                                            stopLoader();
                                                                                                        }).show();
                                                                                                },
                                                                                            );
                                                                                        }
                                                                                        if (resp.data.organization.isOwner || resp.data.organization.isAdmin || v.user.id !== getMessenger().engine.user.id) {
                                                                                            builder.action(v.user.id === getMessenger().engine.user.id ? 'Leave organization' : 'Remove from organization',
                                                                                                () => {
                                                                                                    new AlertBlanketBuilder()
                                                                                                        .title(v.user.id === getMessenger().engine.user.id ? 'Are you sure want to leave?' : `Are you sure want to remove ${v.user.name}?`)
                                                                                                        .button('Cancel', 'cancel')
                                                                                                        .button(v.user.id === getMessenger().engine.user.id ? 'Leave' : 'Remove', 'destructive', async () => {
                                                                                                            startLoader();
                                                                                                            try {
                                                                                                                await remove({
                                                                                                                    variables: {
                                                                                                                        memberId: v.user.id,
                                                                                                                        organizationId: this.props.router.params.id,
                                                                                                                    },
                                                                                                                });
                                                                                                            } catch (e) {
                                                                                                                new AlertBlanketBuilder().alert(e.message);
                                                                                                            }
                                                                                                            stopLoader();
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

                                                                        </View>
                                                                    ),
                                                                )}
                                                            </ZListItemGroup>
                                                        )}
                                                    </YMutation>
                                                )}
                                            </YMutation>
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

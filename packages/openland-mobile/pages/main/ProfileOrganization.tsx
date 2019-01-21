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
import { Alert, View, Text, Image, TouchableHighlight } from 'react-native';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { YQuery } from 'openland-y-graphql/YQuery';
import { UserViewAsync } from '../compose/ComposeInitial';
import { ChannelViewAsync, ArrowWrapper } from './OrgChannels';
import { XPStyles } from 'openland-xp/XPStyles';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

class ProfileOrganizationComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={AccountSettingsQuery}>
                    {settings => (
                        <ZQuery
                            query={OrganizationQuery}
                            variables={{ organizationId: this.props.router.params.id }}
                        >
                            {resp => {
                                return (
                                    <>
                                        <SScrollView backgroundColor={'#fff'}>
                                            <ZListItemHeader
                                                photo={resp.data.organization.photo}
                                                id={resp.data.organization.id}
                                                title={resp.data.organization.name}
                                                subtitle="Organization"
                                            />
                                            {(resp.data.organization.isMine || resp.data.organization.isOwner || this.props.router.params.conversationId) && (
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
                                                actionRight={
                                                    resp.data.organization.isOwner
                                                        ? {
                                                            title: 'Edit info',
                                                            onPress: () =>
                                                                this.props.router.push('EditOrganization', { id: this.props.router.params.id }),
                                                        }
                                                        : undefined
                                                }
                                            >
                                                {resp.data.organization.about && (
                                                    <ZListItem multiline={true} title="about" text={resp.data.organization.about} />
                                                )}
                                                {resp.data.organization.website && (
                                                    <ZListItem title="website" text={resp.data.organization.website} />
                                                )}
                                                {resp.data.organization.facebook && (
                                                    <ZListItem title="facebook" text={resp.data.organization.facebook} />
                                                )}
                                                {resp.data.organization.twitter && (
                                                    <ZListItem title="twitter" text={resp.data.organization.twitter} />
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
                                                                                onPress={() => this.props.router.push('ProfileUser', { id: v.user.id, })}
                                                                                onLongPress={v.user.id !== getMessenger().engine.user.id ?
                                                                                    async () => {
                                                                                        let builder = new ActionSheetBuilder();

                                                                                        builder.action(v.role === 'MEMBER' ? 'Make owner' : 'Make member',
                                                                                            () => {
                                                                                                new AlertBlanketBuilder()
                                                                                                    .title(`Are you sure you want to make ${v.user.name} ${v.role === 'MEMBER' ? 'owner' : 'member'}?`)
                                                                                                    .button('Cancel', 'cancel')
                                                                                                    .button('Make owner', 'default', async () => {
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

                                                                                        builder.action('Remove',
                                                                                            () => {
                                                                                                new AlertBlanketBuilder()
                                                                                                    .title(`Are you sure you want to remove ${v.user.name}?`)
                                                                                                    .button('Cancel', 'cancel')
                                                                                                    .button('Remove', 'destructive', async () => {
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
                                                                                        builder.show();
                                                                                    }
                                                                                    : undefined
                                                                                }
                                                                            />
                                                                            <Text
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    right: 16,
                                                                                    height: 60,
                                                                                    lineHeight: 60,
                                                                                    fontSize: 15,
                                                                                    color: '#99a2b0',
                                                                                }}
                                                                            >
                                                                                {v.role === 'OWNER' ? 'Owner' : undefined}
                                                                            </Text>
                                                                        </View>
                                                                    ),
                                                                )}
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

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

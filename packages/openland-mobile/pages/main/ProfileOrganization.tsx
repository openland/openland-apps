import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListHero } from '../../components/ZListHero';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { UserView } from './components/UserView';
import { Modals } from './modals/Modals';
import { formatError } from 'openland-y-forms/errorHandling';
import Alert from 'openland-mobile/components/AlertBlanket';
import { View, Platform, Text } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import {
    OrganizationMemberRole,
    Organization_organization,
    OrganizationMembers_organization_members,
    OrganizationMembers_organization_members_user,
} from 'openland-api/spacex.types';
import { GroupView } from './components/GroupView';
import { SFlatList } from 'react-native-s/SFlatList';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { trackEvent } from 'openland-mobile/analytics';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const PrivateProfile = XMemo<PageProps & { organization: Organization_organization }>(
    (props) => {
        const { organization } = props;
        const theme = React.useContext(ThemeContext);
        const area = React.useContext(ASSafeAreaContext);
        const typeString = organization.isCommunity ? 'Community' : 'Organization';

        return (
            <View
                flexGrow={1}
                paddingTop={area.top}
                paddingBottom={area.bottom + 16}
                paddingHorizontal={32}
                alignItems="center"
                flexDirection="column"
            >
                <View flexGrow={1} justifyContent="center" alignItems="center">
                    <ZAvatar
                        size="xx-large"
                        photo={organization.photo}
                        id={organization.id}
                        title={organization.name}
                    />
                    <Text
                        style={{
                            color: theme.foregroundPrimary,
                            marginTop: 16,
                            textAlign: 'center',
                            ...TextStyles.Title2,
                        }}
                        allowFontScaling={false}
                    >
                        {organization.name}
                    </Text>
                    <Text
                        style={{
                            color: theme.foregroundTertiary,
                            marginTop: 4,
                            textAlign: 'center',
                            ...TextStyles.Subhead,
                        }}
                        allowFontScaling={false}
                    >
                        {typeString}
                    </Text>
                </View>
                <View flexShrink={1} flexDirection="row" alignItems="flex-end">
                    <Text
                        style={{
                            color: theme.foregroundTertiary,
                            textAlign: 'center',
                            ...TextStyles.Caption,
                        }}
                        allowFontScaling={false}
                    >
                        You must be invited to view this community. Its creator made it private
                    </Text>
                </View>
            </View>
        );
    },
);

const ProfileOrganizationComponent = XMemo<PageProps>((props) => {
    const client = getClient();
    const settings = client.useAccountSettings();
    const organization = client.useOrganization(
        { organizationId: props.router.params.id },
        { fetchPolicy: 'cache-and-network' },
    ).organization;

    if (!organization.isMine && organization.isPrivate) {
        return <PrivateProfile {...props} organization={organization} />;
    }

    const initialMembers = client.useOrganizationMembers(
        { organizationId: props.router.params.id, first: 10 },
        { fetchPolicy: 'network-only' },
    ).organization.members;
    const publicRooms = client.useOrganizationPublicRooms({
        organizationId: props.router.params.id,
        first: 3,
    }).organizationPublicRooms;
    const organizationRooms = publicRooms ? publicRooms.items : [];

    const myUserID = getMessenger().engine.user.id;
    const canMakePrimary =
        organization.isMine &&
        organization.id !==
            (settings.me &&
                settings.me.primaryOrganization &&
                settings.me.primaryOrganization.id) &&
        !organization.isCommunity;
    const canEdit = organization.isOwner || organization.isAdmin;
    const canLeave = organization.isMine;
    const showManageBtn = canMakePrimary || canEdit || canLeave;
    const typeString = organization.isCommunity ? 'community' : 'organization';

    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const handleAddMembers = React.useCallback(
        (addedMembers: OrganizationMembers_organization_members[]) => {
            setMembers((current) => [...current, ...addedMembers]);
        },
        [members],
    );

    const handleRemoveMember = React.useCallback(
        (memberId: string) => {
            setMembers((current) => current.filter((m) => m.user.id !== memberId));
        },
        [members],
    );

    const handleChangeMemberRole = React.useCallback(
        (memberId: string, newRole: OrganizationMemberRole) => {
            setMembers((current) =>
                current.map((m) => (m.user.id === memberId ? { ...m, role: newRole } : m)),
            );
        },
        [members],
    );

    // callbacks
    const handleAddMember = React.useCallback(() => {
        trackEvent('invite_view', {
            invite_type: organization.isCommunity ? 'community' : 'organization',
        });
        trackEvent(
            `navigate_new_${organization.isCommunity ? 'community' : 'organization'}_add_members`,
        );
        Modals.showUserMuptiplePicker(
            props.router,
            {
                title: 'Add',
                action: async (users) => {
                    startLoader();
                    try {
                        const addedMembers = (
                            await client.mutateOrganizationAddMember({
                                userIds: users.map((u) => u.id),
                                organizationId: organization.id,
                            })
                        ).alphaOrganizationMemberAdd;

                        handleAddMembers(addedMembers);
                    } catch (e) {
                        Alert.alert(formatError(e));
                    }
                    stopLoader();
                    props.router.back();
                },
            },
            'Add people',
            members.map((u) => u.user.id),
            [getMessenger().engine.user.id],
            { path: 'OrganizationInviteLinkModal', pathParams: { organization } },
        );
    }, [organization, members]);

    const handleCreatePress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action('New group', () =>
            props.router.push('CreateGroupAttrs', { organizationId: organization.id }),
        );
        builder.action('New channel', () =>
            props.router.push('CreateGroupAttrs', {
                organizationId: organization.id,
                isChannel: true,
            }),
        );

        builder.show();
    }, [organization.id]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (canEdit) {
            builder.action(
                'Edit info',
                () =>
                    props.router.push(
                        organization.isCommunity ? 'EditCommunity' : 'EditOrganization',
                        { id: props.router.params.id },
                    ),
                false,
                require('assets/ic-edit-24.png'),
            );
        }

        if (canMakePrimary) {
            builder.action(
                'Make primary',
                async () => {
                    startLoader();
                    try {
                        await client.mutateProfileUpdate({
                            input: {
                                primaryOrganization: organization.id,
                            },
                        });
                        await client.refetchAccountSettings();

                        props.router.back();
                    } finally {
                        stopLoader();
                    }
                },
                false,
                require('assets/ic-star-24.png'),
            );
        }

        if (canLeave) {
            builder.action(
                'Leave ' + typeString,
                () => {
                    Alert.builder()
                        .title(`Leave ${typeString}?`)
                        .message('You may not be able to join it again')
                        .button('Cancel', 'cancel')
                        .action('Leave', 'destructive', async () => {
                            await client.mutateOrganizationMemberRemove({
                                userId: myUserID,
                                organizationId: props.router.params.id,
                            });
                            await client.refetchMyOrganizations();
                            await client.refetchAccount();

                            props.router.back();
                        })
                        .show();
                },
                false,
                require('assets/ic-leave-24.png'),
            );
        }

        if (canEdit) {
            builder.action(
                `Delete ${typeString}`,
                () => {
                    Alert.builder()
                        .title(`Delete ${typeString}?`)
                        .message(`This cannot be undone`)
                        .button('Cancel', 'cancel')
                        .action('Delete', 'destructive', async () => {
                            await client.mutateDeleteOrganization({
                                organizationId: organization.id,
                            });
                            await client.refetchAccountSettings();

                            props.router.back();
                        })
                        .show();
                },
                false,
                require('assets/ic-delete-24.png'),
            );
        }

        builder.show();
    }, []);

    const handleMemberPress = React.useCallback(
        (user: OrganizationMembers_organization_members_user) => {
            props.router.push('ProfileUser', { id: user.id });
        },
        [],
    );

    const handleMemberLongPress = React.useCallback(
        (member: OrganizationMembers_organization_members) => {
            const { user } = member;

            let builder = new ActionSheetBuilder();

            if (user.id !== myUserID) {
                builder.action(
                    'Send message',
                    () => props.router.push('Conversation', { id: user.id }),
                    false,
                    require('assets/ic-message-24.png'),
                );
            }

            if (user.id !== myUserID && organization.isOwner) {
                builder.action(
                    member.role === 'MEMBER' ? 'Make admin' : 'Dismiss as admin',
                    () => {
                        Alert.builder()
                            .title(
                                member.role === 'MEMBER'
                                    ? `Make ${user.name} admin?`
                                    : `Dismiss ${user.name} as admin?`,
                            )
                            .message(
                                member.role === 'MEMBER'
                                    ? `Admins have full control over the ${typeString} account`
                                    : `They will only be able to participate in the ${typeString}'s chats`,
                            )
                            .button('Cancel', 'cancel')
                            .action(
                                member.role === 'MEMBER' ? 'Make' : 'Dismiss',
                                member.role === 'MEMBER' ? 'default' : 'destructive',
                                async () => {
                                    const newRole =
                                        member.role === 'MEMBER'
                                            ? OrganizationMemberRole.ADMIN
                                            : OrganizationMemberRole.MEMBER;

                                    await client.mutateOrganizationChangeMemberRole({
                                        memberId: user.id,
                                        organizationId: props.router.params.id,
                                        newRole,
                                    });

                                    await client.refetchOrganizationMembersShort({
                                        organizationId: props.router.params.id
                                    });

                                    handleChangeMemberRole(user.id, newRole);
                                },
                            )
                            .show();
                    },
                    false,
                    require('assets/ic-star-24.png'),
                );
            }

            if (user.id === myUserID) {
                builder.action(
                    `Leave ${typeString}`,
                    () => {
                        Alert.builder()
                            .title(`Leave ${typeString}?`)
                            .message('You may not be able to join it again')
                            .button('Cancel', 'cancel')
                            .action('Leave', 'destructive', async () => {
                                await client.mutateOrganizationMemberRemove({
                                    userId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                await client.refetchMyOrganizations();
                                await client.refetchAccount();
                                props.router.back();
                            })
                            .show();
                    },
                    false,
                    require('assets/ic-leave-24.png'),
                );
            }

            if (canEdit && user.id !== myUserID) {
                builder.action(
                    `Remove from ${typeString}`,
                    () => {
                        Alert.builder()
                            .title(`Remove ${user.name} from ${typeString}?`)
                            .message(`They will be removed from all internal chats`)
                            .button('Cancel', 'cancel')
                            .action('Remove', 'destructive', async () => {
                                await client.mutateOrganizationMemberRemove({
                                    userId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                await client.refetchOrganizationMembersShort({
                                    organizationId: props.router.params.id,
                                });
                                handleRemoveMember(user.id);
                            })
                            .show();
                    },
                    false,
                    require('assets/ic-leave-24.png'),
                );
            }

            builder.show(true);
        },
        [organization],
    );

    const handleLoadMore = React.useCallback(async () => {
        if (members.length < organization.membersCount && !loading) {
            setLoading(true);

            const loaded = (
                await client.queryOrganizationMembers(
                    {
                        organizationId: organization.id,
                        first: 10,
                        after: members[members.length - 1].user.id,
                    },
                    { fetchPolicy: 'network-only' },
                )
            ).organization.members;

            setMembers((current) => [
                ...current,
                ...loaded.filter((m) => !current.find((m2) => m2.user.id === m.user.id)),
            ]);
            setLoading(false);
        }
    }, [organization, members, loading]);

    const content = (
        <>
            <ZTrack
                event={
                    organization.isCommunity ? 'navigate_community_profile' : 'navigate_org_profile'
                }
            />
            <ZListHero
                photo={organization.photo}
                id={organization.id}
                title={organization.name}
                subtitle={organization.isCommunity ? 'Community' : 'Organization'}
            />

            <ZListGroup header="About" headerMarginTop={0}>
                {organization.about && (
                    <ZListItem multiline={true} text={organization.about} copy={true} />
                )}
                {organization.about && <View height={10} />}
                {organization.shortname && (
                    <ZListItem title="Shortname" text={'@' + organization.shortname} copy={true} />
                )}
                {organization.website && (
                    <ZListItem title="Website" text={organization.website} copy={true} />
                )}
                {organization.instagram && (
                    <ZListItem title="Instagram" text={organization.instagram} copy={true} />
                )}
                {organization.twitter && (
                    <ZListItem title="Twitter" text={organization.twitter} copy={true} />
                )}
                {organization.facebook && (
                    <ZListItem title="Facebook" text={organization.facebook} copy={true} />
                )}
                {organization.linkedin && (
                    <ZListItem title="LinkedIn" text={organization.linkedin} copy={true} />
                )}
            </ZListGroup>

            <ZListGroup
                header="Groups and channels"
                counter={organization.roomsCount}
                actionRight={
                    organization.roomsCount > 3
                        ? {
                              title: 'See all',
                              onPress: () =>
                                  props.router.push('ProfileOrganizationGroups', {
                                      organizationId: organization.id,
                                      title: organization.name,
                                  }),
                          }
                        : undefined
                }
            >
                {organization.isMine && (
                    <ZListItem
                        leftIcon={require('assets/ic-add-glyph-24.png')}
                        text="Create new"
                        onPress={handleCreatePress}
                    />
                )}
                {organizationRooms.map((v) => (
                    <GroupView
                        key={v!!.id}
                        item={v!}
                        photo={v.photo}
                        onPress={() => props.router.push('Conversation', { flexibleId: v!!.id })}
                    />
                ))}
            </ZListGroup>

            <ZListHeader text="Members" counter={organization.membersCount} />
            {organization.isMine && (
                <ZListItem
                    leftIcon={require('assets/ic-add-glyph-24.png')}
                    text="Add people"
                    onPress={handleAddMember}
                />
            )}
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : organization.name} />

            {showManageBtn && (
                <ZManageButton key={'manage-btn-' + showManageBtn} onPress={handleManageClick} />
            )}

            <SFlatList
                data={members}
                renderItem={({ item }) => (
                    <UserView
                        user={item.user}
                        memberRole={item.role}
                        onPress={() => handleMemberPress(item.user)}
                        onLongPress={() => handleMemberLongPress(item)}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.user.id}
                ListHeaderComponent={content}
                onEndReached={() => handleLoadMore()}
                refreshing={loading}
            />
        </>
    );
});

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

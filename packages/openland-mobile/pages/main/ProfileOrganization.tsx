import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getMessenger } from '../../utils/messenger';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { UserView } from './components/UserView';
import { Modals } from './modals/Modals';
import { formatError } from 'openland-y-forms/errorHandling';
import Alert from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { Platform, Linking, Share } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import {
    OrganizationMemberRole,
    OrganizationMembers_organization_members_user,
} from 'openland-api/spacex.types';
import { GroupView } from './components/GroupView';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { trackEvent } from 'openland-mobile/analytics';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { OrgMemberType } from './modals/MembersSearch';
import { SDeferred } from 'react-native-s/SDeferred';
import {
    EntityMembersManager,
    EntityMembersManagerRef,
    OrgMember,
} from 'openland-y-utils/members/EntityMembersManager';
import { ZHero } from 'openland-mobile/components/ZHero';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';
import { ProfileDeleted } from './components/ProfileDeleted';
import { ProfileOrganizationPrivate } from './components/ProfileOrganizationPrivate';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZShowMoreText } from 'openland-mobile/components/ZShowMoreText';
import { capitalize, useText } from 'openland-mobile/text/useText';

const ProfileOrganizationComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { t } = useText();
    const onlines = getMessenger().engine.getOnlines();
    const organization = client.useOrganization(
        { organizationId: props.router.params.id },
        { fetchPolicy: 'cache-and-network' },
    ).organization;

    if (!organization.isMine && organization.private) {
        return <ProfileOrganizationPrivate organization={organization} />;
    }

    const profilesRef = React.useRef<EntityMembersManagerRef>(null);

    const publicRooms = client.useOrganizationPublicRooms(
        {
            organizationId: props.router.params.id,
            first: 3,
        },
        { fetchPolicy: 'cache-and-network' },
    ).organizationPublicRooms;
    const organizationRooms = publicRooms ? publicRooms.items : [];

    const myUserID = getMessenger().engine.user.id;
    const canEdit = organization.isOwner || organization.isAdmin;
    const canLeave = organization.isMine;
    const showManageBtn = canEdit || canLeave;

    const [members, setMembers] = React.useState<OrgMember[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleAddMembers = React.useCallback(
        (addedMembers: OrgMember[]) => {
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
                title: t('add', 'Add'),
                action: async (users) => {
                    const loader = Toast.loader();
                    loader.show();
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
                    loader.hide();
                    props.router.back();
                },
            },
            organization.id,
            false,
            t('addPeople', 'Add people'),
            { path: 'OrganizationInviteLinkModal', pathParams: { organization } },
        );
    }, [organization, members]);

    const handleCreatePress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action(t('newGroup', 'New group'), () =>
            props.router.push('CreateGroupAttrs', { organizationId: organization.id }),
        );
        builder.action(t('newChannel', 'New channel'), () =>
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
                t('editInfo', 'Edit info'),
                () =>
                    props.router.push(
                        organization.isCommunity ? 'EditCommunity' : 'EditOrganization',
                        { id: props.router.params.id },
                    ),
                false,
                require('assets/ic-edit-24.png'),
            );
        }

        if (SUPER_ADMIN) {
            builder.action(
                t('superEdit', 'Super edit'),
                () => props.router.push('EditCommunitySuperAdmin', { id: props.router.params.id }),
                false,
                require('assets/ic-edit-24.png'),
            );
        }

        if (canLeave) {
            builder.action(
                organization.isCommunity
                    ? t('leaveCommunity', 'Leave community')
                    : t('leaveOrganization', 'Leave organization'),
                () => {
                    Alert.builder()
                        .title(organization.isCommunity
                            ? t('leaveCommunityQuestion', 'Leave community?')
                            : t('leaveOrganizationQuestion', 'Leave organization?'))
                        .message('You may not be able to join it again')
                        .button(t('cancel', 'Cancel'), 'cancel')
                        .action(t('leave', 'Leave'), 'destructive', async () => {
                            await client.mutateOrganizationMemberRemove({
                                userId: myUserID,
                                organizationId: props.router.params.id,
                            });
                            await client.refetchMyCommunities();

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
                organization.isCommunity
                    ? t('deleteCommunity', `Delete community`)
                    : t('deleteOrganization', `Delete organization`),
                () => {
                    Alert.builder()
                        .title(organization.isCommunity
                            ? t('deleteCommunityQuestion', 'Delete community?')
                            : t('deleteOrganizationQuestion', 'Delete organization?'))
                        .message(t('noUndoneOperation', 'This cannot be undone'))
                        .button(t('cancel', 'Cancel'), 'cancel')
                        .action(t('delete', 'Delete'), 'destructive', async () => {
                            await client.mutateDeleteOrganization({
                                organizationId: organization.id,
                            });
                            await client.refetchMyCommunities();

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
        (
            member: OrgMember,
            callbacks?: {
                onRoleChange: (memberId: string, role: OrganizationMemberRole) => void;
                onKick: (memberId: string) => void;
            },
        ) => {
            const { isOwner, isAdmin } = organization;
            const { user, role } = member;

            const adminPermissions = (isOwner || isAdmin) && role !== OrganizationMemberRole.OWNER;

            let builder = new ActionSheetBuilder();

            if (user.id !== myUserID) {
                builder.action(
                    t('sendMessage', 'Send message'),
                    () => props.router.push('Conversation', { id: user.id }),
                    false,
                    require('assets/ic-message-24.png'),
                );
            }

            if (user.id !== myUserID && adminPermissions) {
                builder.action(
                    member.role === 'MEMBER' ? t('makeAdmin', 'Make admin') : t('dismissAdmin', 'Dismiss as admin'),
                    () => {
                        Alert.builder()
                            .title(
                                member.role === 'MEMBER' ? t('makeAdminQuestion', {
                                    name: user.name,
                                    defaultValue: `Make {{name}} admin?`
                                }) : t('dismissAdminQuestion', {
                                    name: user.name,
                                    defaultValue: `Dismiss {{name}} as admin?`
                                }))
                            .message(
                                member.role === 'MEMBER'
                                    ? `Admins have full control over the account`
                                    : `They will only be able to participate in the chats`,
                            )
                            .button(t('cancel', 'Cancel'), 'cancel')
                            .action(
                                member.role === 'MEMBER' ? t('make', 'Make') : t('dismiss', 'Dismiss'),
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
                                    handleChangeMemberRole(user.id, newRole);
                                    if (callbacks?.onRoleChange) {
                                        callbacks.onRoleChange(user.id, newRole);
                                    }
                                },
                            )
                            .show();
                    },
                    false,
                    require('assets/ic-pro-24.png'),
                );
            }

            if (user.id === myUserID) {
                builder.action(
                    organization.isCommunity
                        ? t('leaveCommunity', 'Leave community')
                        : t('leaveOrganization', 'Leave organization'),
                    () => {
                        Alert.builder()
                            .title(
                                organization.isCommunity
                                    ? t('leaveCommunityQuestion', 'Leave community?')
                                    : t('leaveOrganizationQuestion', 'Leave organization?'))
                            .message(t('leaveWarning', 'You may not be able to join it again'))
                            .button(t('cancel', 'Cancel'), 'cancel')
                            .action(t('leave', 'Leave'), 'destructive', async () => {
                                await client.mutateOrganizationMemberRemove({
                                    userId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                await client.refetchMyCommunities();
                                props.router.back();
                            })
                            .show();
                    },
                    false,
                    require('assets/ic-leave-24.png'),
                );
            }

            if (user.id !== myUserID && adminPermissions) {
                builder.action(
                    organization.isCommunity
                        ? t('kickCommunity', `Remove from community`)
                        : t('kickOrganization', `Remove from organization`),
                    () => {
                        Alert.builder()
                            .title(
                                organization.isCommunity
                                    ? t('kickCommunityQuestion', { name: user.name, defaultValue: `Remove {{name}} from community?` })
                                    : t('kickOrganizationQuestion', { name: user.name, defaultValue: `Remove {{name}} from organization?` })
                            )
                            .message(t('kickWarning', `They will be removed from all internal chats`))
                            .button(t('cancel', 'Cancel'), 'cancel')
                            .action(t('remove', 'Remove'), 'destructive', async () => {
                                await client.mutateOrganizationMemberRemove({
                                    userId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                handleRemoveMember(user.id);
                                if (callbacks?.onKick) {
                                    callbacks.onKick(user.id);
                                }
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
        if (profilesRef.current) {
            await profilesRef.current.handleLoadMore();
        }
    }, [members, loading]);

    const handleSharePress = React.useCallback(() => {
        let link = `https://openland.com/${organization.shortname || organization.id}`;
        Share.share(
            Platform.select({
                ios: { url: link },
                android: { message: link },
                default: { message: link }
            })
        );
    }, [organization.shortname, organization.id]);

    const shouldShowAddButton =
        organization.isMine && (organization.isAdmin || organization.membersCanInvite);

    const handleLinkPress = React.useCallback(async (link: string) => {
        if (await Linking.canOpenURL(link)) {
            await Linking.openURL(link);
        }
    }, []);

    const website = React.useMemo(() => findSocialShortname.site(organization.website), [
        organization.website,
    ]);
    const instagram = React.useMemo(() => findSocialShortname.instagram(organization.instagram), [
        organization.instagram,
    ]);
    const twitter = React.useMemo(() => findSocialShortname.twitter(organization.twitter), [
        organization.twitter,
    ]);
    const facebook = React.useMemo(() => findSocialShortname.facebook(organization.facebook), [
        organization.facebook,
    ]);
    const linkedin = React.useMemo(() => findSocialShortname.linkedin(organization.linkedin), [
        organization.linkedin,
    ]);

    if (organization.isDeleted) {
        return (
            <ProfileDeleted
                photo={organization.photo}
                id={organization.id}
                title={organization.name}
            />
        );
    }

    const content = (
        <>
            <ZTrack
                event={
                    organization.isCommunity ? 'navigate_community_profile' : 'navigate_org_profile'
                }
            />

            <ZHero
                photo={organization.photo}
                id={organization.id}
                title={organization.name}
                titleIconRight={organization.featured && theme.displayFeaturedIcon ? require('assets/ic-verified-16.png') : undefined}
                titleIconRightColor={'#3DA7F2' /* special: verified/featured color */}
                subtitle={
                    organization.isCommunity ? t('communityWithMember', {
                        count: organization.membersCount,
                        defaultValue: 'Community   ·  {{count}} t(member)',
                    }) : t('organizationWithMember', {
                        count: organization.membersCount,
                        defaultValue: 'Organization   ·  {{count}} t(member)',
                    })
                }
            />

            <ZListGroup header={t('about', 'About')} useSpacer={true}>
                {!!organization.about && <ZShowMoreText text={organization.about} />}
                {!!organization.shortname && (
                    <ZListItem
                        text={organization.shortname}
                        leftIcon={require('assets/ic-at-24.png')}
                        small={true}
                        onPress={handleSharePress}
                        onLongPress={handleSharePress}
                    />
                )}
                {!!website && (
                    <ZListItem
                        text={website.name}
                        textToCopy={website.url}
                        leftIcon={require('assets/ic-link-24.png')}
                        small={true}
                        copy={true}
                        onPress={() => handleLinkPress(website.url)}
                    />
                )}
                {!!instagram && (
                    <ZListItem
                        text={instagram.name}
                        textToCopy={instagram.url}
                        leftIcon={require('assets/ic-instagram-24.png')}
                        small={true}
                        copy={true}
                        onPress={() => handleLinkPress(instagram.url)}
                    />
                )}
                {!!twitter && (
                    <ZListItem
                        text={twitter.name}
                        textToCopy={twitter.url}
                        leftIcon={require('assets/ic-twitter-24.png')}
                        small={true}
                        copy={true}
                        onPress={() => handleLinkPress(twitter.url)}
                    />
                )}
                {!!facebook && (
                    <ZListItem
                        text={facebook.name}
                        textToCopy={facebook.url}
                        leftIcon={require('assets/ic-facebook-24.png')}
                        small={true}
                        copy={true}
                        onPress={() => handleLinkPress(facebook.url)}
                    />
                )}
                {!!linkedin && (
                    <ZListItem
                        text={linkedin.name}
                        textToCopy={linkedin.url}
                        leftIcon={require('assets/ic-linkedin-24.png')}
                        small={true}
                        copy={true}
                        onPress={() => handleLinkPress(linkedin.url)}
                    />
                )}
            </ZListGroup>

            <ZListGroup
                header={t('groups', 'Groups')}
                counter={organization.roomsCount}
                useSpacer={true}
                actionRight={
                    organization.roomsCount > 3
                        ? {
                            title: t('seeAll', 'See all'),
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
                        text={t('createNew', 'Create new')}
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

            <ZListHeader text={capitalize(t('member_plural', 'Members'))} counter={organization.membersCount} useSpacer={true} />
            {shouldShowAddButton && (
                <ZListItem
                    leftIcon={require('assets/ic-add-glyph-24.png')}
                    text={t('addPeople', 'Add people')}
                    onPress={handleAddMember}
                />
            )}
            <ZListItem
                text={t('searchMembers', 'Search members')}
                leftIcon={require('assets/ic-search-glyph-24.png')}
                onPress={() =>
                    Modals.showOrgMembersSearch({
                        router: props.router,
                        orgId: organization.id,
                        membersCount: organization.membersCount,
                        initialMembers: members,
                        onPress: (member: OrgMemberType) =>
                            props.router.push('ProfileUser', { id: member.user.id }),
                        onLongPress: handleMemberLongPress,
                    })
                }
            />
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? t('info', 'Info') : organization.name} />

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
            <React.Suspense fallback={null}>
                <SDeferred>
                    <EntityMembersManager
                        isGroup={false}
                        loading={loading}
                        members={members}
                        membersCount={organization.membersCount}
                        entityId={organization.id}
                        setLoading={setLoading}
                        setMembers={setMembers}
                        ref={profilesRef}
                        onlineWatcher={onlines}
                    />
                </SDeferred>
            </React.Suspense>
        </>
    );
});

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

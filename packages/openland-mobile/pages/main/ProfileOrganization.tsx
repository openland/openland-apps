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
import { View, Platform, Text, Dimensions } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { OrganizationMemberRole, OrganizationWithoutMembers_organization, OrganizationMembers_organization_members, OrganizationMembers_organization_members_user } from 'openland-api/Types';
import { GroupView } from './components/GroupView';
import { SFlatList } from 'react-native-s/SFlatList';
import { XMemo } from 'openland-y-utils/XMemo';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';

const PrivateProfile = XMemo<PageProps & { organization: OrganizationWithoutMembers_organization }>((props) => {
    const { router, organization } = props;
    const theme = React.useContext(ThemeContext);
    const typeString = organization.isCommunity ? 'community' : 'organization';
    const screenHeight = Dimensions.get('screen').height;

    return (
        <>
            <SHeader title={'Cannot view ' + typeString} />
            <ASSafeAreaView flexGrow={1}>
                <View flexGrow={1}>
                    <View paddingHorizontal={16} paddingVertical={15} backgroundColor={theme.backgroundTertiary}>
                        <Text style={{ color: theme.foregroundPrimary, textAlign: 'center', fontSize: 15, fontWeight: FontStyles.Weight.Medium, marginBottom: 5 }}>You must be invited to view this {typeString}</Text>
                        <Text style={{ color: theme.foregroundPrimary, textAlign: 'center', fontSize: 13, opacity: 0.6 }}>Creator of this {typeString} made it private</Text>
                    </View>
                    <View paddingTop={screenHeight <= 640 ? 60 : 100} paddingHorizontal={16} alignItems="center" flexDirection="column">
                        <ZAvatar size="x-large" src={organization.photo} placeholderKey={organization.id} placeholderTitle={organization.name} />
                        <Text style={{ color: theme.foregroundPrimary, fontSize: 20, lineHeight: 28, marginTop: 20, textAlign: 'center', fontWeight: FontStyles.Weight.Medium }}>{organization.name}</Text>

                        {!!organization.about && (
                            <Text style={{ color: theme.foregroundPrimary, fontSize: 15, lineHeight: 22, marginTop: 8, textAlign: 'center' }}>{organization.about}</Text>
                        )}
                    </View>
                    <View position="absolute" left={0} right={0} bottom={46} alignItems="center">
                        <View width={126}>
                            <ZRoundedButton
                                size="large"
                                style="secondary"
                                title="Go back"
                                onPress={() => router.back()}
                            />
                        </View>
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    );
});

const ProfileOrganizationComponent = XMemo<PageProps>((props) => {
    const client = getClient();
    const settings = client.useAccountSettings();
    const organization = client.useOrganizationWithoutMembers({ organizationId: props.router.params.id }, { fetchPolicy: 'cache-and-network' }).organization;

    if (!organization.isMine && organization.isPrivate) {
        return <PrivateProfile {...props} organization={organization} />;
    }

    const initialMembers = client.useOrganizationMembers({ organizationId: props.router.params.id, first: 10 }, { fetchPolicy: 'cache-and-network' }).organization.members;

    const myUserID = getMessenger().engine.user.id;
    const canMakePrimary = organization.isMine && organization.id !== (settings.me && settings.me.primaryOrganization && settings.me.primaryOrganization.id) && !organization.isCommunity;
    const canEdit = organization.isOwner || organization.isAdmin;
    const canLeave = organization.isMine;
    const showManageBtn = canMakePrimary || canEdit || canLeave;
    const typeString = organization.isCommunity ? 'community' : 'organization';

    const [members, setMembers] = React.useState(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const handleAddMembers = React.useCallback((addedMembers: OrganizationMembers_organization_members[]) => {
        setMembers(current => [...current, ...addedMembers]);
    }, [members]);

    const handleRemoveMember = React.useCallback((memberId: string) => {
        setMembers(current => current.filter(m => m.user.id !== memberId));
    }, [members]);

    const handleChangeMemberRole = React.useCallback((memberId: string, newRole: OrganizationMemberRole) => {
        setMembers(current => current.map(m => m.user.id === memberId ? { ...m, role: newRole } : m));
    }, [members]);

    // callbacks
    const handleAddMember = React.useCallback(() => {
        Modals.showUserMuptiplePicker(props.router, {
            title: 'Add',
            action: async (users) => {
                startLoader();
                try {
                    const addedMembers = (await client.mutateOrganizationAddMember({
                        userIds: users.map(u => u.id),
                        organizationId: organization.id
                    })).alphaOrganizationMemberAdd;

                    handleAddMembers(addedMembers);
                } catch (e) {
                    Alert.alert(formatError(e));
                }
                stopLoader();
                props.router.back();
            }
        },
            'Add members',
            members.map(u => u.user.id),
            [getMessenger().engine.user.id],
            { path: 'OrganizationInviteLinkModal', pathParams: { organization } });
    }, [organization, members]);

    const handleCreatePress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action('New group', () => props.router.push('CreateGroupAttrs', { organizationId: organization.id }));
        builder.action('New channel', () => props.router.push('CreateGroupAttrs', { organizationId: organization.id, isChannel: true }));

        builder.show();
    }, [organization.id]);

    const handleManageClick = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        if (canEdit) {
            builder.action('Edit info', () => props.router.push(organization.isCommunity ? 'EditCommunity' : 'EditOrganization', { id: props.router.params.id }), false, require('assets/ic-edit-24.png'));
        }

        if (canMakePrimary) {
            builder.action('Make primary', async () => {
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
            }, false, require('assets/ic-star-24.png'));
        }

        if (canLeave) {
            builder.action('Leave ' + typeString,
                () => {
                    Alert.builder()
                        .title(`Leave ${typeString}?`)
                        .message('You may not be able to join it again')
                        .button('Cancel', 'cancel')
                        .action('Leave', 'destructive', async () => {
                            await client.mutateOrganizationRemoveMember({
                                memberId: myUserID,
                                organizationId: props.router.params.id,
                            });
                            await client.refetchOrganization({ organizationId: props.router.params.id });
                            await client.refetchAccountSettings();

                            props.router.back();
                        })
                        .show();
                }, false, require('assets/ic-leave-24.png')
            );
        }

        if (canEdit) {
            builder.action('Delete', () => {
                Alert.builder()
                    .title(`Delete ${typeString}?`)
                    .message(`This cannot be undone.`)
                    .button('Cancel', 'cancel')
                    .action('Delete', 'destructive', async () => {
                        await client.mutateDeleteOrganization({ organizationId: organization.id });
                        await client.refetchAccountSettings();

                        props.router.back();
                    }).show();
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show();
    }, []);

    const handleMemberPress = React.useCallback((user: OrganizationMembers_organization_members_user) => {
        props.router.push('ProfileUser', { id: user.id });
    }, []);

    const handleMemberLongPress = React.useCallback((member: OrganizationMembers_organization_members) => {
        const { user } = member;

        if (user.id === myUserID || canEdit) {
            let builder = new ActionSheetBuilder();

            if (user.id !== myUserID) {
                builder.action('Send message', () => props.router.push('Conversation', { id: user.id }), false, require('assets/ic-message-24.png'));
            }

            if (user.id !== myUserID && organization.isOwner) {
                builder.action(member.role === 'MEMBER' ? 'Make admin' : 'Dismiss as admin',
                    () => {
                        Alert.builder()
                            .title(member.role === 'MEMBER' ? `Make ${user.name} admin?` : `Dismiss ${user.name} as admin?`)
                            .message(member.role === 'MEMBER' ? `Admins have full control over the ${typeString} account` : `They will only be able to participate in the ${typeString}'s chats`)
                            .button('Cancel', 'cancel')
                            .action(
                                member.role === 'MEMBER' ? 'Make' : 'Dismiss',
                                member.role === 'MEMBER' ? 'default' : 'destructive',
                                async () => {
                                    const newRole = member.role === 'MEMBER' ? OrganizationMemberRole.ADMIN : OrganizationMemberRole.MEMBER;

                                    await client.mutateOrganizationChangeMemberRole({
                                        memberId: user.id,
                                        organizationId: props.router.params.id,
                                        newRole
                                    });

                                    await client.refetchOrganization({ organizationId: props.router.params.id });

                                    handleChangeMemberRole(user.id, newRole);
                                }).show();
                    }, false, require('assets/ic-star-24.png')
                );
            }

            if (user.id === myUserID) {
                builder.action(`Leave ${typeString}`,
                    () => {
                        Alert.builder()
                            .title(`Leave ${typeString}?`)
                            .message('You may not be able to join it again')
                            .button('Cancel', 'cancel')
                            .action('Leave', 'destructive', async () => {
                                await client.mutateOrganizationRemoveMember({
                                    memberId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                await client.refetchOrganization({ organizationId: props.router.params.id });
                                await client.refetchAccountSettings();

                                props.router.back();
                            })
                            .show();
                    }, false, require('assets/ic-leave-24.png')
                );
            }

            if (canEdit && user.id !== myUserID) {
                builder.action(`Remove from ${typeString}`,
                    () => {
                        Alert.builder()
                            .title(`Remove ${user.name} from ${typeString}?`)
                            .message(`They will be removed from all internal chats`)
                            .button('Cancel', 'cancel')
                            .action('Remove', 'destructive', async () => {
                                await client.mutateOrganizationRemoveMember({
                                    memberId: user.id,
                                    organizationId: props.router.params.id,
                                });
                                await client.refetchOrganization({ organizationId: props.router.params.id });

                                handleRemoveMember(user.id);
                            })
                            .show();
                    }, false, require('assets/ic-leave-24.png')
                );
            }

            builder.show(true);
        }
    }, [organization]);

    const handleLoadMore = React.useCallback(async () => {
        if (members.length < organization.membersCount && !loading) {
            setLoading(true);

            const loaded = (await client.queryOrganizationMembers({
                organizationId: organization.id,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' })).organization.members;

            setMembers(current => [...current, ...loaded.filter(m => !current.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
        }
    }, [organization, members, loading]);

    const content = (
        <>
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
                {organization.about && (
                    <View height={10} />
                )}
                {organization.shortname && (
                    <ZListItem title="Shortname" text={'@' + organization.shortname} copy={true} />
                )}
                {organization.website && (
                    <ZListItem title="Website" text={organization.website} copy={true} />
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
                {organization.instagram && (
                    <ZListItem title="Instagram" text={organization.instagram} copy={true} />
                )}
            </ZListGroup>

            <ZListGroup
                header="Groups and channels"
                counter={organization.rooms.length}
                actionRight={organization.rooms.length > 3 ? { title: 'See all', onPress: () => props.router.push('ProfileOrganizationGroups', { organizationId: organization.id, title: organization.name }) } : undefined}
            >
                {organization.isMine && (
                    <ZListItem
                        leftIcon={require('assets/ic-add-24.png')}
                        text="Create new"
                        onPress={handleCreatePress}
                    />
                )}
                {organization.rooms
                    .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0))
                    .filter((c, i) => i <= 2)
                    .map(v => (
                        <GroupView
                            key={v!!.id}
                            item={v!}
                            onPress={() => props.router.push('Conversation', { flexibleId: v!!.id })}
                            photo={v!.photo}
                        />
                    ))
                }
            </ZListGroup>

            <ZListHeader text="Members" counter={organization.membersCount} />
            {organization.isMine && (
                <ZListItem
                    leftIcon={require('assets/ic-add-24.png')}
                    text="Add members"
                    onPress={handleAddMember}
                />
            )}
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : organization.name} />

            {showManageBtn && <ZManageButton key={'manage-btn-' + showManageBtn} onPress={handleManageClick} />}

            <SFlatList
                data={members}
                renderItem={({ item }) => (
                    <UserView
                        user={item.user}
                        role={item.role}
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

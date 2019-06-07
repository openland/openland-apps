import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { UserView } from './components/UserView';
import { Modals } from './modals/Modals';
import { formatError } from 'openland-y-forms/errorHandling';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { View, Platform, Text, Dimensions } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Organization_organization_members, Organization_organization_members_user, OrganizationMembersShortPaginated_organization } from 'openland-api/Types';
import { GroupView } from './components/GroupView';
import { SFlatList } from 'react-native-s/SFlatList';
import { XMemo } from 'openland-y-utils/XMemo';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

const PrivateProfile = XMemo<PageProps & { organization: OrganizationMembersShortPaginated_organization }>((props) => {
    const { router, organization } = props;
    const theme = React.useContext(ThemeContext);
    const typeString = organization.isCommunity ? 'community' : 'organization';
    const screenHeight = Dimensions.get('screen').height;

    return (
        <>
            <SHeader title={'Cannot view ' + typeString} />
            <ASSafeAreaView flexGrow={1}>
                <View flexGrow={1}>
                    <View paddingHorizontal={16} paddingVertical={15} backgroundColor={theme.subHeaderColor}>
                        <Text style={{ color: theme.textColor, textAlign: 'center', fontSize: 15, fontWeight: TextStyles.weight.medium, marginBottom: 5 }}>You must be invited to view this {typeString}</Text>
                        <Text style={{ color: theme.textColor, textAlign: 'center', fontSize: 13, opacity: 0.6 }}>Creator of this {typeString} made it private</Text>
                    </View>
                    <View paddingTop={screenHeight <= 640 ? 60 : 100} paddingHorizontal={16} alignItems="center" flexDirection="column">
                        <ZAvatar size={86} src={organization.photo} placeholderKey={organization.id} placeholderTitle={organization.name} />
                        <Text style={{ color: theme.textColor, fontSize: 20, lineHeight: 28, marginTop: 20, textAlign: 'center', fontWeight: TextStyles.weight.medium }}>{organization.name}</Text>

                        {!!organization.about && (
                            <Text style={{ color: theme.textLabelColor, fontSize: 15, lineHeight: 22, marginTop: 8, textAlign: 'center' }}>{organization.about}</Text>
                        )}
                    </View>
                    <View position="absolute" left={0} right={0} bottom={46} alignItems="center">
                        <View width={126}>
                            <ZRoundedButton
                                size="large"
                                style="secondary"
                                uppercase={false}
                                title="Go back"
                                onPress={() => router.back()}
                            />
                        </View>
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    )
});

const ProfileOrganizationComponent = XMemo<PageProps>((props) => {
    const settings = getClient().useAccountSettings();
    const organization = getClient().useOrganizationMembersShortPaginated({ organizationId: props.router.params.id, first: 10 }, { fetchPolicy: 'cache-and-network' }).organization;

    if (!organization.isMine && organization.isPrivate) {
        return <PrivateProfile {...props} organization={organization} />
    }

    const canMakePrimary = organization.isMine && organization.id !== (settings.me && settings.me.primaryOrganization && settings.me.primaryOrganization.id);

    const [ members, setMembers ] = React.useState(organization.members);
    const [ loading, setLoading ] = React.useState(false);

    // callbacks

        const handleAddMember = React.useCallback(() => {
            Modals.showUserMuptiplePicker(props.router, {
                title: 'Add',
                action: async (users) => {
                    startLoader();
                    try {
                        await getMessenger().engine.client.mutateOrganizationAddMember({ userIds: users.map(u => u.id), organizationId: organization.id })
                    } catch (e) {
                        Alert.alert(formatError(e));
                    }
                    stopLoader();
                    props.router.back();
                }
            },
                'Add members',
                organization.members.map(u => u.user.id),
                { path: 'OrganizationInviteLinkModal', pathParams: { id: organization.id } });
        }, [organization.id]);

        const handleCreatePress = React.useCallback(() => {
            let builder = new ActionSheetBuilder();

            builder.action('Create group', () => props.router.push('CreateGroupAttrs', { organizationId: organization.id }));
            builder.action('Create channel', () => props.router.push('CreateGroupAttrs', { organizationId: organization.id, isChannel: true }));

            builder.show();
        }, [organization.id]);

        const handleManageClick = React.useCallback(() => {
            let builder = new ActionSheetBuilder();

            if (organization.isOwner || organization.isAdmin) {
                if (organization.isCommunity) {
                    builder.action('Edit', () => props.router.push('EditCommunity', { id: props.router.params.id }));
                } else {
                    builder.action('Edit', () => props.router.push('EditOrganization', { id: props.router.params.id }));
                }
            }

            if (canMakePrimary) {
                builder.action('Make primary', async () => {
                    startLoader();
                    try {
                        await getClient().mutateProfileUpdate({
                            input: {
                                alphaPrimaryOrganizationId: organization.id,
                            },
                        });
                        await getClient().refetchAccountSettings();

                        props.router.back();
                    } finally {
                        stopLoader();
                    }
                });
            }

            if (organization.isOwner || organization.isAdmin) {
                builder.action('Delete organization', () => {
                    Alert.builder()
                        .title(`Delete ${organization.name}`)
                        .message(`Are you sure you want to delete ${organization.name}? This cannot be undone.`)
                        .button('Cancel', 'cancel')
                        .action('Delete', 'destructive', async () => {
                            await getClient().mutateDeleteOrganization({ organizationId: organization.id });
                            await getClient().refetchAccountSettings();

                            props.router.back();
                        }).show();
                }, true);
            }

            builder.show();
        }, []);

        const handleMemberPress = React.useCallback((user: Organization_organization_members_user) => {
            props.router.push('ProfileUser', { id: user.id });
        }, []);

        const handleMemberLongPress = React.useCallback(async (member: Organization_organization_members) => {
            const { user } = member;

            if (user.id === getMessenger().engine.user.id || (organization.isOwner || organization.isAdmin)) {
                let builder = new ActionSheetBuilder();

                if (user.id !== getMessenger().engine.user.id && organization.isOwner) {
                    builder.action(member.role === 'MEMBER' ? 'Make Admin' : 'Remove as Admin',
                        () => {
                            Alert.builder()
                                .title(`Change role for ${user.name} to ${member.role === 'MEMBER' ? 'Admin? Admins have full control over the organization account.' : 'Member? Members can participate in the organization\'s chats.'}`)
                                .button('Cancel', 'cancel')
                                .action('Change role', 'default', async () => {
                                    await getClient().mutateOrganizationChangeMemberRole({
                                        memberId: user.id,
                                        organizationId: props.router.params.id,
                                        newRole: (member.role === 'MEMBER' ? 'OWNER' : 'MEMBER') as any,
                                    });
                                    await getClient().refetchOrganization({ organizationId: props.router.params.id });
                                }).show();
                        },
                    );
                }

                if (user.id === getMessenger().engine.user.id) {
                    builder.action('Leave organization',
                        () => {
                            Alert.builder()
                                .title('Are you sure want to leave?')
                                .button('Cancel', 'cancel')
                                .action('Leave', 'destructive', async () => {
                                    await getClient().mutateOrganizationRemoveMember({
                                        memberId: user.id,
                                        organizationId: props.router.params.id,
                                    });
                                    await getClient().refetchOrganization({ organizationId: props.router.params.id });
                                    await getClient().refetchAccountSettings();
                                })
                                .show();
                        },
                        true,
                    );
                }

                if ((organization.isOwner || organization.isAdmin) && user.id !== getMessenger().engine.user.id) {
                    builder.action('Remove from organization',
                        () => {
                            Alert.builder()
                                .title(`Are you sure want to remove ${user.name}? They will be removed from all internal chats at ${organization.name}.`)
                                .button('Cancel', 'cancel')
                                .action('Remove', 'destructive', async () => {
                                    await getClient().mutateOrganizationRemoveMember({
                                        memberId: user.id,
                                        organizationId: props.router.params.id,
                                    });
                                    await getClient().refetchOrganization({ organizationId: props.router.params.id });
                                })
                                .show();
                        },
                        true,
                    );
                }

                builder.show();
            }

        }, [ organization ]);

        const handleLoadMore = React.useCallback(async () => {
            if (members.length < organization.membersCount && !loading) {
                setLoading(true);

                const loaded = await getClient().queryOrganizationMembersShortPaginated({
                    organizationId: organization.id,
                    first: 10,
                    after: members[members.length - 1].user.id,
                });

                setMembers([...members, ...loaded.organization.members]);
                setLoading(false);
            }
        }, [ organization, members, loading ]);

    const manageIcon = Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png');

    const content = (
        <>
            <ZListItemHeader
                photo={organization.photo}
                id={organization.id}
                title={organization.name}
                titleLines={2}
                subtitle={organization.isCommunity ? 'Community' : 'Organization'}
            />

            <ZListItemGroup header="About" divider={false}>
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
                    <ZListItem title="Linkedin" text={organization.linkedin} copy={true} />
                )}
            </ZListItemGroup>
            
            <ZListItemGroup
                header="Groups and Channels"
                divider={false}
                counter={organization.rooms.length}
                actionRight={organization.rooms.length > 3 ? { title: 'See All', onPress: () => props.router.push('ProfileOrganizationGroups', { organizationId: organization.id, title: organization.name }) } : undefined}
            >
                {organization.isMine && (
                    <ZListItem
                        leftIcon={require('assets/ic-add-24.png')}
                        text="Create new"
                        onPress={handleCreatePress}
                        navigationIcon={false}
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
                        />
                    ))
                }
            </ZListItemGroup>

            <ZListItemGroup
                header="Members"
                divider={false}
                counter={organization.membersCount}
            >
                {organization.isMine && (
                    <ZListItem
                        leftIcon={require('assets/ic-add-24.png')}
                        text="Add members"
                        onPress={handleAddMember}
                    />
                )}
            </ZListItemGroup>
        </>
    );

    return (
        <>
            <SHeader title={organization.name} />

            {(organization.isOwner || organization.isAdmin || canMakePrimary) && <SHeaderButton title="Manage" icon={manageIcon} onPress={handleManageClick} />}

            <SFlatList
                data={members}
                renderItem={({ item }) => (
                    <UserView
                        user={item.user}
                        isAdmin={item.role === 'OWNER' ? 'owner' : item.role === 'ADMIN' ? 'admin' : undefined}
                        onPress={() => handleMemberPress(item.user)}
                        onLongPress={() => handleMemberLongPress(item)}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.user.id}
                ListHeaderComponent={content}
                onEndReached={handleLoadMore}
                refreshing={loading}
            />
        </>
    );
});

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

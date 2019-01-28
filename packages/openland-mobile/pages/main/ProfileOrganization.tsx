import * as React from 'react';
import { withApp } from '../../components/withApp';
import { RoomQuery } from 'openland-api';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { ChannelViewAsync, ArrowWrapper } from './ProfileOrganizationGroups';
import { UserView } from './components/UserView';
import { Modals } from './modals/Modals';
import { formatError } from 'openland-y-forms/errorHandling';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';

const ProfileOrganizationContent = React.memo<PageProps>((props) => {
    let settings = getClient().useAccountSettings();
    let organization = getClient().useOrganization({ organizationId: props.router.params.id }).organization;
    let handleAddMember = React.useCallback(() => {
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

    return (
        <>
            {organization.isOwner && <SHeaderButton title="Edit" onPress={() => props.router.push('EditOrganization', { id: props.router.params.id })} />}

            <ZListItemHeader
                photo={organization.photo}
                id={organization.id}
                title={organization.name}
                subtitle={organization.isCommunity ? 'Community' : 'Organization'}
            />

            <ZListItemGroup header="Manage" divider={false}>
                {organization.isMine && organization.id !== (settings.me && settings.me.primaryOrganization && settings.me.primaryOrganization.id) && (
                    <ZListItem
                        text="Make primary"
                        appearance="action"
                        onPress={async () => {
                            startLoader();
                            try {
                                await getClient().mutateProfileUpdate({
                                    input: {
                                        alphaPrimaryOrganizationId: organization.id,
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

            {
                organization.rooms.length > 0 && (
                    <ZListItemGroup
                        header="Rooms"
                        divider={false}
                    >
                        {organization.rooms
                            .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0))
                            .filter((c, i) => i <= 2)
                            .map(v => (
                                <ArrowWrapper>
                                    <ChannelViewAsync
                                        key={v!!.id}
                                        item={v!}
                                        onPress={() =>
                                            props.router.push(
                                                'Conversation',
                                                {
                                                    flexibleId: v!!.id,
                                                },
                                            )
                                        }
                                    />
                                </ArrowWrapper>
                            ))}
                        {organization.rooms.length > 3 && (
                            <ZListItem
                                leftIcon={require('assets/ic-more-24.png')}
                                text="More rooms"
                                path="ProfileOrganizationGroups"
                                pathParams={{
                                    organizationId: organization.id,
                                    title: organization.name + ' rooms',
                                }}
                                navigationIcon={false}
                            />)}
                    </ZListItemGroup>
                )
            }

            <ZListItemGroup header="Members" divider={false} >
                {organization.isMine && (
                    <ZListItem
                        leftIcon={require('assets/ic-add-24.png')}
                        text="Add Members"
                        onPress={handleAddMember}
                    />
                )}

                {organization.members.map((v) => (
                    <UserView
                        user={v.user}
                        isAdmin={v.role === 'ADMIN' || v.role === 'OWNER'}

                        onPress={() => props.router.push('ProfileUser', { id: v.user.id, })}
                        onLongPress={v.user.id === getMessenger().engine.user.id || (organization.isOwner || organization.isAdmin) ?
                            async () => {

                                let builder = new ActionSheetBuilder();

                                if (v.user.id !== getMessenger().engine.user.id && organization.isOwner) {
                                    builder.action(v.role === 'MEMBER' ? 'Make admin' : 'Revoke admin status',
                                        () => {
                                            Alert.builder()
                                                .title(`Are you sure you want to make ${v.user.name} ${v.role === 'MEMBER' ? 'admin' : 'member'}?`)
                                                .button('Cancel', 'cancel')
                                                .action(v.role === 'MEMBER' ? 'Make admin' : 'Revoke', 'default', async () => {
                                                    await getClient().mutateOrganizationChangeMemberRole({
                                                        memberId: v.user.id,
                                                        organizationId: props.router.params.id,
                                                        newRole: (v.role === 'MEMBER' ? 'OWNER' : 'MEMBER') as any,
                                                    });
                                                    await getClient().refetchOrganization({ organizationId: props.router.params.id });
                                                }).show();
                                        },
                                    );
                                }
                                if (organization.isOwner || organization.isAdmin || v.user.id !== getMessenger().engine.user.id) {
                                    builder.action(v.user.id === getMessenger().engine.user.id ? 'Leave organization' : 'Remove from organization',
                                        () => {
                                            Alert.builder()
                                                .title(v.user.id === getMessenger().engine.user.id ? 'Are you sure want to leave?' : `Are you sure want to remove ${v.user.name}?`)
                                                .button('Cancel', 'cancel')
                                                .action(v.user.id === getMessenger().engine.user.id ? 'Leave' : 'Remove', 'destructive', async () => {
                                                    await getClient().mutateOrganizationRemoveMember({
                                                        memberId: v.user.id,
                                                        organizationId: props.router.params.id,
                                                    });
                                                    await getClient().refetchOrganization({ organizationId: props.router.params.id });
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
                ))}
            </ZListItemGroup>
        </>
    );
});

class ProfileOrganizationComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Info" />
                <SScrollView>
                    <ProfileOrganizationContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}

export const ProfileOrganization = withApp(ProfileOrganizationComponent, {
    navigationAppearance: 'small-hidden',
});

import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SharedRoomKind, RoomMemberRole, RoomCreate } from 'openland-api/Types';
import { Modals } from '../main/modals/Modals';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SRouter } from 'react-native-s/SRouter';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

const showMembersModal = (router: SRouter, res: RoomCreate) => {
    Modals.showUserMuptiplePicker(router,
        {
            title: 'Add',
            action: async (users) => {
                startLoader();
                try {
                    await getClient().mutateRoomAddMembers({
                        invites: users.map(u => ({
                            userId: u.id,
                            role: RoomMemberRole.MEMBER
                        })),
                        roomId: res.room.id
                    });

                    router.pushAndReset('Conversation', { id: res.room.id });
                } catch (e) {
                    Alert.alert(e.message);
                }
                stopLoader();
            },

            titleEmpty: 'Skip',
            actionEmpty: () => {
                router.pushAndReset('Conversation', { id: res.room.id });
            }
        },
        'Add people',
        [],
        [getMessenger().engine.user.id],
        {
            path: 'ProfileGroupLink',
            pathParams: { id: res.room.id },
            onPress: () => {
                router.push('ProfileGroupLink', { room: res.room });
            }
        },
        true
    );
};

const CreateGroupComponent = (props: PageProps) => {
    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const titleField = useField('title', '', form);

    let isChannel = !!props.router.params.isChannel;
    let orgIdFromRouter = props.router.params.organizationId;

    let chatTypeString = isChannel ? 'Channel' : 'Group';

    let organizations = getClient().useMyOrganizations().myOrganizations;

    let sortedOrganizations = organizations.sort((a, b) => (a.isPrimary && !b.isPrimary) ? -1 : 1);

    if (orgIdFromRouter) {
        sortedOrganizations.sort((a, b) => (a.id === orgIdFromRouter && b !== orgIdFromRouter) ? -1 : 1);
    }

    const [selectedKind, setSelectedKind] = React.useState<SharedRoomKind.GROUP | SharedRoomKind.PUBLIC>(orgIdFromRouter ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP);
    const [selectedOrg, setSelectedOrg] = React.useState(sortedOrganizations[0].id);

    const handleSave = () => {
        if (titleField.value === '') {
            Alert.builder().title(`Please enter a name for this ${chatTypeString.toLowerCase()}`).button('GOT IT!').show();
            return;
        }

        form.doAction(async () => {
            const orgId = selectedKind === SharedRoomKind.PUBLIC ? selectedOrg : undefined;
            const res = await getClient().mutateRoomCreate({
                kind: selectedKind,
                title: titleField.value,
                photoRef: photoField.value,
                members: [],
                organizationId: orgId,
                channel: isChannel,
            });

            if (orgId) {
                await getClient().refetchOrganization({ organizationId: orgId });
            }

            showMembersModal(props.router, res);
        });
    };

    return (
        <>
            <SHeader title={`New ${chatTypeString.toLowerCase()}`} />
            <SHeaderButton title="Next" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header={null}>
                    <ZInput
                        placeholder="Name"
                        field={titleField}
                        autoFocus={true}
                    />
                    <ZSelect
                        label="Type"
                        defaultValue={selectedKind}
                        onChange={(option: { label: string; value: SharedRoomKind.GROUP | SharedRoomKind.PUBLIC }) => {
                            setSelectedKind(option.value);
                        }}
                        options={[
                            { label: 'Secret', value: SharedRoomKind.GROUP, icon: require('assets/ic-lock-24.png') },
                            { label: 'Shared', value: SharedRoomKind.PUBLIC, icon: require('assets/ic-invite-24.png') }
                        ]}
                        description={selectedKind === SharedRoomKind.GROUP ? `Secret ${chatTypeString.toLowerCase()} is a place that people can view and join only by invite from a ${chatTypeString.toLowerCase()} member.` : undefined}
                    />
                </ZListGroup>

                {selectedKind === SharedRoomKind.PUBLIC && (
                    <ZListGroup header="Share with" headerMarginTop={0}>
                        {sortedOrganizations.map(org => (
                            <ZListItem
                                key={'org-' + org.id}
                                text={org.name}
                                leftAvatar={{
                                    photo: org.photo,
                                    key: org.id,
                                    title: org.name
                                }}
                                checkmark={org.id === selectedOrg}
                                onPress={() => setSelectedOrg(org.id)}
                            />
                        ))}
                    </ZListGroup>
                )}
            </KeyboardAvoidingScrollView>
        </>
    );
};

export const CreateGroupAttrs = withApp(CreateGroupComponent, { navigationAppearance: 'small' });
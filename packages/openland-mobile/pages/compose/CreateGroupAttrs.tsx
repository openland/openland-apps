import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { ZForm } from '../../components/ZForm';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Platform, View } from 'react-native';
import { SharedRoomKind, RoomMemberRole } from 'openland-api/Types';
import { UserError, SilentError } from 'openland-y-forms/errorHandling';
import { Modals } from '../main/modals/Modals';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const CreateGroupComponent = (props: PageProps) => {
    const ref = React.createRef<ZForm>();

    const theme = React.useContext(ThemeContext);

    let isChannel = !!props.router.params.isChannel;
    let orgIdFromRouter = props.router.params.organizationId;

    let chatTypeString = isChannel ? 'Channel' : 'Group'

    let organizations = getClient().useMyOrganizations().myOrganizations;

    let sortedOrganizations = organizations.sort((a, b) => (a.isPrimary && !b.isPrimary) ? -1 : 1);

    if (orgIdFromRouter) {
        sortedOrganizations.sort((a, b) => (a.id === orgIdFromRouter && b !== orgIdFromRouter) ? -1 : 1);
    }

    const [selectedKind, setSelectedKind] = React.useState<SharedRoomKind.GROUP | SharedRoomKind.PUBLIC>(orgIdFromRouter ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP);
    const [selectedOrg, setSelectedOrg] = React.useState(sortedOrganizations[0].id);
    const handleKindPress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action(`Secret ${chatTypeString.toLowerCase()}`, () => {
            setSelectedKind(SharedRoomKind.GROUP);
        }, false, Platform.OS === 'android' ? require('assets/ic-secret-24.png') : undefined);

        builder.action(`Shared ${chatTypeString.toLowerCase()}`, () => {
            setSelectedKind(SharedRoomKind.PUBLIC);
        }, false, Platform.OS === 'android' ? require('assets/ic-community-24.png') : undefined);

        builder.show();
    }, []);

    return (
        <>
            <SHeader title={`Create ${chatTypeString.toLowerCase()}`} />
            <SHeaderButton title="Next" onPress={() => { ref.current!.submitForm(); }} />
            <ZForm
                ref={ref}
                action={async (src) => {
                    if (!src.title) {
                        Alert.builder().title(`Please enter a name for this ${chatTypeString.toLowerCase()}`).button('GOT IT!').show();

                        throw new SilentError();
                    }

                    let orgId = selectedKind === SharedRoomKind.PUBLIC ? selectedOrg : undefined;

                    let res = await getClient().mutateRoomCreate({
                        kind: selectedKind,
                        title: src.title,
                        photoRef: src.photoRef,
                        members: [],
                        organizationId: orgId,
                        channel: isChannel,
                    });

                    if (orgId) {
                        await getClient().refetchOrganization({ organizationId: orgId });
                    }

                    Modals.showUserMuptiplePicker(props.router,
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

                                    props.router.pushAndReset('Conversation', { id: res.room.id });
                                } catch (e) {
                                    Alert.alert(e.message);
                                }
                                stopLoader();
                            },

                            titleEmpty: 'Skip',
                            actionEmpty: () => {
                                props.router.pushAndReset('Conversation', { id: res.room.id });
                            }
                        },
                        'Add members',
                        [],
                        {
                            path: 'ProfileGroupLink',
                            pathParams: { id: res.room.id },
                            onPress: () => {
                                props.router.push('ProfileGroupLink', { id: res.room.id });
                            }
                        },
                        true
                    );
                }}
            >
                <ZAvatarPickerInputsGroup avatarField="photoRef">
                    <ZTextInput
                        placeholder={`${chatTypeString} name`}
                        field="title"
                        autoFocus={true}
                    />
                </ZAvatarPickerInputsGroup>

                <View marginTop={20}>
                    <ZListItemGroup footer={selectedKind === SharedRoomKind.GROUP ? `Secret ${chatTypeString.toLowerCase()} is a place that people can view and join only by invite from a ${chatTypeString.toLowerCase()} member.` : undefined}>
                        <ZListItem
                            onPress={handleKindPress}
                            text={`${chatTypeString} type`}
                            description={selectedKind === SharedRoomKind.GROUP ? 'Secret' : 'Shared'}
                            descriptionColor={selectedKind === SharedRoomKind.GROUP ? theme.dialogTitleSecureColor : undefined}
                            descriptionIcon={selectedKind === SharedRoomKind.GROUP ? require('assets/ic-secret-20.png') : undefined}
                            navigationIcon={true}
                        />
                    </ZListItemGroup>

                    {selectedKind === SharedRoomKind.PUBLIC && (
                        <View marginTop={20}>
                            {sortedOrganizations.map(org => (
                                <ZListItem
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
                        </View>
                    )}
                </View>
            </ZForm>
        </>
    );
}

export const CreateGroupAttrs = withApp(CreateGroupComponent, { navigationAppearance: 'small' });
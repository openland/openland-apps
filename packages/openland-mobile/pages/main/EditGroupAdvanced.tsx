import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Modals } from './modals/Modals';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { ZAvatarPicker, ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ZImage } from 'openland-mobile/components/ZImage';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SilentError } from 'openland-y-forms/errorHandling';

const SocialPicker = XMemo<ZAvatarPickerRenderProps>((props) => {
    const width = 190;
    const height = 100;
    const radius = 10;

    return (
        <TouchableOpacity onPress={props.showPicker}>
            <View width={width} height={height} borderRadius={radius}>
                {props.url && <ZImage highPriority={true} width={width} height={height} source={props.url} borderRadius={radius} />}
                <View position="absolute" alignItems="center" justifyContent="center" style={{ width, height, borderRadius: radius, borderWidth: 1, borderColor: '#eff0f2' }}>
                    {!props.loading && <Image style={{ tintColor: props.url ? 'white' : 'gray', opacity: 0.8, width: 26, height: 21 }} resizeMode="stretch" source={require('assets/ic-photo-full.png')} />}
                    {props.loading && (
                        <View width={34} height={34} backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius={17} justifyContent="center">
                            <ActivityIndicator color="rgba(0, 0, 0, 0.4)" />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const EditGroupAdvancedComponent = XMemo<PageProps>((props) => {
    let ref = React.useRef<ZForm | null>(null);
    let rawGroup = getClient().useRoom({ id: props.router.params.id }, { fetchPolicy: 'network-only' }).room;
    let group = (rawGroup && rawGroup.__typename === 'SharedRoom') ? rawGroup : undefined;
    let roomAdmins = getClient().useRoomOrganizationAdminMembers({ id: props.router.params.id })

    const [welcomeMessageEnabled, setWelcomeMessageEnabled] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.isOn : false);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.sender : undefined);

    if (group) {
        let currentSocialImage = group.socialImage;

        return (
            <>
                <SHeader title="Advanced settings" />
                <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
                <ZForm
                    ref={ref}
                    action={async src => {
                        if (welcomeMessageEnabled) {
                            if (!welcomeMessageSender) {
                                Alert.builder().title('Please choose who will send the Welcome message').button('GOT IT!').show();

                                throw new SilentError();
                            }

                            if (typeof src.input.welcomeMessageText !== 'string' || src.input.welcomeMessageText === '') {
                                Alert.builder().title('Please enter the Welcome message text').button('GOT IT!').show();

                                throw new SilentError();
                            }
                        }

                        let client = getClient();

                        await client.mutateUpdateWelcomeMessage({
                            roomId: src.roomId,
                            welcomeMessageIsOn: welcomeMessageEnabled,
                            welcomeMessageSender: welcomeMessageSender ? welcomeMessageSender.id : undefined,
                            welcomeMessageText: src.input.welcomeMessageText,
                        });

                        if (src.input.socialImageRef && src.input.socialImageRef.uuid === currentSocialImage) {
                            src.input.socialImageRef = undefined;
                        }

                        await client.mutateRoomUpdate({
                            roomId: src.roomId,
                            input: {
                                socialImageRef: src.input.socialImageRef
                            }
                        });

                        await client.refetchRoom({ id: props.router.params.id });
                    }}
                    defaultData={{
                        input: {
                            welcomeMessageText: group.welcomeMessage ? group.welcomeMessage.message : undefined,
                            socialImageRef: {
                                uuid: currentSocialImage
                            },
                        },
                    }}
                    staticData={{
                        roomId: props.router.params.id,
                    }}
                    onSuccess={() => {
                        props.router.back();
                    }}
                >
                    <ZListItemGroup header={null} footer="Send an automatic message in 1:1 chat to every new member who joins this group">
                        <ZListItem text="Welcome message" toggle={welcomeMessageEnabled} onToggle={(value) => setWelcomeMessageEnabled(value)} />
                    </ZListItemGroup>

                    {welcomeMessageEnabled && (
                        <ZListItemGroup header={null}>
                            <ZListItem
                                text="Sender"
                                description={welcomeMessageSender ? welcomeMessageSender.name : undefined}
                                navigationIcon={true}
                                onPress={() => {
                                    Modals.showUserPicker(
                                        props.router,
                                        async (user) => {
                                            setWelcomeMessageSender(user);

                                            props.router.back();
                                        },
                                        getWelcomeMessageSenders({
                                            chat: group,
                                            admins: (roomAdmins && roomAdmins.room && roomAdmins.room.__typename === 'SharedRoom' && roomAdmins.room.organization && roomAdmins.room.organization.adminMembers || []).map(a => a.user)
                                        }),
                                        'Choose sender',
                                        welcomeMessageSender ? welcomeMessageSender.id : undefined,
                                    );
                                }}
                            />
                            <ZTextInput multiline={true} placeholder="Text message" field="input.welcomeMessageText" border={false} />
                        </ZListItemGroup>
                    )}

                    <ZListItemGroup
                        header="Social sharing image"
                        footer="Choose an image to display when sharing invite to this group on social networks"
                        divider={false}
                    >
                        <View paddingHorizontal={16}>
                            <ZAvatarPicker field="input.socialImageRef" render={SocialPicker} pickSize={{ width: 1200, height: 630 }} />
                        </View>
                    </ZListItemGroup>
                </ZForm>
            </>
        )
    } else {
        return null;
    }
});

export const EditGroupAdvanced = withApp(EditGroupAdvancedComponent, { navigationAppearance: 'small' });

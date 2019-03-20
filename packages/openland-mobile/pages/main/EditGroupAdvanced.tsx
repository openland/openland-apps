import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Modals } from './modals/Modals';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { ZAvatarPicker, ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ZImage } from 'openland-mobile/components/ZImage';

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
    let group = getClient().useRoom({ id: props.router.params.id }).room;

    const [ welcomeMessageEnabled, setWelcomeMessageEnabled ] = React.useState((group && group.__typename === 'SharedRoom' && group.welcomeMessage) ? group.welcomeMessage.isOn : false);
    const [ welcomeMessageSender, setWelcomeMessageSender ] = React.useState((group && group.__typename === 'SharedRoom' && group.welcomeMessage && group.welcomeMessage.sender) ? group.welcomeMessage.sender.user : undefined);

    if (group && group.__typename === 'SharedRoom') {
        let currentSocialImage = group.socialImage;

        return (
            <>
                <SHeader title="Advanced settings" />
                <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
                <ZForm
                    ref={ref}
                    action={async src => {
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
                                        getWelcomeMessageSenders({ chat: group as Room_room_SharedRoom }),
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
                            <ZAvatarPicker field="input.socialImageRef" render={SocialPicker} />
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

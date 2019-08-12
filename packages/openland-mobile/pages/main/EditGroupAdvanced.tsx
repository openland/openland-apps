import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Modals } from './modals/Modals';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { ZAvatarPicker, ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { ZImage } from 'openland-mobile/components/ZImage';
import Alert from 'openland-mobile/components/AlertBlanket';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

const SocialPicker = XMemo<ZAvatarPickerRenderProps>((props) => {
    const width = 190;
    const height = 100;
    const radius = RadiusStyles.medium;

    return (
        <TouchableOpacity onPress={props.showPicker}>
            <View width={width} height={height} borderRadius={radius}>
                {props.url && <ZImage highPriority={true} width={width} height={height} source={props.url} borderRadius={radius} />}
                <View position="absolute" alignItems="center" justifyContent="center" style={{ width, height, borderRadius: radius, borderWidth: 1, borderColor: '#eff0f2' }}>
                    {!props.loading && <Image style={{ tintColor: props.url ? 'white' : 'gray', opacity: 0.8, width: 26, height: 21 }} resizeMode="stretch" source={require('assets/ic-photo-full.png')} />}
                    {props.loading && (
                        <View width={34} height={34} backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius={RadiusStyles.large} justifyContent="center">
                            <ActivityIndicator color="rgba(0, 0, 0, 0.4)" />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const EditGroupAdvancedComponent = XMemo<PageProps>((props) => {
    const roomId = props.router.params.id;
    const client = getClient();
    const rawGroup = client.useRoom({ id: roomId }, { fetchPolicy: 'network-only' }).room;
    const group = (rawGroup && rawGroup.__typename === 'SharedRoom') ? rawGroup : undefined;
    
    if (!group) {
        return null;
    }   

    const form = useForm();
    const socialImageField = useField('socialImageRef', group.socialImage ? { uuid: group.socialImage } : null, form);
    
    const welcomeMessageText = group.welcomeMessage && group.welcomeMessage.message ? group.welcomeMessage.message : '';
    const welcomeMessageField = useField('welcomeMessageText', welcomeMessageText, form);

    const roomAdmins = client.useRoomOrganizationAdminMembers({ id: roomId });

    const [welcomeMessageEnabled, setWelcomeMessageEnabled] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.isOn : false);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.sender : undefined);

    const handleSave = () => {
        if (welcomeMessageEnabled) {
            if (!welcomeMessageSender) {
                Alert.builder().title('Please choose who will send the Welcome message').button('GOT IT!').show();
                return;
            }

            if (welcomeMessageField.value === '') {
                Alert.builder().title('Please enter the Welcome message text').button('GOT IT!').show();
                return;
            }
        }

        form.doAction(async () => {
            await client.mutateUpdateWelcomeMessage({
                roomId,
                welcomeMessageIsOn: welcomeMessageEnabled,
                welcomeMessageSender: welcomeMessageSender ? welcomeMessageSender.id : undefined,
                welcomeMessageText: welcomeMessageField.value
            });

            await client.mutateRoomUpdate({
                roomId,
                input: {
                    ...(
                        socialImageField.value && 
                        socialImageField.value.uuid !== group.socialImage && 
                        { socialImageRef: socialImageField.value }
                    )
                }
            });

            await client.refetchRoom({ id: roomId });

            props.router.back();
        });
    };

    return (
        <>
            <SHeader title="Advanced settings" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} footer="Send an automatic message in 1:1 chat to every new member who joins this group">
                    <ZListItem text="Welcome message" toggle={welcomeMessageEnabled} onToggle={(value) => setWelcomeMessageEnabled(value)} />
                </ZListGroup>

                {welcomeMessageEnabled && (
                    <ZListGroup header={null}>
                        <ZPickField
                            label="Sender"
                            value={welcomeMessageSender ? welcomeMessageSender.name : undefined}
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
                        <ZInput multiline={true} placeholder="Text message" field={welcomeMessageField} />
                    </ZListGroup>
                )}

                <ZListGroup
                    header="Social sharing image"
                    footer="Choose an image to display when sharing invite to this group on social networks"
                >
                    <View paddingHorizontal={16}>
                        <ZAvatarPicker field={socialImageField} render={SocialPicker} pickSize={{ width: 1200, height: 630 }} />
                    </View>
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupAdvanced = withApp(EditGroupAdvancedComponent, { navigationAppearance: 'small' });

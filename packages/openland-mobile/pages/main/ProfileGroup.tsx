import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text, Alert } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { GroupChatFullInfoQuery } from 'openland-api/GroupChatFullInfoQuery';
import { Modals } from './modals/Modals';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ChatChangeGroupTitleMutation, ConversationKickMutation, ConversationSettingsUpdateMutation } from 'openland-api';
import { ChatAddMemberMutation } from 'openland-api/ChatAddMemberMutation';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { UserShort } from 'openland-api/Types';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { ActionSheetBuilder } from '../../components/ActionSheet';
import { getMessenger } from '../../utils/messenger';

export const UserView = (props: { user: UserShort, role?: string, onPress: () => void, onLongPress?: () => void }) => (
    <ZListItemBase key={props.user.id} separator={false} height={56} onPress={props.onPress} onLongPress={props.onLongPress}>
        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
            <XPAvatar size={32} src={props.user.picture} placeholderKey={props.user.id} placeholderTitle={props.user.name} />
        </View>
        <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.user.name}</Text>
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.role}</Text>
        </View>
    </ZListItemBase>
);

class ProfileGroupComponent extends React.Component<PageProps> {

    handleAddMember = () => {
        this.props.router.push('UserPicker');
    }

    render() {
        return (
            <>
                <SHeader title="Info" />
                <ZQuery query={GroupChatFullInfoQuery} variables={{ conversationId: this.props.router.params.id }}>
                    {(resp) => {
                        if (resp.data.chat.__typename !== 'GroupConversation' && resp.data.chat.__typename !== 'ChannelConversation') {
                            throw Error('');
                        }
                        let groupOrChannel = resp.data.chat.__typename !== 'GroupConversation' ? 'group' : 'channel';
                        return (
                            <SScrollView>
                                <ZListItemHeader
                                    title={resp.data.chat.title}
                                    subtitle={resp.data.members.length + ' members'}
                                    photo={(resp.data.chat as any).photo || (resp.data.chat.photos.length > 0 ? resp.data.chat.photos[0] : undefined)}
                                    id={resp.data.chat.id}
                                />

                                <ZListItemGroup header={null}>
                                    <ZListItem appearance="action" text={`Set ${groupOrChannel} photo`} />
                                    <YMutation mutation={ChatChangeGroupTitleMutation}>
                                        {(save) => (
                                            <ZListItem
                                                appearance="action"
                                                text="Change name"
                                                onPress={() =>
                                                    Modals.showTextEdit(
                                                        this.props.router,
                                                        resp.data.chat.title,
                                                        async (src) => await save({ variables: { name: src, conversationId: resp.data.chat.id } })
                                                    )
                                                }
                                            />
                                        )}
                                    </YMutation>
                                    <YMutation mutation={ConversationSettingsUpdateMutation}>
                                        {(update) => (
                                            <ZListItem
                                                text="Notifications"
                                                toggle={!resp.data.chat.settings.mute}
                                                onPress={async () => {
                                                    startLoader();
                                                    try {
                                                        await update({ variables: { conversationId: resp.data.chat.id, settings: { mute: !resp.data.chat.settings.mute } } });
                                                    } catch (e) {
                                                        Alert.alert(e.message);
                                                    }
                                                    stopLoader();
                                                }}
                                            />
                                        )
                                        }
                                    </YMutation>
                                </ZListItemGroup>

                                <ZListItemGroup header="Members">
                                    <YMutation mutation={ChatAddMemberMutation} refetchQueriesVars={[{ query: GroupChatFullInfoQuery, variables: { conversationId: this.props.router.params.id } }]} >
                                        {(add) => (
                                            <ZListItem
                                                appearance="action"
                                                text="Add members"
                                                onPress={() => {
                                                    Modals.showUserPicker(
                                                        this.props.router,
                                                        async (src) => {

                                                            Alert.alert(`Are you sure you want to add ${src.name}?`, undefined, [{
                                                                onPress: async () => {
                                                                    startLoader();
                                                                    try {
                                                                        await add({ variables: { userId: src.id, conversationId: resp.data.chat.id } });
                                                                    } catch (e) {
                                                                        Alert.alert(e.message);
                                                                    }
                                                                    stopLoader();
                                                                },
                                                                text: 'Add',
                                                                style: 'default'
                                                            },
                                                            {
                                                                text: 'Cancel',
                                                                style: 'cancel'
                                                            }]);

                                                        }
                                                    );
                                                }}
                                            />
                                        )}
                                    </YMutation>
                                    {resp.data.members.map((v) => (
                                        <YMutation mutation={ConversationKickMutation} refetchQueriesVars={[{ query: GroupChatFullInfoQuery, variables: { conversationId: this.props.router.params.id } }]}>
                                            {(kick) => (
                                                <UserView
                                                    user={v.user}
                                                    role={v.role}
                                                    onLongPress={v.user.id !== getMessenger().engine.user.id ? async () => {

                                                        let builder = new ActionSheetBuilder();
                                                        builder.action(
                                                            'Kick',
                                                            () => {
                                                                Alert.alert(`Are you sure you want to kick ${v.user.name}?`, undefined, [{
                                                                    onPress: async () => {
                                                                        startLoader();
                                                                        try {
                                                                            await kick({ variables: { userId: v.user.id, conversationId: this.props.router.params.id } });
                                                                        } catch (e) {
                                                                            Alert.alert(e.message);
                                                                        }
                                                                        stopLoader();
                                                                    },
                                                                    text: 'Kick',
                                                                    style: 'destructive'
                                                                },
                                                                {
                                                                    text: 'Cancel',
                                                                    style: 'cancel'
                                                                }]);
                                                            },
                                                            true
                                                        );
                                                        builder.show();

                                                    } : undefined}
                                                    onPress={() => this.props.router.push('ProfileUser', { 'id': v.user.id })}
                                                />
                                            )}
                                        </YMutation>
                                    ))}
                                </ZListItemGroup>
                            </SScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationAppearance: 'small-hidden' });
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { GroupChatFullInfoQuery } from 'openland-api/GroupChatFullInfoQuery';
import { Modals } from './modals/Modals';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ChatChangeGroupTitleMutation } from 'openland-api';
import { ChatAddMemberMutation } from 'openland-api/ChatAddMemberMutation';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { UserShortFragment } from 'openland-api/Types';

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
                        return (
                            <SScrollView>
                                <ZListItemHeader
                                    title={resp.data.chat.title}
                                    subtitle={resp.data.members.length + ' members'}
                                    photo={resp.data.chat.photos.length > 0 ? resp.data.chat.photos[0] : undefined}
                                    id={resp.data.chat.id}
                                />

                                <ZListItemGroup header={null}>
                                    <ZListItem appearance="action" text="Set group photo" />
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
                                    <ZListItem text="Notifications" toggle={true} />
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
                                                            try {
                                                                let res = await add({ variables: { userId: src, conversationId: resp.data.chat.id } });
                                                                console.warn('boom', res);
                                                            } catch (e) {
                                                                console.warn('boom', e);
                                                                throw e;
                                                            }

                                                        }
                                                    );
                                                }}
                                            />
                                        )}
                                    </YMutation>
                                    {resp.data.members.map((v) => (
                                        <UserView user={v.user} role={v.role} onPress={() => this.props.router.push('ProfileUser', { 'id': v.user.id })} />
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

export const UserView = (props: { user: UserShortFragment, role?: string, onPress: () => void }) => (
    <ZListItemBase key={props.user.id} separator={false} height={56} onPress={props.onPress}>
        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
            <XPAvatar size={32} src={props.user.picture} placeholderKey={props.user.id} placeholderTitle={props.user.name} />
        </View>
        <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.user.name}</Text>
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{props.role}</Text>
        </View>
    </ZListItemBase>
);

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationAppearance: 'small-hidden' });
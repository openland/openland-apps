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
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';

class ProfileGroupComponent extends React.Component<PageProps> {

    handleAddMember = () => {
        this.props.router.push('UserPicker');
    }

    render() {
        return (
            <>
                {/* <FastHeader title="Info" /> */}
                <ZQuery query={GroupChatFullInfoQuery} variables={{ conversationId: this.props.router.params.id }}>
                    {(resp) => {
                        if (resp.data.chat.__typename !== 'GroupConversation') {
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
                                    <YMutation mutation={ChatAddMemberMutation}>
                                        {(add) => (
                                            <ZListItem
                                                appearance="action"
                                                text="Add members"
                                                onPress={() => {
                                                    Modals.showUserPicker(
                                                        this.props.router,
                                                        async (src) => await add({ variables: { userId: src, conversationId: resp.data.chat.id } })
                                                    );
                                                }}
                                            />
                                        )}
                                    </YMutation>
                                    {resp.data.members.map((v) => (
                                        <ZListItemBase key={v.user.id} separator={false} height={56} onPress={() => this.props.router.push('ProfileUser', { 'id': v.user.id })}>
                                            <View paddingTop={12} paddingLeft={15} paddingRight={15}>
                                                <XPAvatar size={32} src={v.user.picture} placeholderKey={v.user.id} placeholderTitle={v.user.name} />
                                            </View>
                                            <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
                                                <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.user.name}</Text>
                                                <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.role}</Text>
                                            </View>
                                        </ZListItemBase>
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
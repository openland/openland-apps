import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { View, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZAvatar } from '../../components/ZAvatar';
import { ZScrollView } from '../../components/ZScrollView';
import { GroupChatFullInfoQuery } from 'openland-api/GroupChatFullInfoQuery';

class ProfileGroupComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Info',
        headerAppearance: 'small-hidden'
    };

    handleAddMember = () => {
        this.props.navigation.navigate('UserPicker');
    }

    render() {
        return (
            <ZQuery query={GroupChatFullInfoQuery} variables={{ conversationId: this.props.navigation.getParam('id') }}>
                {(resp) => {
                    if (resp.data.chat.__typename !== 'GroupConversation') {
                        throw Error('');
                    }
                    return (
                        <ZScrollView>

                            <ZListItemHeader
                                title={resp.data.chat.title}
                                subtitle={resp.data.members.length + ' members'}
                                photo={resp.data.chat.photos.length > 0 ? resp.data.chat.photos[0] : undefined}
                                id={resp.data.chat.id}
                            />

                            <ZListItemGroup header={null}>
                                <ZListItem appearance="action" text="Set group photo" />
                                <ZListItem appearance="action" text="Change name" onPress={() => this.props.navigation.navigate('TextEditModal', { 'title': 'Edit group name', 'value': resp.data.chat.title })} />
                                <ZListItem text="Notifications" toggle={true} />
                            </ZListItemGroup>

                            <ZListItemGroup header="Members">
                                <ZListItem appearance="action" text="Add members" onPress={this.handleAddMember} />
                                {resp.data.members.map((v) => (
                                    <ZListItemBase key={v.user.id} separator={false} height={56} onPress={() => this.props.navigation.navigate('ProfileUser', { 'id': v.user.id })}>
                                        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
                                            <ZAvatar size={32} src={v.user.picture} placeholderKey={v.user.id} placeholderTitle={v.user.name} />
                                        </View>
                                        <View flexGrow={1} flexBasis={0} alignItems="flex-start" justifyContent="center" flexDirection="column">
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.user.name}</Text>
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.role}</Text>
                                        </View>
                                    </ZListItemBase>
                                ))}
                            </ZListItemGroup>
                        </ZScrollView>
                    );
                }}
            </ZQuery>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponent, { navigationStyle: 'small' });
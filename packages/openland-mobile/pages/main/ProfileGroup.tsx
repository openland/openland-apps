import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
// import { UserQuery } from 'openland-api';
import { ScrollView, View, Text } from 'react-native';
// import { ZListItemHeader } from '../../components/ZListItemHeader';
// import { ZListItemGroup } from '../../components/ZListItemGroup';
// import { ZListItem } from '../../components/ZListItem';
import { ChatFullInfoQuery } from 'openland-api/ChatFullInfoQuery';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZAvatar } from '../../components/ZAvatar';
import { ZScrollView } from '../../components/ZScrollView';

class ProfileGroupComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Info'
    };
    handleSend = () => {
        this.props.navigation.navigate('Conversation', { 'id': this.props.navigation.getParam('id') });
    }

    render() {
        return (
            <ZQuery query={ChatFullInfoQuery} variables={{ conversationId: this.props.navigation.getParam('id') }}>
                {(resp) => {
                    if (resp.data.chat.__typename !== 'GroupConversation') {
                        throw Error('');
                    }
                    return (
                        <ZScrollView>
                            <ZListItemGroup>
                                <ZListItemHeader
                                    title={resp.data.chat.title}
                                    photo={resp.data.chat.photos.length > 0 ? resp.data.chat.photos[0] : undefined}
                                    id={resp.data.chat.id}
                                    subtitle="Group"
                                />
                                {/* <ZListItem text="Send message" appearance="action" onPress={this.handleSend} />
                                {resp.data.user.about && <ZListItem text={resp.data.user.about} />} */}
                            </ZListItemGroup>

                            <ZListItemGroup header={null}>
                                <ZListItem text="Notifications" toggle={true} />
                            </ZListItemGroup>

                            <ZListItemGroup header="Members">
                                {resp.data.chat.members.map((v) => (
                                    <ZListItemBase key={v.id} separator={false} height={56} onPress={() => this.props.navigation.navigate('ProfileUser', { 'id': v.id })}>
                                        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
                                            <ZAvatar size={32} src={v.picture} placeholderKey={v.id} placeholderTitle={v.name} />
                                        </View>
                                        <View flexGrow={1} flexBasis={0} alignItems="center" flexDirection="row">
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.name}</Text>
                                        </View>
                                    </ZListItemBase>
                                ))}
                            </ZListItemGroup>

                            {/* <ZListItemGroup header="Contacts">
                                {resp.data.user.email && <ZListItem text={resp.data.user.email} />}
                                {resp.data.user.phone && <ZListItem text={resp.data.user.phone} />}
                                {resp.data.user.website && <ZListItem text={resp.data.user.website} />}
                                {resp.data.user.location && <ZListItem text={resp.data.user.location} />}
                            </ZListItemGroup> */}
                        </ZScrollView>
                    );
                }}
            </ZQuery>
        );
    }
}

export const ProfileGroup = withApp(ProfileGroupComponent);
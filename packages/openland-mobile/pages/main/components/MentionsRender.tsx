import * as React from 'react';
import { View, Text, Platform, Dimensions, TextStyle } from 'react-native';
import { RoomMembers_members_user } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ScrollView } from 'react-native-gesture-handler';

interface RenderMentionsProps {
    activeWord: string;
    groupId: string;
    onMentionPress: (word: string | undefined, user: RoomMembers_members_user) => void;
}

export const MentionsRender = (props: RenderMentionsProps) => {
    let membersQuery = getClient().useWithoutLoaderRoomMembers({ roomId: props.groupId });
    let mentionsWrapper = null;

    if (membersQuery) {
        let members = membersQuery.members;
        let nameToSearch = props.activeWord.replace('@', '').toLowerCase();

        let mentionedUsers = members.filter(member => member.user.name.toLowerCase().startsWith(nameToSearch));

        if (mentionedUsers.length > 0) {
            mentionsWrapper = (
                <>
                    <View height={0.5} backgroundColor={AppStyles.separatorColor} />
                    <ScrollView keyboardShouldPersistTaps={true} maxHeight={160}>
                        {mentionedUsers.map((member, index) => {
                            let user = member.user;
        
                            return (
                                <ZListItemBase
                                    key={'mention-user-' + index}
                                    onPress={() => props.onMentionPress(props.activeWord, user)}
                                    separator={false}
                                    height={40}
                                    underlayColor="rgba(0, 0, 0, 0.03)"
                                >
                                    <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                                        <View style={{ width: 48, height: 40 }} alignItems="center" justifyContent="center">
                                            <ZAvatar
                                                userId={user.id}
                                                src={user.photo}
                                                size={26}
                                                placeholderKey={user.id}
                                                placeholderTitle={user.name}
                                            />
                                        </View>
                                        <View flexGrow={1}>
                                            <Text style={{ width: Dimensions.get('window').width - 55, fontWeight: TextStyles.weight.medium, color: Platform.OS === 'android' ? '#000' : '#181818' } as TextStyle} numberOfLines={1} ellipsizeMode="tail">
                                                {user.name}{' '}
                                                {user.primaryOrganization && (
                                                    <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: TextStyles.weight.regular } as TextStyle}>
                                                        {user.primaryOrganization.name}
                                                    </Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </ZListItemBase>
                            )
                        })}
                    </ScrollView>
                    <View height={0.5} backgroundColor={AppStyles.separatorColor} />
                </>
            );
        }
    }

    return mentionsWrapper;
}
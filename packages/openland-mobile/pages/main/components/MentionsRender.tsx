import * as React from 'react';
import { View, Text, Platform, Dimensions, TextStyle } from 'react-native';
import { RoomMembers_members_user, RoomMembers_members } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ScrollView } from 'react-native-gesture-handler';
import { isAndroid } from 'openland-mobile/utils/isAndroid';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const findMentions = (activeWord: string, groupId: string): RoomMembers_members[] => {
    let members = getClient().useRoomMembers({ roomId: groupId }).members;

    if (members.length <= 0) {
        return [];
    }

    let nameToSearch = activeWord.replace('@', '').toLowerCase();
    let mentionedUsers = members.filter(member => member.user.name.toLowerCase().startsWith(nameToSearch));

    return mentionedUsers;
}

interface MentionsRenderProps {
    activeWord: string;
    groupId: string;

    onMentionPress: (word: string | undefined, user: RoomMembers_members_user) => void;
}

export const MentionsRender = (props: MentionsRenderProps) => {
    let theme = React.useContext(ThemeContext);
    let mentionsWrapper = null;
    let mentionedUsers = findMentions(props.activeWord, props.groupId);

    if (mentionedUsers.length > 0) {
        mentionsWrapper = (
            <>
                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
                <ScrollView keyboardShouldPersistTaps="always" maxHeight={186}>
                    <View height={6} />
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
                                    <View paddingLeft={16} paddingRight={12} height={40} alignItems="center" justifyContent="center">
                                        <ZAvatar
                                            userId={user.id}
                                            online={user.online}
                                            src={user.photo}
                                            size={28}
                                            placeholderKey={user.id}
                                            placeholderTitle={user.name}
                                        />
                                    </View>
                                    <View flexGrow={1}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                width: Dimensions.get('window').width - 63,
                                                fontWeight: TextStyles.weight.medium,
                                                color: theme.textColor
                                            } as TextStyle}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {user.name}{'   '}
                                            {user.primaryOrganization && (
                                                <Text
                                                    style={{
                                                        color: '#99a2b0',
                                                        fontWeight: TextStyles.weight.regular
                                                    } as TextStyle}
                                                >
                                                    {user.primaryOrganization.name}
                                                </Text>
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </ZListItemBase>
                        )
                    })}
                    <View height={6} />
                </ScrollView>
                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
            </>
        );
    }

    return mentionsWrapper;
}
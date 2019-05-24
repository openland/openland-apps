import * as React from 'react';
import { View, Text, Dimensions, TextStyle, ActivityIndicator } from 'react-native';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ScrollView } from 'react-native-gesture-handler';
import { isAndroid } from 'openland-mobile/utils/isAndroid';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { AppTheme } from 'openland-mobile/themes/themes';

export const findMentions = (activeWord: string, groupId: string): MentionToSend[] => {
    let res: MentionToSend[] = [];
    let members = getClient().useRoomMembers({ roomId: groupId }).members;

    if (members.length <= 0) {
        return [];
    }

    let nameToSearch = activeWord.replace('@', '').toLowerCase();

    if ('all'.startsWith(nameToSearch)) {
        res.push({ __typename: 'AllMention' });
    }

    let mentionedUsers: MentionToSend[] = members.filter(member => member.user.name.toLowerCase().startsWith(nameToSearch)).map(member => ({
        __typename: 'User',

        ...member.user
    }));

    res.push(...mentionedUsers);

    return res;
}

interface MentionsRenderProps {
    activeWord: string;
    groupId: string;

    onMentionPress: (word: string | undefined, mention: MentionToSend) => void;
}

const MentionsRenderItemName = (props: { theme: AppTheme, name: string; description?: string }) => (
    <Text
        style={{ fontSize: 14, width: Dimensions.get('window').width - 63, fontWeight: TextStyles.weight.medium, color: props.theme.textColor }}
        numberOfLines={1}
        ellipsizeMode="tail"
    >
        {props.name}{'   '}
        {!!props.description && (
            <Text
                style={{
                    color: '#99a2b0',
                    fontWeight: TextStyles.weight.regular
                } as TextStyle}
            >
                {props.description}
            </Text>
        )}
    </Text>
);

const MentionsRenderInner = (props: MentionsRenderProps) => {
    let theme = React.useContext(ThemeContext);
    let mentionsWrapper = null;
    let mentions = findMentions(props.activeWord, props.groupId);

    if (mentions.length > 0) {
        mentionsWrapper = (
            <>
                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}

                <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always" maxHeight={186}>
                    <View height={6} />

                    {mentions.map((mention, index) => (
                        <ZListItemBase
                            key={'mention-' + index}
                            onPress={() => props.onMentionPress(props.activeWord, mention)}
                            separator={false}
                            height={40}
                            underlayColor="rgba(0, 0, 0, 0.03)"
                        >
                            <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                                <View paddingLeft={16} paddingRight={12} height={40} alignItems="center" justifyContent="center">
                                    {mention.__typename === 'User' && (
                                        <ZAvatar
                                            userId={mention.id}
                                            src={mention.photo}
                                            size={28}
                                            placeholderKey={mention.id}
                                            placeholderTitle={mention.name}
                                        />
                                    )}
                                    {mention.__typename === 'AllMention' && (
                                        <View style={{ width: 28, height: 28, backgroundColor: 'lightgrey', borderRadius: 14 }} />
                                    )}
                                </View>
                                <View flexGrow={1}>
                                    {mention.__typename === 'User' && (
                                        <MentionsRenderItemName
                                            theme={theme}
                                            name={mention.name}
                                            description={mention.primaryOrganization ? mention.primaryOrganization.name : undefined}
                                        />
                                    )}
                                    {mention.__typename === 'AllMention' && (
                                        <MentionsRenderItemName
                                            theme={theme}
                                            name="@all"
                                            description="Notify everyone in this chat"
                                        />
                                    )}
                                </View>
                            </View>
                        </ZListItemBase>
                    ))}

                    <View height={6} />
                </ScrollView>

                {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
            </>
        );
    }

    return mentionsWrapper;
}

export const MentionsRender = (props: MentionsRenderProps) => (
    <React.Suspense fallback={<View paddingTop={10} paddingBottom={6}><ActivityIndicator /></View>}>
        <MentionsRenderInner {...props} />
    </React.Suspense>
)
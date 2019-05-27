import * as React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { SuggestionsWrapper, SuggestionsItemName } from './Suggestions';

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

const MentionsRenderInner = (props: MentionsRenderProps) => {
    let theme = React.useContext(ThemeContext);
    let mentionsWrapper = null;
    let mentions = findMentions(props.activeWord, props.groupId);

    if (mentions.length > 0) {
        mentionsWrapper = (
            <SuggestionsWrapper>
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
                                    <View alignItems="center" justifyContent="center" width={28} height={28}>
                                        <Image source={require('assets/ic-channel-13.png')} style={{ tintColor: theme.textColor, opacity: 0.3, width: 18, height: 18 }} />
                                    </View>
                                )}
                            </View>
                            <View flexGrow={1}>
                                {mention.__typename === 'User' && (
                                    <SuggestionsItemName
                                        theme={theme}
                                        name={mention.name}
                                        description={mention.primaryOrganization ? mention.primaryOrganization.name : undefined}
                                    />
                                )}
                                {mention.__typename === 'AllMention' && (
                                    <SuggestionsItemName
                                        theme={theme}
                                        name="@all"
                                        description="Notify everyone in this chat"
                                    />
                                )}
                            </View>
                        </View>
                    </ZListItemBase>
                ))}
            </SuggestionsWrapper>
        );
    }

    return mentionsWrapper;
}

export const MentionsRender = (props: MentionsRenderProps) => (
    <React.Suspense fallback={<View paddingTop={10} paddingBottom={6}><ActivityIndicator /></View>}>
        <MentionsRenderInner {...props} />
    </React.Suspense>
)
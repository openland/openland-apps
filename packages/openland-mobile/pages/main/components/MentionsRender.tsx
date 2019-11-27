import * as React from 'react';
import { View, Image } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { SuggestionsWrapper, SuggestionsItemName } from './Suggestions';
import { searchMentions } from 'openland-engines/mentions/searchMentions';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

const findMentions = (activeWord: string, groupId: string): MentionToSend[] => {
    let res: MentionToSend[] = [];
    let members = getClient().useRoomMembers({ roomId: groupId }, { fetchPolicy: 'cache-and-network' }).members;

    if (members.length <= 0) {
        return [];
    }

    if ('@all'.startsWith(activeWord.toLowerCase())) {
        res.push({ __typename: 'AllMention' });
    }

    res.push(...searchMentions(activeWord, members).map(v => v.user));

    return res;
};

interface MentionsRenderProps {
    activeWord: string;
    groupId: string;

    onMentionPress: (word: string | undefined, mention: MentionToSend) => void;
}

const MentionsRenderInner = (props: MentionsRenderProps) => {
    const { activeWord, groupId, onMentionPress } = props;
    const theme = React.useContext(ThemeContext);
    const mentions = findMentions(activeWord, groupId);

    if (mentions.length > 0) {
        return (
            <SuggestionsWrapper>
                {mentions.map((mention, index) => (
                    <ZListItemBase
                        key={'mention-' + index}
                        onPress={() => onMentionPress(activeWord, mention)}
                        separator={false}
                        height={48}
                        underlayColor="rgba(0, 0, 0, 0.03)"
                    >
                        <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                            <View paddingLeft={16} paddingRight={12} height={40} alignItems="center" justifyContent="center">
                                {mention.__typename === 'User' && (
                                    <ZAvatar
                                        src={mention.photo}
                                        size="small"
                                        placeholderKey={mention.id}
                                        placeholderTitle={mention.name}
                                    />
                                )}
                                {mention.__typename === 'AllMention' && (
                                    <View alignItems="center" justifyContent="center" width={28} height={28}>
                                        <Image source={require('assets/ic-channel-13.png')} style={{ tintColor: theme.foregroundPrimary, opacity: 0.3, width: 18, height: 18 }} />
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
                                        name="@All"
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

    return null;
};

export const MentionsRender = (props: MentionsRenderProps) => (
    <React.Suspense
        fallback={
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 6 }}>
                <LoaderSpinner size={'medium'} />
            </View>
        }
    >
        <MentionsRenderInner {...props} />
    </React.Suspense>
);
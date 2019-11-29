import * as React from 'react';
import { View, Image, FlatList } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { SuggestionsItemName } from './Suggestions';
// import { searchMentions } from 'openland-engines/mentions/searchMentions';
import { UserForMention } from 'openland-api/Types';

// const findMentions = (activeWord: string, groupId: string): MentionToSend[] => {
//     let res: MentionToSend[] = [];
//     let members = getClient().useRoomMembers({ roomId: groupId }, { fetchPolicy: 'cache-and-network' }).members;

//     if (members.length <= 0) {
//         return [];
//     }

//     if ('@all'.startsWith(activeWord.toLowerCase())) {
//         res.push({ __typename: 'AllMention' });
//     }

//     res.push(...searchMentions(activeWord, members).map(v => v.user));

//     return res;
// };

const Suggestion = React.memo((props: { mention: MentionToSend, onPress: () => void }) => {
    const theme = React.useContext(ThemeContext);
    const { mention, onPress } = props;

    return (
        <ZListItemBase
            onPress={onPress}
            separator={false}
            height={40}
            underlayColor={theme.backgroundTertiaryTrans}
        >
            <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                <View paddingHorizontal={16} height={40} alignItems="center" justifyContent="center">
                    {mention.__typename === 'User' && (
                        <ZAvatar
                            src={mention.photo}
                            size="x-small"
                            placeholderKey={mention.id}
                            placeholderTitle={mention.name}
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <View alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image source={require('assets/ic-channel-24.png')} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
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
    );
});

interface MentionsSuggestionsProps {
    activeWord: string;
    groupId: string;

    onMentionPress: (word: string | undefined, mention: MentionToSend) => void;
}

export const MentionsSuggestions = React.memo((props: MentionsSuggestionsProps) => {
    const client = getClient();
    const { activeWord, groupId, onMentionPress } = props;
    const [items, setItems] = React.useState<MentionToSend[]>([]);
    const [cursor, setCursor] = React.useState<string | undefined>(undefined);
    const lastQuery = React.useRef<string>();

    const handleOnPress = React.useCallback((mention: MentionToSend) => {
        onMentionPress(activeWord, mention);
    }, [activeWord, onMentionPress]);

    const handleLoad = React.useCallback(async (fromStart: boolean) => {
        const lastq = lastQuery.current;
        const loaded: MentionToSend[] = [];
        const { edges, pageInfo } = (await client.queryChatMembersSearch({
            cid: groupId,
            query: lastQuery.current,
            first: 20,
            after: fromStart ? undefined : cursor,
        })).members;

        if (lastq !== lastQuery.current) {
            return;
        }

        if (pageInfo.hasNextPage) {
            setCursor(edges[edges.length - 1].cursor);
        } else {
            setCursor(undefined);
        }

        if (edges.length) {
            if ('@all'.startsWith(activeWord.toLowerCase())) {
                loaded.push({ __typename: 'AllMention' });
            }

            edges.map(edge => {
                loaded.push(edge.user as UserForMention);
            });
        }

        if (fromStart) {
            setItems(loaded);
        } else {
            setItems(current => [...current, ...loaded]);
        }
    }, [cursor]);

    const handleLoadMore = React.useCallback(() => {
        handleLoad(false);
    }, []);

    React.useEffect(() => {
        (async () => {
            handleLoad(true);
        })();
    }, [activeWord, cursor]);

    if (activeWord !== lastQuery.current) {
        lastQuery.current = activeWord;
    }

    if (items.length <= 0) {
        return null;
    }

    return (
        <FlatList
            data={items}
            renderItem={({ item }) => <Suggestion mention={item} onPress={() => handleOnPress(item)} />}
            keyExtractor={(item, index) => item.__typename === 'AllMention' ? `${index}-all` : `${index}-${item.id}`}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="always"
            maxHeight={188}
            legacyImplementation={true}
            ListHeaderComponent={<View height={8} />}
            ListFooterComponent={<View height={8} />}
            onEndReached={handleLoadMore}
        />
    );
});
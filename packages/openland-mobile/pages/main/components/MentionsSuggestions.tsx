import * as React from 'react';
import { View, Image, FlatList } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { SuggestionsItemName } from './Suggestions';

interface SuggestionProps {
    mention: MentionToSend;
    onPress: () => void;
}

const Suggestion = React.memo((props: SuggestionProps) => {
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
                    {(mention.__typename === 'User' || mention.__typename === 'Organization') && (
                        <ZAvatar
                            src={mention.photo}
                            size="x-small"
                            placeholderKey={mention.id}
                            placeholderTitle={mention.name}
                        />
                    )}
                    {mention.__typename === 'SharedRoom' && (
                        <ZAvatar
                            src={mention.roomPhoto}
                            size="x-small"
                            placeholderKey={mention.id}
                            placeholderTitle={mention.title}
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
                    {mention.__typename === 'Organization' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.name}
                            description={mention.isCommunity ? 'Community' : 'Organization'}
                        />
                    )}
                    {mention.__typename === 'SharedRoom' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.title}
                            description="Group"
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

const Divider = React.memo(() => {
    return <View height={40} backgroundColor="green" />;
});

type Divider = { __typename: 'GlobalDivider' };
type ListItem = MentionToSend | Divider;

interface MentionsSuggestionsProps {
    activeWord: string;
    groupId: string;

    onMentionPress: (word: string | undefined, mention: MentionToSend) => void;
}

export const MentionsSuggestions = React.memo((props: MentionsSuggestionsProps) => {
    const client = getClient();
    const { activeWord, groupId, onMentionPress } = props;
    const [localItems, setLocalItems] = React.useState<ListItem[]>([]);
    const [globalItems, setGlobalItems] = React.useState<ListItem[]>([]);
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [loadingPagination, setLoadingPagination] = React.useState(false);
    const [loadingQuery, setLoadingQuery] = React.useState(false);
    const lastQuery = React.useRef<string>();

    const handleOnPress = React.useCallback((mention: MentionToSend) => {
        onMentionPress(activeWord, mention);
    }, [activeWord, onMentionPress]);

    const handleReset = React.useCallback(async () => {
        if (typeof lastQuery.current === 'undefined') {
            return;
        }

        setLoadingQuery(true);

        const lastq = lastQuery.current;
        const data = (await client.queryChatMentionSearch({
            cid: groupId,
            query: lastQuery.current.substr(1),
            first: 20,
            after: cursor,
        })).mentions;

        if (lastq !== lastQuery.current) {
            return;
        }

        setCursor(data.cursor);

        setLocalItems(data.localItems);
        setGlobalItems(data.globalItems);

        setLoadingQuery(false);
    }, [activeWord]);

    const handleLoadMore = React.useCallback(async () => {
        if (!cursor || typeof lastQuery.current === 'undefined' || loadingPagination) {
            return;
        }

        setLoadingPagination(true);

        const lastq = lastQuery.current;
        const data = (await client.queryChatMentionSearch({
            cid: groupId,
            query: lastQuery.current.substr(1),
            first: 20,
            after: cursor,
        })).mentions;

        if (lastq !== lastQuery.current) {
            return;
        }

        setCursor(data.cursor);

        setLocalItems(current => [...current, ...data.localItems]);
        setGlobalItems(current => [...current, ...data.globalItems]);

        setLoadingPagination(false);
    }, [activeWord]);

    React.useEffect(() => {
        (async () => {
            handleReset();
        })();
    }, [activeWord]);

    if (activeWord !== lastQuery.current) {
        lastQuery.current = activeWord;
    }

    if (localItems.length <= 0 && globalItems.length <= 0 && !loadingPagination && !loadingQuery) {
        return null;
    }

    const items = [...localItems, ...(globalItems.length > 0 ? [{ __typename: 'GlobalDivider' } as Divider, ...globalItems] : [])];

    if ('@all'.startsWith(activeWord.toLowerCase())) {
        items.unshift({ __typename: 'AllMention' });
    }

    return (
        <FlatList
            data={items}
            renderItem={({ item }) => item.__typename === 'GlobalDivider' ? <Divider /> : <Suggestion mention={item} onPress={() => handleOnPress(item)} />}
            keyExtractor={(item, index) => item.__typename === 'GlobalDivider' ? `${index}-divider` : item.__typename === 'AllMention' ? `${index}-all` : `${index}-${item.id}`}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="always"
            maxHeight={188}
            legacyImplementation={true}
            ListHeaderComponent={< View height={8} />}
            ListFooterComponent={
                <>
                    {loadingQuery && <View height={40} backgroundColor="blue" />}
                    {loadingPagination && <View height={40} backgroundColor="red" />}
                    <View height={8} />
                </>
            }
            onEndReached={() => handleLoadMore()}
        />
    );
});
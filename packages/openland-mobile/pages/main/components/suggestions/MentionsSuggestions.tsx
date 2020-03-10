import * as React from 'react';
import { View, FlatList } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { MentionsDividerType, MentionsDivider, MentionsDividerView } from './MentionsDivider';
import { MentionView } from './MentionView';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionsPlaceholder, MentionsPlaceholderType, MentionsPlaceholderView } from './MentionsPlaceholder';

interface MentionsSuggestionsProps {
    activeWord: string;
    groupId: string;
    isChannel: boolean;
    isPrivate?: boolean;
    onMentionPress: (word: string | undefined, mention: MentionToSend) => void;
}

export const MentionsSuggestions = React.memo((props: MentionsSuggestionsProps) => {
    const client = getClient();
    const theme = React.useContext(ThemeContext);
    const { activeWord, groupId, isChannel, onMentionPress } = props;
    const [localItems, setLocalItems] = React.useState<MentionToSend[]>([]);
    const [globalItems, setGlobalItems] = React.useState<MentionToSend[]>([]);
    const [loadingPagination, setLoadingPagination] = React.useState(false);
    const [loadingQuery, setLoadingQuery] = React.useState(false);
    const lastQuery = React.useRef<string>();
    const lastCursor = React.useRef<string | null>(null);
    const listRef = React.useRef<FlatList<MentionToSend | MentionsDividerType>>(null);

    const handleOnPress = React.useCallback((mention: MentionToSend) => {
        onMentionPress(activeWord, mention);
    }, [activeWord, onMentionPress]);

    const handleReload = React.useCallback(async () => {
        if (typeof lastQuery.current === 'undefined') {
            return;
        }

        setLoadingQuery(true);

        const lastq = lastQuery.current;
        const lastc = lastCursor.current;
        const data = (await client.queryChatMentionSearch({
            cid: groupId,
            query: lastQuery.current.substr(1),
            first: 20,
        })).mentions;

        if (lastq !== lastQuery.current || lastc !== lastCursor.current) {
            return;
        }

        lastCursor.current = data.cursor;

        const items: MentionToSend[] = data.localItems;

        if ('@all'.startsWith(activeWord.toLowerCase())) {
            items.unshift({ __typename: 'AllMention' });
        }

        setLocalItems(items);
        setGlobalItems(data.globalItems);

        setLoadingQuery(false);
        setLoadingPagination(false);

        if (listRef.current) {
            listRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    }, [activeWord]);

    const handleLoadMore = React.useCallback(async () => {
        if (!lastCursor.current || typeof lastQuery.current === 'undefined' || loadingPagination) {
            return;
        }

        setLoadingPagination(true);

        const lastq = lastQuery.current;
        const lastc = lastCursor.current;
        const data = (await client.queryChatMentionSearch({
            cid: groupId,
            query: lastQuery.current.substr(1),
            first: 10,
            after: lastCursor.current,
        })).mentions;

        if (lastq !== lastQuery.current || lastc !== lastCursor.current) {
            return;
        }

        lastCursor.current = data.cursor;

        setLocalItems(current => [...current, ...data.localItems]);
        setGlobalItems(current => [...current, ...data.globalItems]);

        setLoadingPagination(false);
    }, [activeWord]);

    React.useEffect(() => {
        (async () => {
            handleReload();
        })();
    }, [activeWord]);

    if (activeWord !== lastQuery.current) {
        lastQuery.current = activeWord;
    }

    if (localItems.length <= 0 && globalItems.length <= 0 && !loadingPagination && !loadingQuery) {
        return null;
    }

    const mergedItems: (MentionToSend | MentionsDividerType | MentionsPlaceholderType)[] = props.isPrivate 
        ? globalItems.length === 0 && activeWord === '@' ? [MentionsPlaceholder] : globalItems
        : [...localItems, ...(globalItems.length > 0 ? [MentionsDivider, ...globalItems] : [])];
    return (
        <View>
            <FlatList
                ref={listRef}
                data={mergedItems}
                renderItem={({ item }) => item.__typename === 'GlobalDivider' 
                    ? <MentionsDividerView />
                    : item.__typename === 'MentionsPlaceholder' ? <MentionsPlaceholderView />
                    : <MentionView mention={item} onPress={() => handleOnPress(item)} isChannel={isChannel} />}
                keyExtractor={(item, index) => item.__typename === 'GlobalDivider'  ? `${index}-divider` 
                    : item.__typename === 'AllMention' ? `${index}-all` 
                    : item.__typename === 'MentionsPlaceholder' ? `${index}-placeholder`
                    : `${index}-${item.id}`}
                alwaysBounceVertical={false}
                keyboardShouldPersistTaps="always"
                maxHeight={188}
                legacyImplementation={true}
                ListHeaderComponent={
                    <>
                        {mergedItems.length > 0 && <View height={8} />}
                    </>
                }
                ListFooterComponent={
                    <>
                        {loadingPagination && (
                            <View alignItems="center" justifyContent="center" height={40}>
                                <ZLoader size="small" />
                            </View>
                        )}
                        {mergedItems.length > 0 && <View height={8} />}
                    </>
                }
                onEndReached={() => handleLoadMore()}
            />
            {loadingQuery && mergedItems.length > 0 && mergedItems[0].__typename !== 'MentionsPlaceholder' && (
                <View position="absolute" top={16} right={16} alignItems="center" justifyContent="center" width={24} height={24} borderRadius={RadiusStyles.Medium} backgroundColor={theme.backgroundPrimary}>
                    <ZLoader size="small" />
                </View>
            )}
        </View>
    );
});
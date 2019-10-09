import * as React from 'react';
import { SHeader } from 'react-native-s/SHeader';
import { View, StyleSheet, ViewStyle, ImageStyle, Image, TextInput, TextStyle, ScrollView } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { GlobalSearchEntryKind, UserShort } from 'openland-api/Types';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';

const styles = StyleSheet.create({
    searchBox: {
        marginTop: 8,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: RadiusStyles.Large,
        flexDirection: 'row',
        height: 36,
        alignItems: 'center',
    } as ViewStyle,
    searchIcon: {
        width: 16,
        height: 16,
        marginLeft: 12,
        marginRight: 8
    } as ImageStyle,
    searchInput: {
        fontSize: 17,
        height: 24,
        flexGrow: 1,
        flexBasis: 0,
    } as TextStyle
});

interface SearchListProps {
    query: string;
    onSelect: (userId: string) => void;
}

const SearchList = React.memo((props: SearchListProps) => {
    const { query, onSelect } = props;
    const followers = getClient().useGlobalSearch({ query, kinds: [GlobalSearchEntryKind.USER] }, { fetchPolicy: 'cache-and-network' }).items as UserShort[];

    return (
        <>
            {followers.map(follower => (
                <View key={follower.id}>
                    <ZListItem
                        text={follower.name}
                        leftAvatar={{ photo: follower.photo, key: follower.id, title: follower.name }}
                        onPress={() => onSelect(follower.id)}
                    />
                </View>
            ))}
        </>
    );
});

const FeedChannelAddWriterComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id, action } = router.params;
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const [query, setQuery] = React.useState('');

    const handleSelect = React.useCallback(async (userId: string) => {
        await FeedHandlers.ChannelAddEditor(id, userId);

        if (action) {
            action();
        }

        router.back();
    }, [action]);

    return (
        <>
            <SHeader title="Add writer" />
            <View height="100%" paddingTop={area.top}>
                <View style={[styles.searchBox, { backgroundColor: theme.backgroundTertiaryTrans }]}>
                    <Image source={require('assets/ic-search-16.png')} style={[styles.searchIcon, { tintColor: theme.foregroundTertiary }]} />
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        autoFocus={true}
                        style={[styles.searchInput, { color: theme.foregroundPrimary }]}
                        placeholder="Search"
                        placeholderTextColor={theme.foregroundTertiary}
                        keyboardAppearance={theme.keyboardAppearance}
                        selectionColor={theme.accentPrimary}
                        allowFontScaling={false}
                    />
                </View>
                <ScrollView flexGrow={1} keyboardShouldPersistTaps="always" keyboardDismissMode="interactive" contentContainerStyle={{ paddingBottom: area.bottom }}>
                    <React.Suspense fallback={<ZLoader />}>
                        <SearchList query={query} onSelect={handleSelect} />
                    </React.Suspense>
                </ScrollView>
            </View>
        </>
    );
});

export const FeedChannelAddWriter = withApp(FeedChannelAddWriterComponent, { navigationAppearance: 'small' });
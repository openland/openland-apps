import * as React from 'react';
import { SHeader } from 'react-native-s/SHeader';
import { View, StyleSheet, ViewStyle, ImageStyle, Image, TextInput, TextStyle, ScrollView, Platform } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { RadiusStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { FeedChannelSubscriberRole } from 'openland-api/Types';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { hexToRgba } from 'openland-y-utils/hexToRgba';

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
    id: string;
    query: string;
    onSelect: (userId: string) => void;
}

const SearchList = React.memo((props: SearchListProps) => {
    const { id, query, onSelect } = props;
    const followers = getClient().useFeedChannelSubscribers({ channelId: id, query, first: 30 }, { fetchPolicy: 'cache-and-network' }).subscribers.edges;

    return (
        <>
            {followers.map(follower => {
                const { user, role } = follower.node;
                const isWriter = role === FeedChannelSubscriberRole.Creator || role === FeedChannelSubscriberRole.Editor;

                return (
                    <View key={user.id} opacity={isWriter ? HighlightAlpha : undefined}>
                        <ZListItem
                            text={user.name}
                            leftAvatar={{ photo: user.photo, key: user.id, title: user.name }}
                            onPress={!isWriter ? () => onSelect(user.id) : undefined}
                        />
                    </View>
                );
            })}
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
                        selectionColor={Platform.OS === 'android' ? hexToRgba(theme.accentPrimary, HighlightAlpha) : theme.accentPrimary}
                        allowFontScaling={false}
                    />
                </View>
                <ScrollView flexGrow={1} keyboardShouldPersistTaps="always" keyboardDismissMode="interactive" contentContainerStyle={{ paddingBottom: area.bottom }}>
                    <React.Suspense fallback={<ZLoader />}>
                        <SearchList id={id} query={query} onSelect={handleSelect} />
                    </React.Suspense>
                </ScrollView>
            </View>
        </>
    );
});

export const FeedChannelAddWriter = withApp(FeedChannelAddWriterComponent, { navigationAppearance: 'small' });
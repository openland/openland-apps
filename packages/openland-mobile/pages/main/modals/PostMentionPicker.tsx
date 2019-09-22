import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { View, StyleSheet, ViewStyle, ImageStyle, Image, TextInput, TextStyle, ScrollView } from 'react-native';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { SlideInputLocalAttachment } from 'openland-engines/feed/types';

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
    onSelect: (item: SlideInputLocalAttachment) => void;
    selected?: string;
}

const SearchList = XMemo<SearchListProps>((props) => {
    const { query, onSelect, selected } = props;
    const items = getClient().useGlobalSearch({ query: query }, { fetchPolicy: 'cache-and-network' }).items;

    return (
        <>
            {items.map(item => (
                <ZListItem
                    key={item.id}
                    title={item.id}
                    description={item.id === selected ? 'Selected' : undefined}
                    onPress={() => onSelect(item)}
                />
            ))}
        </>
    );
});

const PostMentionPickerComponent = XMemo<PageProps>((props) => {
    const { router } = props;
    const { action, selected } = router.params;
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const [query, setQuery] = React.useState('');

    const handleSelect = React.useCallback((item: SlideInputLocalAttachment) => {
        action(item);

        router.back();
    }, []);

    return (
        <>
            <SHeader title="Mention" />
            <View height="100%" paddingTop={area.top}>
                <View style={[styles.searchBox, { backgroundColor: theme.backgroundTertiary }]}>
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
                        <SearchList query={query} onSelect={handleSelect} selected={selected} />
                    </React.Suspense>
                </ScrollView>
            </View>
        </>
    );
});

export const PostMentionPicker = withApp(PostMentionPickerComponent, { navigationAppearance: 'small' });
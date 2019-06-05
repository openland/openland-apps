import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity, AsyncStorage, SafeAreaView } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SRouter } from 'react-native-s/SRouter';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SuggestedChats as SuggestedChatsPage } from './SuggestedChats';
import LinearGradient from 'react-native-linear-gradient';
import { Alert } from 'openland-mobile/components/AlertBlanket';

export type Tag = { id: string, title: string };
export type TagGroup = { id: string, title?: string | null, subtitle?: string | null, tags: Tag[] };

let discoverDone = false;
let userPickedTags: string[] = [];
export const isDiscoverDone = () => {
    return discoverDone;
}

export const getDiscoverSelectedTags = () => {
    return userPickedTags;
}

export const setDiscoverDone = async (tagIds: string[]) => {
    await AsyncStorage.setItem('discover_done', 'done');
    await AsyncStorage.setItem('discover_picked_tags', JSON.stringify(tagIds));
    userPickedTags = tagIds;
    discoverDone = true;
}

export const prepareDiscoverStatus = async () => {
    discoverDone = (await AsyncStorage.getItem('discover_done')) === 'done';
    let suggestedChatsStr = await AsyncStorage.getItem('discover_picked_tags');
    if (suggestedChatsStr) {
        try {
            let suggestedChatsRaw = JSON.parse(suggestedChatsStr);
            if (Array.isArray(suggestedChatsRaw) && typeof suggestedChatsRaw[0] === 'string') {
                userPickedTags = suggestedChatsRaw;
            }
        } catch (e) {
            console.warn(e)
        }
    }

}

const TagButton = (props: { tag: Tag, selected: boolean, onPress: (tag: Tag) => void }) => {
    let style: 'fill' | 'border' = 'border' as any;

    let theme = React.useContext(ThemeContext);
    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag])
    return <TouchableOpacity onPress={callback} activeOpacity={0.6}>

        <View
            style={{
                marginRight: 10,
                marginBottom: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 12,
                borderWidth: 2,

                backgroundColor: props.tag.id === 'button_more' ? undefined : props.selected ? (style === 'fill' ? theme.accentColor : theme.accentBackgroundColor) : theme.accentBackgroundColor,
                borderColor: props.selected ? theme.accentColor : theme.accentBackgroundColor
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: TextStyles.weight.medium,
                    color: props.selected ? (style === 'fill' ? theme.textInverseColor : theme.accentColor) : theme.accentColor
                }}
            >
                {props.tag.title}
            </Text>
        </View >
    </TouchableOpacity>
}

const TagsCloud = (props: { tagsGroup: TagGroup, selected: Set<string>, onSelectedChange: (selected: Set<string>) => void }) => {

    let [showAll, setShowAll] = React.useState(false);

    let onShowAll = React.useCallback(() => {
        setShowAll(!showAll);
    }, [showAll])

    let onTagPress = (tag: Tag) => {
        let selected = props.selected.has(tag.id);

        if (selected) {
            props.selected.delete(tag.id);
        } else {
            props.selected.add(tag.id);
        }
        props.onSelectedChange(props.selected);
    }

    return (
        <View flexDirection="column">
            <View height={15} />
            {/* {props.tagsGroup.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.textColor }}>{props.tagsGroup.title}</Text>} */}
            <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                {props.tagsGroup.tags.filter((t, i) => showAll || i < 17).map(tag => (
                    <TagButton tag={tag} onPress={onTagPress} selected={props.selected.has(tag.id)} />
                ))}
                {props.tagsGroup.tags.length > 17 && !showAll && <TagButton tag={{ title: showAll ? 'Less' : 'More', id: 'button_more', score: 0 }} onPress={onShowAll} selected={false} />}
            </View>
            {/* {sub} */}
        </View>
    )
}

const TagsGroupPage = (props: { group: TagGroup, selected: Set<string>, exclude: Set<string>, router: SRouter }) => {
    let [selected, setCurretnSelected] = React.useState(props.selected);
    let onSelectedChange = React.useCallback((s: Set<string>) => {
        setCurretnSelected(new Set(s));
    }, []);

    let theme = React.useContext(ThemeContext);

    let disabled = !selected.size && props.exclude.size <= 1;
    let next = React.useCallback(() => {
        if (disabled) {
            return;
        }
        (async () => {
            let nextPath = 'Discover';

            let params: any = { selected, exclude: new Set(props.exclude) };

            props.router.push(nextPath, params);
        })();
    }, [selected, disabled]);

    let { title, subtitle } = props.group;

    return (
        <>
            {title && Platform.OS === 'ios' && <SHeader title={title} />}
            {title && Platform.OS === 'android' && <CenteredHeader title={title} padding={98} />}
            {/* <SHeaderButton title={'Next'} onPress={next} /> */}
            <SScrollView paddingHorizontal={18} justifyContent="flex-start" alignContent="center">
                {subtitle && <Text style={{ fontSize: 20, paddingBottom: 16, paddingLeft: 18, backgroundColor: theme.headerColor, color: theme.textColor, marginLeft: -18, marginRight: -18 }}>{subtitle}</Text>}
                <TagsCloud tagsGroup={props.group} selected={selected} onSelectedChange={onSelectedChange} />
                <View height={120} />
            </SScrollView>
            <LinearGradient colors={[theme.transparent, theme.backgroundColor, theme.backgroundColor]} height={160} position="absolute" bottom={0} width="100%" justifyContent="center" alignItems="center" pointerEvents="none" />

            <ASSafeAreaContext.Consumer>
                {sa => (
                    <View alignContent="center" justifyContent="center" alignSelf="center" bottom={sa.bottom + 48}>
                        <ZRoundedButton size="large" title="  Next  " style="default" enabled={!disabled} onPress={next} />
                    </View>
                )}
            </ASSafeAreaContext.Consumer>

        </>
    );
};

const DiscoverComponent = (props: PageProps) => {
    let exclude = props.router.params.exclude || new Set<string>();
    let selected = props.router.params.selected || new Set<string>();
    let currentPage = getClient().useDiscoverNextPage({ selectedTagsIds: [...selected.values()], excudedGroupsIds: [...exclude.values()] }, { fetchPolicy: 'network-only' });

    if (currentPage.betaNextDiscoverPage) {
        if (currentPage.betaNextDiscoverPage.chats) {
            return <SuggestedChatsPage chats={currentPage.betaNextDiscoverPage.chats} router={props.router} selectedTagIds={[...selected.values()]} />
        } else if (currentPage.betaNextDiscoverPage.tagGroup) {
            exclude.add(currentPage.betaNextDiscoverPage.tagGroup.id);
            return < TagsGroupPage group={currentPage.betaNextDiscoverPage.tagGroup} exclude={exclude} selected={selected} router={props.router} />
        }
    }
    return <ZLoader />
}

export const Discover = withApp(DiscoverComponent, { navigationAppearance: 'large', hideHairline: true });

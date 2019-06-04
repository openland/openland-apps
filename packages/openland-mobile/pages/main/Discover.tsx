import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { Tag, TagGroup, Page, DiscoverApi } from 'openland-mobile/pages/main/discoverData';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { useThemeGlobal, ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SRouter } from 'react-native-s/SRouter';

let discoverDone = false;
export const isDiscoverDone = () => {
    return discoverDone;
}
export const setDiscoverDone = async (done: boolean) => {
    await AsyncStorage.setItem('discover_done', 'done');
    discoverDone = done;
}

export const prepareDiscoverStatus = async () => {
    discoverDone = (await AsyncStorage.getItem('discover_done')) === 'done';
}

const TagButton = (props: { tag: Tag, selected: boolean, onPress: (tag: Tag) => void }) => {
    let theme = React.useContext(ThemeContext);
    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag])
    return <TouchableOpacity onPress={callback} activeOpacity={0.6}>
        <View style={{ marginRight: 10, marginBottom: 12, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: props.selected ? theme.accentColor : theme.accentBackgroundColor, borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, color: props.selected ? theme.textInverseColor : theme.accentColor }}>
                {props.tag.title}
            </Text>
        </View >
    </TouchableOpacity>
}

const TagsCloud = (props: { tagsGroup: TagGroup, model: Page, selected: Set<string>, onSelectedChange: (selected: Set<string>) => void }) => {
    let theme = useThemeGlobal();

    let onTagPress = (tag: Tag) => {
        let tags = [tag];
        let t = tags.pop();

        let selected = props.selected.has(tag.id);

        // clear nested tags
        while (t) {
            for (let group of props.model.groups) {
                for (let connection of props.model.tagToGroupModel) {
                    if (connection.groupId === group.id && connection.tagId === t.id) {
                        tags.push(...(group.tags));
                        tags.map(tg => props.selected.delete(tg.id));
                    }
                }
            }
            t = tags.pop();
        }

        if (selected) {
            props.selected.delete(tag.id);
        } else {
            props.selected.add(tag.id);
        }
        props.onSelectedChange(props.selected);
    }

    let sub = [];
    for (let tag of props.tagsGroup.tags) {
        if (props.selected.has(tag.id)) {
            for (let connection of props.model.tagToGroupModel) {
                for (let group of props.model.groups) {
                    if (group.id === connection.groupId && connection.tagId === tag.id) {
                        sub.push(<TagsCloud tagsGroup={group} model={props.model} selected={props.selected} onSelectedChange={props.onSelectedChange} />)
                    }
                }
            }
        }
    }

    return (
        <View flexDirection="column">
            <View height={15} />
            {props.tagsGroup.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.textColor }}>{props.tagsGroup.title}</Text>}
            <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                {props.tagsGroup.tags.map(tag => (
                    <TagButton tag={tag} onPress={onTagPress} selected={props.selected.has(tag.id)} />
                ))}
            </View>
            {sub}
        </View>
    )
}

const DiscoverPage = (props: { page: Page, lastSelected: string[], router: SRouter }) => {
    let [selected, setCurretnSelected] = React.useState(new Set<string>());
    let onSelectedChange = React.useCallback((s: Set<string>) => {
        setCurretnSelected(new Set(s));
    }, []);

    let theme = React.useContext(ThemeContext);

    let next = React.useCallback(() => {
        if (!selected.size && !props.lastSelected.length) {
            return;
        }
        (async () => {
            let nextPath = 'Discover';

            let allSelected = new Set([...[...selected.values()], ...[...props.lastSelected.values()]]);
            let params: any = { lastSelected: [...selected.values()], allSelected: [...allSelected.values()] };

            props.router.push(nextPath, params);
        })();
    }, [selected]);

    let { title, subtitle, groups } = props.page;
    let groupsComp = [];
    for (let gid of props.page!.rootGroups) {
        for (let g of groups) {
            if (gid === g.id) {
                groupsComp.push(<TagsCloud tagsGroup={g} model={props.page} selected={selected} onSelectedChange={onSelectedChange} />);
            }
        }
    }
    return (
        <>
            {title && Platform.OS === 'ios' && <SHeader title={title} />}
            {title && Platform.OS === 'android' && <CenteredHeader title={title} padding={98} />}
            <SHeaderButton title={'Next'} onPress={next} />
            <SScrollView paddingHorizontal={18} justifyContent="flex-start" alignContent="center">
                <Text>{JSON.stringify(props.lastSelected, undefined, 2)}</Text>
                {subtitle && <Text style={{ fontSize: 16, marginBottom: 20, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{subtitle}</Text>}
                {groupsComp}
            </SScrollView>
        </>
    );
};

const SuggestedChats = (props: { chatIds: string[], lastSelected: string[] }) => {
    return <>
        {Platform.OS === 'ios' && <SHeader title={"Chats for you"} />}
        {Platform.OS === 'android' && <CenteredHeader title={"Chats for you"} padding={98} />}
        <SScrollView paddingHorizontal={18} justifyContent="flex-start" alignContent="center">
            <Text>{JSON.stringify(props.chatIds, undefined, 2)}</Text>
            <Text>{JSON.stringify(props.lastSelected, undefined, 2)}</Text>
        </SScrollView>
    </>
}

const DiscoverComponent = (props: PageProps) => {
    let lastSelected = props.router.params.lastSelected || [];
    let allSelected = props.router.params.allSelected || [];
    let currentPage = new DiscoverApi().next(lastSelected, allSelected);

    if (currentPage.chatIds) {
        return <SuggestedChats chatIds={currentPage.chatIds} lastSelected={lastSelected} />
    } else if (currentPage.page) {
        return < DiscoverPage page={currentPage.page} lastSelected={allSelected} router={props.router} />
    }

    return <ZLoader />
}

export const DiscoverHome = withApp(DiscoverComponent, { navigationAppearance: 'large', hideHairline: true });
export const Discover = withApp(DiscoverComponent, { navigationAppearance: 'large', hideHairline: true });

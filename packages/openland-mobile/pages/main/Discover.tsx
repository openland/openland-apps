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
import { delay } from 'openland-y-utils/timer';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';

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

const TagButton = (props: { tag: TagEx, selected: boolean, onPress: (tag: TagEx) => void }) => {
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

const TagsCloud = (props: { tagsGroup: TagGroupEx, treeTagToGroupModel: { tagId: string, groupId: string }[] }) => {
    let theme = useThemeGlobal();
    let [dumb, update] = React.useState({});

    let onTagPress = (tag: TagEx) => {
        tag.selected = !tag.selected;
        update({});
    }

    let sub = []
    for (let t of props.tagsGroup.tags) {
        if (t.selected && t.group) {
            sub.push(<TagsCloud tagsGroup={t.group! as TagGroupEx} />)
        }
    }

    return (
        <View flexDirection="column">
            <View height={15} />
            {props.tagsGroup.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.textColor }}>{props.tagsGroup.title}</Text>}
            <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                {props.tagsGroup.tags.map(tag => (
                    <TagButton tag={tag} onPress={onTagPress} selected={!!tag.selected} />
                ))}
            </View>
            {sub}
        </View>
    )
}

interface TagEx extends Tag {
    se: any;
    selected?: boolean;
}

interface TagGroupEx extends TagGroup {
    tags: TagEx[];
}
const DiscoverPage = (props: PageProps) => {

    let theme = React.useContext(ThemeContext);

    let prevSelected = props.router.params.selected;
    let currentPage = new DiscoverApi().next(prevSelected);

    // let onSelectChange = React.useCallback((t: Tag) => {
    //     if (prevSelected.has(t)) {
    //         prevSelected.delete(t);
    //         // getSubTags(t).map(tg => selected.delete(tg));
    //     } else {
    //         selectedMutable.add(t);
    //     }
    //     setSelected(new Set(selectedMutable));
    // }, [])

    let next = React.useCallback(() => {
        (async () => {
            startLoader()
            let nextPath = 'Discover';
            let params: any = { selected: prevSelected };

            await delay(1000)

            let currentSelected = new Set<string>();
            if (currentPage.page) {
                let tags: TagEx[] = []
                for (let group of [...(currentPage.page ? currentPage.page.groups : [])]) {
                    tags.push(...group.tags);
                }
                let tag = tags.pop();
                while (tag) {
                    if (tag.selected) {
                        currentSelected.add(tag.id);
                        tags.push(...(tag.group ? tag.group.tags : []));
                    }
                }
            }

            let nextPageRes = new DiscoverApi().next([...currentSelected.values()]);

            // if (depth < path.length) {
            //     nextPage = 'Discover';
            //     paprams = { selected: selectedMutable, path, depth: depth + 1 };
            // } else {
            //     for (let s of selected) {
            //         if (!path.includes(s.title) && havePageForTag(s.title)) {
            //             nextPage = 'Discover';
            //             path = path.filter(t => t !== s.title);
            //             path.push(s.title);

            //             paprams = { selected: selectedMutable, path, depth: depth + 1 };
            //             break;
            //         }
            //     }
            // }
            if (nextPageRes.page) {
                // just move next
            } else if (nextPageRes.chatIds) {
                nextPath = 'SuggestedGroups';
                params = { ids: currentPage.chatIds };
            }
            stopLoader()
            props.router.push(nextPath, params);
        })();
    }, []);
    if (currentPage.chatIds) {
        let paprams: any = { ids: currentPage.chatIds };
        props.router.push('SuggestedGroups', paprams);
        return <ZLoader />
    } else if (currentPage.page) {
        let { title, subtitle, groups, treeTagToGroupModel } = currentPage.page;
        let rootGroups = groups.filter()
        return (
            <>
                {title && Platform.OS === 'ios' && <SHeader title={title} />}
                {title && Platform.OS === 'android' && <CenteredHeader title={title} padding={98} />}
                <SHeaderButton title={'Next'} onPress={next} />
                <SScrollView paddingHorizontal={18} justifyContent="flex-start" alignContent="center">
                    <Text>{JSON.stringify(groups)}</Text>
                    {subtitle && <Text style={{ fontSize: 16, marginBottom: 20, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{subtitle}</Text>}
                    {groups.map(tg => (
                        <TagsCloud tagsGroup={tg as TagGroupEx} treeTagToGroupModel={treeTagToGroupModel} />
                    ))}
                </SScrollView>
            </>
        );
    }

    return <ZLoader />
};

export const DiscoverHome = withApp(DiscoverPage, { navigationAppearance: 'large', hideHairline: true });
export const Discover = withApp(DiscoverPage, { navigationAppearance: 'large', hideHairline: true });

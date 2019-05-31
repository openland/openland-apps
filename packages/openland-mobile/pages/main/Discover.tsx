import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { Tag, getPageForTag, getSubTags, havePageForTag, getSubTagGroup, TagGroup } from 'openland-mobile/pages/main/discoverData';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { useThemeGlobal, ThemeContext } from 'openland-mobile/themes/ThemeContext';

let discoverDone = false;
export const isDiscoverDone = () => {
    return discoverDone && false;
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
                {props.tag.name}
            </Text>
        </View >
    </TouchableOpacity>
}

const TagsCloud = (props: { tagsGroups: TagGroup, selected: Set<Tag>, onChange: (tag: Tag) => void }) => {
    let theme = useThemeGlobal();
    let selected = props.selected;

    let sub = []
    for (let t of props.tagsGroups.tags) {
        if (selected.has(t) && getSubTagGroup(t.name)) {
            sub.push(<TagsCloud tagsGroups={getSubTagGroup(t.name)!} selected={selected} onChange={props.onChange} />)
        }
    }

    return (
        <View flexDirection="column">
            <View height={15} />
            {props.tagsGroups.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.textColor }}>{props.tagsGroups.title}</Text>}
            <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                {props.tagsGroups.tags.map(tag => (
                    <TagButton tag={tag} onPress={props.onChange} selected={!![...selected.values()].find(v => v.name === tag.name)} />
                ))}
            </View>
            {sub}
        </View>
    )
}

const DiscoverPage = (props: PageProps) => {
    let theme = React.useContext(ThemeContext);
    let path = (props.router.params.path || []) as string[];
    let depth = props.router.params.depth || 0;
    let tag = path[depth - 1];
    let page = getPageForTag(tag || 'root');
    let [selected, setSelected] = React.useState(props.router.params.selected as Set<Tag> || new Set<Tag>());
    let [selectedMutable] = React.useState(props.router.params.selected as Set<Tag> || new Set<Tag>());
    let onSelectChange = React.useCallback((t: Tag) => {
        if (selectedMutable.has(t)) {
            selectedMutable.delete(t);
            getSubTags(t).map(tg => selectedMutable.delete(tg));
        } else {
            selectedMutable.add(t);
        }
        setSelected(new Set(selectedMutable));
    }, [])

    let next = React.useCallback(() => {
        let nextPage = 'SuggestedGroups';
        let paprams: any = { selected };

        if (depth < path.length) {
            nextPage = 'Discover';
            paprams = { selected: selectedMutable, path, depth: depth + 1 };
        } else {
            for (let s of selected) {
                if (!path.includes(s.name) && havePageForTag(s.name)) {
                    nextPage = 'Discover';
                    path = path.filter(t => t !== s.name);
                    path.push(s.name);

                    paprams = { selected: selectedMutable, path, depth: depth + 1 };
                    break;
                }
            }
        }

        props.router.push(nextPage, paprams);

    }, [selected]);
    let { title, subtitle, groups } = page;
    return (
        <>
            {title && Platform.OS === 'ios' && <SHeader title={title} />}
            {title && Platform.OS === 'android' && <CenteredHeader title={title} padding={98} />}
            <SHeaderButton title={'Next'} onPress={[...selected.values()].length ? next : undefined} />
            <SScrollView paddingHorizontal={18} justifyContent="flex-start" alignContent="center">
                {subtitle && <Text style={{ fontSize: 16, marginBottom: 20, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{subtitle}</Text>}
                {groups.map(tg => (
                    <TagsCloud selected={selected} onChange={onSelectChange} tagsGroups={tg} />
                ))}
            </SScrollView>
        </>
    );
};

export const DiscoverHome = withApp(DiscoverPage, { navigationAppearance: 'large', hideHairline: true });
export const Discover = withApp(DiscoverPage, { navigationAppearance: 'large', hideHairline: true });

import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SDeferred } from 'react-native-s/SDeferred';
import { SScrollView } from 'react-native-s/SScrollView';
import { Tag, getRootTags, resolveSuggestedChats, getTagGroup, tagsGroupsMap, getSubTags } from 'openland-mobile/pages/main/discoverData';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

let discoverDone = false;
export const isDiscoverDone = () => {
    return discoverDone
}
export const setDiscoverDone = async (done: boolean) => {
    await AsyncStorage.setItem('discover_done', 'done');
    discoverDone = done;
}

export const prepareDiscoverStatus = async () => {
    discoverDone = (await AsyncStorage.getItem('discover_done')) === 'done';
}

type tagColors = 'green' | 'blue' | 'purple';
const resolveStyle = (group: string): tagColors => {
    if (group === 'Industry') {
        return 'green';
    } else if (group === 'Goal') {
        return 'purple';
    }
    return 'blue';
}
const tagStyles: { [color in tagColors]: { textColor: string, backgroundColor: string, textColorSelected: string, backgroundColorSelected: string } } = {
    'green': {
        textColor: '#81d365',
        textColorSelected: '#fff',
        backgroundColor: '#ecf9e8',
        backgroundColorSelected: '#81d365',

    },
    'blue': {
        textColor: '#0084fe',
        textColorSelected: '#fff',
        backgroundColor: '#e5f2fe',
        backgroundColorSelected: '#0084fe',
    },
    'purple': {
        textColor: '#8f3fee',
        textColorSelected: '#fff',
        backgroundColor: '#f4ecfe',
        backgroundColorSelected: '#8f3fee',
    }
}

const TagButton = (props: { tag: Tag, selected: boolean, onPress: (tag: Tag) => void }) => {
    let style = tagStyles[resolveStyle(props.tag.group)];
    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag])
    return <TouchableOpacity onPress={callback} activeOpacity={0.6}>
        <View style={{ marginRight: 10, marginBottom: 12, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: props.selected ? style.backgroundColorSelected : style.backgroundColor, borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: TextStyles.weight.medium, color: props.selected ? style.textColorSelected : style.textColor }}>
                {props.tag.name}
            </Text>
        </View >
    </TouchableOpacity>
}

const TagsCloud = (props: { tagsGroups: { name: string, tags: Tag[] }, selected: Set<Tag>, onChange: (tag: Tag) => void }) => {
    let selected = props.selected;

    let sub = []
    for (let t of props.tagsGroups.tags) {
        if (selected.has(t) && tagsGroupsMap[t.name] && getTagGroup(tagsGroupsMap[t.name])) {
            sub.push(<TagsCloud tagsGroups={getTagGroup(tagsGroupsMap[t.name])} selected={selected} onChange={props.onChange} />)
        }
    }

    return (
        <View flexDirection="column">
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
    let tab = props.router.params.tab || 'initial';
    let [selected, setSelected] = React.useState(props.router.params.selected as Set<Tag> || new Set<Tag>());
    let [selectedImmutable] = React.useState(props.router.params.selected as Set<Tag> || new Set<Tag>());
    let onSelectChange = React.useCallback((tag: Tag) => {
        if (selectedImmutable.has(tag)) {
            selectedImmutable.delete(tag);
            getSubTags(tag).map(t => selectedImmutable.delete(t));
        } else {
            selectedImmutable.add(tag);
        }
        setSelected(new Set(selectedImmutable));
    }, [])

    let next = React.useCallback(() => {
        let path = 'SuggestedGroups';
        let paprams: any = { selected };
        if (tab === 'initial' && [...selected.values()].find(t => t.name === 'Founder')) {
            path = 'Discover';
            paprams = { tab: 'founder', selected: selectedImmutable };
        }
        props.router.push(path, paprams);

    }, [selected]);
    let title = tab === 'initial' ? 'Select your role' : tab === 'founder' ? 'What brings you to Openland?' : 'Chats we offer to join by default';
    let subtitle = tab === 'initial' ? 'Tell us a bit about yourself' : tab === 'founder' ? 'What is important to you' : 'What is important to you';

    let tagGroups = tab === 'initial' ? getRootTags() : tab === 'founder' ? [getTagGroup('Goal')] : [];
    return (
        <>
            {tab === 'initial' &&
                <>
                    {Platform.OS === 'ios' && <SHeader title="Discover" />}
                    {Platform.OS === 'android' && <CenteredHeader title="Discover" padding={98} />}
                </>
            }
            {tab !== 'groups' && <SHeaderButton title={'Next'} onPress={[...selected.values()].length ? next : undefined} />}
            <SScrollView padding={18} justifyContent="flex-start" alignContent="center">
                <Text style={{ fontSize: 22, fontWeight: TextStyles.weight.medium, marginBottom: 10 }}>{title}</Text>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>{subtitle}</Text>
                {tagGroups.map(tg => (
                    <TagsCloud selected={selected} onChange={onSelectChange} tagsGroups={tg} />
                ))}
            </SScrollView>
        </>
    );
};

export const DiscoverHome = withApp(DiscoverPage, { navigationAppearance: 'large' });
export const Discover = withApp(DiscoverPage, { navigationAppearance: 'small-hidden' });

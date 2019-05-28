import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SDeferred } from 'react-native-s/SDeferred';
import { SScrollView } from 'react-native-s/SScrollView';
import { Tag, getPreprocessedTags1, getPreprocessedTags2, resolveSuggestedChats } from 'openland-mobile/pages/main/discoverData';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

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

const TagsCloud = (props: { tagsGroups: { name: string, tags: Tag[] }[], initialSelected: Set<Tag>, onChange: (selected: Set<Tag>) => void }) => {
    let [tagsGroups] = React.useState(props.tagsGroups);
    let [selected, setSelected] = React.useState(props.initialSelected);

    let onTagPress = React.useCallback((tag: Tag) => {
        if (selected.has(tag)) {
            selected.delete(tag);
        } else {
            selected.add(tag);
        }
        props.onChange(new Set(selected));
        setSelected(new Set(selected));

    }, [selected]);

    return (
        <View flexDirection="column">
            {tagsGroups.map((group, i) => (
                <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                    {group.tags.map(tag => (
                        <TagButton tag={tag} onPress={onTagPress} selected={!![...selected.values()].find(v => v.name === tag.name)} />
                    ))}
                </View>
            ))}
        </View>
    )
}

const DiscoverPage = (props: PageProps) => {
    let tab = props.router.params.tab || '1';
    let [selected] = React.useState(props.router.params.selected as Set<Tag> || new Set<Tag>());
    let [dumb, update] = React.useState({});
    let onSelectChange = React.useCallback((newSelected: Set<Tag>) => {
        [...newSelected].map(s => selected.add(s));
        update({});
    }, [])
    let title = tab === '1' ? 'Select your role' : tab === '2' ? 'What brings you to Openland?' : 'Chats we offer to join by default';
    let subtitle = tab === '1' ? 'Tell us a bit about yourself' : tab === '2' ? 'What is important to you' : 'What is important to you';

    return (
        <>
            {tab === '1' &&
                <>
                    {Platform.OS === 'ios' && <SHeader title="Discover" />}
                    {Platform.OS === 'android' && <CenteredHeader title="Discover" padding={98} />}
                </>
            }
            {tab !== 'groups' && <SHeaderButton title={'Next'} onPress={() => props.router.push('Discover', { tab: tab === '1' ? '2' : 'groups', selected })} />}
            <SScrollView padding={18} justifyContent="flex-start" alignContent="center">
                <Text style={{ fontSize: 22, fontWeight: TextStyles.weight.medium, marginBottom: 10 }}>{title}</Text>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>{subtitle}</Text>

                {(tab === '1' || tab === '2') && <TagsCloud initialSelected={selected} onChange={onSelectChange} tagsGroups={tab === '1' ? getPreprocessedTags1() : getPreprocessedTags2()} />}
                {tab === 'groups' && <Text>{JSON.stringify(resolveSuggestedChats(selected), undefined, 4)}</Text>}

            </SScrollView>
        </>
    );
};

export const DiscoverHome = withApp(DiscoverPage, { navigationAppearance: 'large' });
export const Discover = withApp(DiscoverPage, { navigationAppearance: 'small-hidden' });

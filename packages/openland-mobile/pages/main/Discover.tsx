import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SRouter } from 'react-native-s/SRouter';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SuggestedChats as SuggestedChatsPage } from './SuggestedChats';
import LinearGradient from 'react-native-linear-gradient';

export type Tag = { id: string, title: string };
export type TagGroup = { id: string, title?: string | null, subtitle?: string | null, tags: Tag[] };

const TagButton = (props: { tag: Tag, selected: boolean, onPress: (tag: Tag) => void }) => {
    let style: 'fill' | 'border' = 'fill' as any;

    let theme = React.useContext(ThemeContext);
    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag]);
    return <TouchableOpacity onPress={callback} activeOpacity={0.6}>

        <View
            style={{
                marginRight: 10,
                marginBottom: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: RadiusStyles.medium,
                borderWidth: 2,

                backgroundColor: props.tag.id === 'button_more' ? undefined : props.selected ? (style === 'fill' ? theme.accentPrimary : theme.accentBackgroundColor) : theme.accentBackgroundColor,
                borderColor: props.selected ? theme.accentPrimary : theme.accentBackgroundColor
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: TextStyles.weight.medium,
                    color: props.selected ? (style === 'fill' ? theme.contrastPrimary : theme.accentPrimary) : theme.accentPrimary
                }}
            >
                {props.tag.title}
            </Text>
        </View >
    </TouchableOpacity>;
};

const TagsCloud = (props: { tagsGroup: TagGroup, selected: Set<string>, onSelectedChange: (selected: Set<string>) => void }) => {

    let [showAll, setShowAll] = React.useState(false);

    let onShowAll = React.useCallback(() => {
        setShowAll(!showAll);
    }, [showAll]);

    let onTagPress = (tag: Tag) => {
        let selected = props.selected.has(tag.id);

        if (selected) {
            props.selected.delete(tag.id);
        } else {
            props.selected.add(tag.id);
        }
        props.onSelectedChange(props.selected);
    };

    return (
        <View flexDirection="column">
            <View height={15} />
            {/* {props.tagsGroup.title && <Text style={{ fontSize: 16, marginBottom: 20, fontWeight: TextStyles.weight.medium, color: theme.foregroundPrimary }}>{props.tagsGroup.title}</Text>} */}
            <View marginBottom={18} flexDirection="row" flexWrap="wrap">
                {props.tagsGroup.tags.filter((t, i) => showAll || i < 17).map(tag => (
                    <TagButton tag={tag} onPress={onTagPress} selected={props.selected.has(tag.id)} />
                ))}
                {props.tagsGroup.tags.length > 17 && !showAll && <TagButton tag={{ title: showAll ? 'Less' : 'More', id: 'button_more' }} onPress={onShowAll} selected={false} />}
            </View>
            {/* {sub} */}
        </View>
    );
};

const TagsGroupPage = (props: { group: TagGroup, selected: Set<string>, exclude: Set<string>, router: SRouter }) => {
    let [selected, setCurretnSelected] = React.useState(props.selected);
    let onSelectedChange = React.useCallback((s: Set<string>) => {
        setCurretnSelected(new Set(s));
    }, [selected]);

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
            {title && <SHeader title={title} />}
            <SScrollView justifyContent="flex-start" alignContent="center">
                {subtitle && <Text style={{ fontSize: 20, paddingBottom: 16, paddingHorizontal: 18, backgroundColor: theme.backgroundSecondary, color: theme.foregroundPrimary }}>{subtitle}</Text>}
                <View paddingHorizontal={18}>
                    <TagsCloud tagsGroup={props.group} selected={selected} onSelectedChange={onSelectedChange} />
                </View>
                <View height={120} />
            </SScrollView>
            <LinearGradient colors={[theme.transparent, theme.backgroundPrimary, theme.backgroundPrimary]} height={160} position="absolute" bottom={0} width="100%" justifyContent="center" alignItems="center" pointerEvents="none" />

            <ASSafeAreaContext.Consumer>
                {sa => (
                    <View alignContent="center" justifyContent="center" alignSelf="center" bottom={sa.bottom + 48}>
                        <ZRoundedButton size="large" title="  Next  " enabled={!disabled} onPress={next} />
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
            return <SuggestedChatsPage chats={currentPage.betaNextDiscoverPage.chats} router={props.router} selectedTagIds={[...selected.values()]} />;
        } else if (currentPage.betaNextDiscoverPage.tagGroup) {
            exclude.add(currentPage.betaNextDiscoverPage.tagGroup.id);
            return < TagsGroupPage group={currentPage.betaNextDiscoverPage.tagGroup} exclude={exclude} selected={selected} router={props.router} />;
        }
    }
    return <ZLoader />;
};

export const Discover = withApp(DiscoverComponent, { navigationAppearance: 'large', hideHairline: true });

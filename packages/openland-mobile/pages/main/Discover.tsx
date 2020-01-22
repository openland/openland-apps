import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import {
    View,
    ScrollView,
    Text,
    Animated,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SRouter } from 'react-native-s/SRouter';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SuggestedChats as SuggestedChatsPage } from './SuggestedChats';

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

interface TagButtonProps {
    tag: Tag;
    selected: boolean;
    onPress: (tag: Tag) => void;
}

const TagButton = React.memo((props: TagButtonProps) => {
    const theme = React.useContext(ThemeContext);
    const [textStyle] = React.useState(new Animated.Value(props.selected ? 6 : 0));
    const [imageStyle] = React.useState(new Animated.Value(props.selected ? 1 : 0));

    React.useEffect(
        () => {
            Animated.parallel([
                Animated.timing(textStyle, {
                    duration: 150,
                    toValue: props.selected ? 6 : 0,
                    useNativeDriver: true,
                }),
                Animated.timing(imageStyle, {
                    duration: 150,
                    toValue: props.selected ? 1 : 0,
                    useNativeDriver: true,
                }),
            ]).start();
        },
        [props.selected],
    );

    const callback = () => {
        props.onPress(props.tag);
    };

    return (
        <TouchableOpacity onPress={callback} activeOpacity={0.6}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 8,
                    paddingVertical: 6,
                    paddingLeft: 24,
                    paddingRight: 24,
                    borderRadius: 100,
                    backgroundColor: props.selected
                        ? theme.accentPrimary
                        : theme.backgroundTertiary,
                }}
            >
                <Animated.Image
                    style={{
                        width: 16,
                        height: 16,
                        marginLeft: -14,
                        opacity: imageStyle,
                        transform: [{ scale: imageStyle }],
                        tintColor: theme.foregroundInverted,
                    }}
                    source={require('assets/ic-checkmark.png')}
                />
                <Animated.Text
                    allowFontScaling={false}
                    style={{
                        ...TextStyles.Label1,
                        transform: [{ translateX: textStyle }],
                        color: props.selected
                            ? theme.foregroundInverted
                            : theme.foregroundSecondary,
                    }}
                >
                    {props.tag.title}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    );
});

interface TagsCloudProps {
    tagsGroup: TagGroup;
    selected: Set<string>;
    onSelectedChange: (selected: Set<string>) => void;
}

const TagsCloud = React.memo((props: TagsCloudProps) => {
    const onTagPress = (tag: Tag) => {
        let selected = props.selected.has(tag.id);

        if (selected) {
            props.selected.delete(tag.id);
        } else {
            props.selected.add(tag.id);
        }
        props.onSelectedChange(props.selected);
    };

    return (
        <View flexDirection="row" flexWrap="wrap" justifyContent="center">
            {props.tagsGroup.tags.map(tag => (
                <TagButton
                    tag={tag}
                    onPress={onTagPress}
                    selected={props.selected.has(tag.id)}
                    key={tag.id}
                />
            ))}
        </View>
    );
});

interface TagsGroupPageProps {
    group: TagGroup;
    selected: Set<string>;
    exclude: Set<string>;
    router: SRouter;
}

const TagsGroupPage = React.memo((props: TagsGroupPageProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const theme = React.useContext(ThemeContext);

    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 34 : 16;

    const [selected, setCurrentSelected] = React.useState(props.selected);

    const onSelectedChange = React.useCallback(
        (s: Set<string>) => {
            setCurrentSelected(new Set(s));
        },
        [selected],
    );

    const enabled = props.group.tags.some(r => selected.has(r.id));

    const next = React.useCallback(
        () => {
            if (!enabled) {
                return;
            }
            (async () => {
                let nextPath = 'Discover';

                let params: any = { selected, exclude: new Set(props.exclude) };

                props.router.push(nextPath, params);
            })();
        },
        [selected],
    );

    const { title, subtitle } = props.group;

    return (
        <>
            <ScrollView flex={1} paddingTop={isIos ? area.top + 16 : undefined}>
                {title && (
                    <Text
                        allowFontScaling={false}
                        style={{
                            ...TextStyles.Title1,
                            textAlign: 'center',
                            paddingHorizontal: 16,
                            marginBottom: 8,
                            color: theme.foregroundPrimary,
                        }}
                    >
                        {title}
                    </Text>
                )}
                {subtitle && (
                    <Text
                        allowFontScaling={false}
                        style={{
                            ...TextStyles.Body,
                            textAlign: 'center',
                            paddingHorizontal: 16,
                            marginBottom: 32,
                            color: theme.foregroundSecondary,
                        }}
                    >
                        {subtitle}
                    </Text>
                )}
                <View paddingHorizontal={8} paddingBottom={100} flexDirection="column">
                    <TagsCloud
                        tagsGroup={props.group}
                        selected={selected}
                        onSelectedChange={onSelectedChange}
                    />
                </View>
            </ScrollView>
            <View padding={16} paddingBottom={isIos ? defaultIosPadding : area.bottom + 16}>
                <ZRoundedButton size="large" title="Next" enabled={enabled} onPress={next} />
            </View>
        </>
    );
});

const DiscoverComponent = React.memo((props: PageProps) => {
    let exclude = props.router.params.exclude || new Set<string>();
    let selected = props.router.params.selected || new Set<string>();
    let currentPage = getClient().useDiscoverNextPage(
        { selectedTagsIds: [...selected.values()], excudedGroupsIds: [...exclude.values()] },
        { fetchPolicy: 'network-only' },
    );

    if (currentPage.betaNextDiscoverPage) {
        if (currentPage.betaNextDiscoverPage.chats) {
            return (
                <SuggestedChatsPage
                    chats={currentPage.betaNextDiscoverPage.chats}
                    router={props.router}
                    selectedTagIds={[...selected.values()]}
                />
            );
        } else if (currentPage.betaNextDiscoverPage.tagGroup) {
            exclude.add(currentPage.betaNextDiscoverPage.tagGroup.id);
            return (
                <TagsGroupPage
                    group={currentPage.betaNextDiscoverPage.tagGroup}
                    exclude={exclude}
                    selected={selected}
                    router={props.router}
                />
            );
        }
    }
    return <ZLoader />;
});

export const Discover = withApp(DiscoverComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
});

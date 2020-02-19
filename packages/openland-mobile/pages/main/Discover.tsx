import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import {
    View,
    Text,
    Animated,
    Platform,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SRouter } from 'react-native-s/SRouter';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SuggestedChats as SuggestedChatsPage } from './SuggestedChats';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';

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
        <TouchableHighlight
            onPress={callback}
            activeOpacity={1}
            underlayColor={
                props.selected ? theme.accentPrimaryActive : theme.backgroundTertiaryActive
            }
            style={{
                margin: 8,
                paddingVertical: 6,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 100,
                backgroundColor: props.selected ? theme.accentPrimary : theme.backgroundTertiary,
            }}
        >
            <View flexDirection="row" alignItems="center">
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
        </TouchableHighlight>
    );
});

interface TagsCloudProps {
    tagsGroup: TagGroup;
    selected: Set<string>;
    onSelectedChange: (selected: Set<string>) => void;
}

const TagsCloud = React.memo((props: TagsCloudProps) => {
    const onTagPress = (tag: Tag) => {
        let selected = new Set(props.selected);
        let thisSelected = selected.has(tag.id);

        if (thisSelected) {
            selected.delete(tag.id);
        } else {
            selected.add(tag.id);
        }
        props.onSelectedChange(selected);
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

    const { subtitle } = props.group;

    return (
        <>
            <SHeader title={subtitle || ''}/>
            <SScrollView flex={1} paddingTop={16}>
                {subtitle && (
                    <Text
                        allowFontScaling={false}
                        style={{
                            ...TextStyles.Title1,
                            textAlign: 'center',
                            paddingHorizontal: 16,
                            marginBottom: 32,
                            color: theme.foregroundPrimary,
                        }}
                    >
                        {subtitle}
                    </Text>
                )}
                <View
                    paddingHorizontal={8}
                    flexDirection="column"
                    paddingBottom={isXGen ? 216 : 140}
                >
                    <TagsCloud
                        tagsGroup={props.group}
                        selected={selected}
                        onSelectedChange={onSelectedChange}
                    />
                </View>
            </SScrollView>
            <ZBlurredView
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                padding={16}
                paddingBottom={isIos ? defaultIosPadding : area.bottom + 16}
                intensity="normal"
            >
                <ZButton size="large" title="Next" enabled={enabled} onPress={next} />
            </ZBlurredView>
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
    navigationAppearance: 'small-hidden',
});

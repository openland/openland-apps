import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from './components/BackSkipLogo';
import { getPercentageOfOnboarding } from './utils';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-web/utils/useClient';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export type Tag = { id: string; title: string };
export type TagGroup = { id: string; title?: string | null; subtitle?: string | null; tags: Tag[] };

const TagButton = (props: { tag: Tag; selected: boolean; onPress: (tag: Tag) => void }) => {
    let callback = React.useCallback(() => {
        props.onPress(props.tag);
    }, [props.tag]);

    return (
        <XView marginRight={12} marginBottom={12}>
            <XButton
                onClick={callback}
                text={props.tag.title}
                style={props.selected ? 'primary' : 'light'}
            />
        </XView>
    );
};

const TagsCloud = (props: {
    tagsGroup: TagGroup;
    selected: Set<string>;
    onSelectedChange: (selected: Set<string>) => void;
}) => {
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
        <XView flexDirection="column">
            <XView marginBottom={18} flexDirection="row" flexWrap="wrap" width={350}>
                {props.tagsGroup.tags
                    .filter((t, i) => showAll || i < 17)
                    .map(tag => (
                        <TagButton
                            tag={tag}
                            onPress={onTagPress}
                            selected={props.selected.has(tag.id)}
                        />
                    ))}
                {props.tagsGroup.tags.length > 17 && !showAll && (
                    <TagButton
                        tag={{ title: showAll ? 'Less' : 'More', id: 'button_more' }}
                        onPress={onShowAll}
                        selected={false}
                    />
                )}
            </XView>
        </XView>
    );
};

const TagsGroupPage = (props: {
    group?: TagGroup | null;
    selected: Set<string>;
    exclude: Set<string>;
}) => {
    let [selected, setCurretnSelected] = React.useState(props.selected);
    let onSelectedChange = React.useCallback((s: Set<string>) => {
        setCurretnSelected(new Set(s));
    }, []);

    // let disabled = !selected.size && props.exclude.size <= 1;
    // let next = React.useCallback(() => {
    //     if (disabled) {
    //         return;
    //     }
    //     (async () => {
    //         let nextPath = 'Discover';

    //         let params: any = { selected, exclude: new Set(props.exclude) };

    //         // props.router.push(nextPath, params);
    //     })();
    // }, [selected, disabled]);

    if (!props.group) {
        return null;
    }

    let { title, subtitle } = props.group;

    return (
        <>
            <XScrollView3>
                <XView paddingHorizontal={18}>
                    <TagsCloud
                        tagsGroup={props.group}
                        selected={selected}
                        onSelectedChange={onSelectedChange}
                    />
                </XView>
                <XView height={120} />
            </XScrollView3>

            {/* <LinearGradient
                colors={[theme.transparent, theme.backgroundColor, theme.backgroundColor]}
                height={160}
                position="absolute"
                bottom={0}
                width="100%"
                justifyContent="center"
                alignItems="center"
                pointerEvents="none"
            /> */}

            {/* <ASSafeAreaContext.Consumer>
                {sa => (
                    <View
                        alignContent="center"
                        justifyContent="center"
                        alignSelf="center"
                        bottom={sa.bottom + 48}
                    >
                        <ZRoundedButton
                            size="large"
                            title="  Next  "
                            style="default"
                            enabled={!disabled}
                            onPress={next}
                        />
                    </View>
                )}
            </ASSafeAreaContext.Consumer> */}
        </>
    );
};

export default withApp('Home', 'viewer', () => {
    const client = useClient();
    const selected: any[] = [];
    const exclude: any[] = [];

    let currentPage = client.useDiscoverNextPage(
        { selectedTagsIds: [...selected], excudedGroupsIds: [...exclude] },
        { fetchPolicy: 'network-only' },
    );

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={getPercentageOfOnboarding(7)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo />
            </XView>

            <XView flexDirection="row" justifyContent="center">
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView fontSize={24} marginBottom={12}>
                        Your role
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        What roles have you played?
                    </XView>

                    <TagsGroupPage
                        group={currentPage.betaNextDiscoverPage!!.tagGroup}
                        exclude={new Set()}
                        selected={new Set()}
                    />

                    <XButton text="Continue" style="primary" size="default" />
                </XView>
            </XView>
        </div>
    );
});

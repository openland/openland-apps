import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XButton } from 'openland-x/XButton';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { TagsCloud } from '../components/TagsCloud';
import { TagGroup, Tag } from '../components/TagButton';
import { ChatsForYou } from './chats-for-you.page';
import { XLoader } from 'openland-x/XLoader';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { Wrapper } from './components/wrapper';

const shadowClassName = css`
    width: 350px;
    height: 200px;
    position: absolute;
    bottom: -70px;
    margin: auto;
    pointer-events: none;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
`;

const mobileShadowClassName = css`
    bottom: -30px;
`;

const TagsGroupPage = (props: {
    group?: TagGroup | null;
    selected: string[];
    onPress: (tag: Tag) => void;
}) => {
    if (!props.group) {
        return null;
    }

    return (
        <XScrollView3
            marginBottom={-110}
            flexGrow={1}
            flexShrink={1}
            alignSelf="stretch"
            alignItems="center"
        >
            <XView paddingHorizontal={18} paddingBottom={100} alignItems="center">
                <TagsCloud
                    tagsGroup={props.group}
                    selected={props.selected}
                    onPress={props.onPress}
                />
            </XView>
        </XScrollView3>
    );
};

const LocalDiscoverComponent = ({
    noLogo,
    noTopBar,
    noBackSkipLogo,
    group,
    onContinueClick,
    selected,
    fullHeight,
    progressInPercents,
    onSkip,
    onBack,
    allowContinue,
}: {
    allowContinue?: boolean;
    noLogo?: boolean;
    noTopBar?: boolean;
    noBackSkipLogo?: boolean;
    group?: TagGroup | null;
    onContinueClick: (data: any) => void;
    selected: string[];
    fullHeight?: boolean;
    progressInPercents: number;
    onSkip: ((event: React.MouseEvent) => void) | null;
    onBack: ((event: React.MouseEvent) => void) | null;
}) => {
    const isMobile = useIsMobile();
    const [localSelected, setLocalSelected] = React.useState<string[]>(() => selected);

    React.useLayoutEffect(() => {
        setLocalSelected(selected);
    }, [selected]);

    const onTagPress = React.useCallback(
        (tag: Tag) => {
            const clonedSelected = new Set<string>(localSelected);

            if (clonedSelected.has(tag.id)) {
                clonedSelected.delete(tag.id);
            } else {
                clonedSelected.add(tag.id);
            }

            setLocalSelected([...clonedSelected.values()]);
        },
        [localSelected],
    );

    const onMyContinueClick = React.useCallback(() => {
        onContinueClick(localSelected);
    }, [localSelected]);

    if (!group) {
        return null;
    }

    const { title, subtitle } = group;
    return (
        <Wrapper fullHeight={fullHeight}>
            <XDocumentHead title="Choose role" />
            {!noBackSkipLogo && (
                <BackSkipLogo onBack={onBack} onSkip={onSkip} noLogo={noLogo || !!isMobile} />
            )}
            <XView
                alignItems="center"
                flexGrow={1}
                flexShrink={1}
                justifyContent="center"
                marginTop={isMobile ? 15 : 100}
                marginBottom={isMobile ? 30 : 70}
            >
                <XView
                    flexDirection="column"
                    alignSelf="stretch"
                    alignItems="center"
                    flexGrow={1}
                    flexShrink={1}
                >
                    <XView fontSize={24} marginBottom={15} fontWeight="600">
                        {title}
                    </XView>
                    <XView fontSize={16} marginBottom={30}>
                        {subtitle}
                    </XView>

                    <TagsGroupPage group={group} selected={localSelected} onPress={onTagPress} />
                    <div className={cx(shadowClassName, isMobile && mobileShadowClassName)} />
                    <XButton
                        enabled={allowContinue || !!localSelected.length}
                        flexShrink={0}
                        zIndex={2}
                        text="Continue"
                        style="primary"
                        size="large"
                        onClick={onMyContinueClick}
                    />
                </XView>
            </XView>
        </Wrapper>
    );
};

// const arrowify = (value: string | string[]) => {
//     return typeof value === 'string' ? [value] : value || [];
// };

export const Discover = ({
    noLogo,
    noTopBar,
    noBackSkipLogo,
    previousChoisesMap,
    rootSelected,
    rootExclude,
    onContinueClick,
    onSkip,
    onBack,
    onChatsForYouSkip,
    onChatsForYouBack,
    fullHeight,
    onJoinChats,
    allowContinue,
}: {
    noLogo?: boolean;
    noTopBar?: boolean;
    noBackSkipLogo?: boolean;
    previousChoisesMap: any;
    rootSelected: string[];
    rootExclude: string[];
    onContinueClick: (newSelected: any) => void;
    onSkip: ((a: { currentPageId: string; exclude: string[] }) => void) | null;
    onBack: ((event: React.MouseEvent) => void) | null;
    onChatsForYouSkip: ((event: React.MouseEvent) => void) | null;
    onChatsForYouBack: (event: React.MouseEvent) => void;
    fullHeight?: boolean;
    onJoinChats?: Function;
    allowContinue?: boolean;
}) => {
    const client = useClient();

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    const currentPage = client.useDiscoverNextPage(
        {
            selectedTagsIds: rootSelected,
            excudedGroupsIds: rootExclude,
        },
        { fetchPolicy: 'network-only' },
    );

    React.useLayoutEffect(() => {
        client.refetchSuggestedRooms().then(() => {
            client.refetchDiscoverIsDone();
        });
    }, [currentPage.betaNextDiscoverPage!!.tagGroup]);

    if (!currentPage.betaNextDiscoverPage!!.tagGroup!! || discoverDone.betaIsDiscoverDone) {
        if (!discoverDone.betaIsDiscoverDone) {
            return <XLoader />;
        }
        return (
            <ChatsForYou
                onJoinChats={onJoinChats}
                noTopBar={noTopBar}
                onSkip={onChatsForYouSkip}
                onBack={onChatsForYouBack}
                fullHeight={fullHeight}
            />
        );
    }

    const currentPageId = currentPage.betaNextDiscoverPage!!.tagGroup!!.id;

    const newExclude = [...new Set<string>([...rootExclude, currentPageId]).values()];

    const onLocalSkip = async () => {
        if (onSkip) {
            await onSkip({
                currentPageId,
                exclude: newExclude,
            });
        }
    };

    let finalSelected = [];

    if (previousChoisesMap[currentPageId]) {
        finalSelected = previousChoisesMap[currentPageId];
    }

    const localOnContinueClick = async (newSelected: string[]) => {
        await onContinueClick({
            selected: [...new Set<string>([...rootSelected, ...newSelected]).values()],
            exclude: newExclude,
            currentPageId,
        });
    };

    return (
        <LocalDiscoverComponent
            noLogo={noLogo}
            noTopBar={noTopBar}
            noBackSkipLogo={noBackSkipLogo}
            onSkip={onSkip ? onLocalSkip : null}
            onBack={onBack ? onBack : null}
            group={currentPage.betaNextDiscoverPage!!.tagGroup!!}
            onContinueClick={localOnContinueClick}
            selected={finalSelected}
            progressInPercents={getPercentageOfOnboarding(7 + rootExclude.length)}
            fullHeight={fullHeight}
            allowContinue={allowContinue}
        />
    );
};
export const DiscoverOnLocalState = ({
    noSkipOnChatsForYou,
    noBackOnFirstScreen,
    noSkipOnFirstScreen,
    noLogo,
    noTopBar,
    noBackSkipLogo,
    fullHeight,
    onJoinChats,
}: {
    noSkipOnChatsForYou?: boolean;
    noBackOnFirstScreen?: boolean;
    noSkipOnFirstScreen?: boolean;
    noLogo?: boolean;
    noTopBar?: boolean;
    noBackSkipLogo?: boolean;
    fullHeight?: boolean;
    onJoinChats?: Function;
}) => {
    const client = useClient();
    const router = React.useContext(XRouterContext)!;
    const [previousChoisesMap, setPreviousChoisesMap] = React.useState<any>({});

    const [rootState, setRootState] = React.useState<{ selected: string[]; exclude: string[] }[]>(
        [],
    );

    const mergeAllSelected = React.useCallback(() => {
        const allSelectedArrays = rootState.map(({ selected }) => {
            return selected;
        });

        const allSelected: string[] = [];
        for (let selected of allSelectedArrays) {
            for (let selectedItem of selected) {
                if (!allSelected.includes(selectedItem)) {
                    allSelected.push(selectedItem);
                }
            }
        }
        return allSelected;
    }, [rootState]);

    // const mergeAllExcluded = React.useCallback(() => {
    //     const allExcludeArrays = rootState.map(({ exclude }) => {
    //         return exclude;
    //     });

    //     const allExclude: string[] = [];
    //     for (let exclude of allExcludeArrays) {
    //         for (let selectedItem of exclude) {
    //             if (!allExclude.includes(selectedItem)) {
    //                 allExclude.push(selectedItem);
    //             }
    //         }
    //     }
    //     return allExclude;
    // }, [rootState]);

    const onContinueClick = React.useCallback(
        async (data: { selected: string[]; exclude: string[]; currentPageId: string }) => {
            setPreviousChoisesMap({
                ...previousChoisesMap,
                [data.currentPageId]: data.selected,
            });

            const newRootState = [
                ...rootState,
                {
                    selected: data.selected,
                    exclude: data.exclude,
                },
            ];

            await client.mutateBetaSubmitNextDiscover({
                selectedTagsIds: data.selected,
                excudedGroupsIds: data.exclude,
            });

            setRootState(newRootState);
        },
        [previousChoisesMap, rootState],
    );

    const onChatsForYouSkip = React.useCallback(async () => {
        await client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
        router.push('/mail/');
    }, []);

    const onSkip = React.useCallback(
        async (data: { exclude: string[]; currentPageId: string }) => {
            if (rootState.length === 0) {
                await client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
                router.push('/mail/');
                return;
            }

            setPreviousChoisesMap({
                ...previousChoisesMap,
                [data.currentPageId]: [],
            });

            const newRootState = [
                ...rootState,
                {
                    selected: rootState[rootState.length - 1].selected,
                    exclude: data.exclude,
                },
            ];

            await client.mutateBetaSubmitNextDiscover({
                selectedTagsIds: mergeAllSelected(),
                excudedGroupsIds: data.exclude,
            });

            setRootState(newRootState);
        },
        [previousChoisesMap, rootState],
    );

    const onBack = React.useCallback(async () => {
        if (rootState.length !== 0) {
            const cloneRootState = [...rootState];

            cloneRootState.pop();

            setRootState(cloneRootState);
        }
    }, [rootState]);

    const getLastStateOrEmpty = React.useCallback(() => {
        if (rootState.length === 0) {
            return { selected: [], exclude: [] };
        }
        return rootState[rootState.length - 1];
    }, [rootState]);

    const onChatsForYouBack = React.useCallback(async () => {
        await client.mutateBetaNextDiscoverReset();
        await client.refetchSuggestedRooms();
        await client.refetchDiscoverIsDone();

        const result = await client.queryDiscoverNextPage({
            selectedTagsIds: getLastStateOrEmpty().selected,
            excudedGroupsIds: getLastStateOrEmpty().exclude,
        });

        if (result.betaNextDiscoverPage!!.tagGroup === null) {
            await onBack();
        }
    }, [rootState]);

    const lastStateOrEmpty = getLastStateOrEmpty();

    const allowContinue = rootState.length !== 0 && fullHeight;

    return (
        <Discover
            onJoinChats={onJoinChats}
            noLogo={noLogo}
            noTopBar={noTopBar}
            noBackSkipLogo={noBackSkipLogo}
            onChatsForYouSkip={noSkipOnChatsForYou ? null : onChatsForYouSkip}
            onChatsForYouBack={onChatsForYouBack}
            onSkip={noSkipOnFirstScreen && rootState.length === 0 ? null : onSkip}
            onBack={noBackOnFirstScreen && rootState.length === 0 ? null : onBack}
            previousChoisesMap={previousChoisesMap}
            rootSelected={lastStateOrEmpty.selected}
            rootExclude={lastStateOrEmpty.exclude}
            onContinueClick={onContinueClick}
            fullHeight={fullHeight}
            allowContinue={allowContinue}
        />
    );
};

export default withApp('Home', 'viewer', () => <DiscoverOnLocalState />);

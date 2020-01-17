import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { TagsCloud } from '../components/TagsCloud';
import { TagGroup, Tag } from '../components/TagButton';
import { ChatsForYou } from './chats-for-you.page';
import { XLoader } from 'openland-x/XLoader';
import { Wrapper } from './components/wrapper';
import { Title, AuthActionButton, FormLayout } from '../auth/components/authComponents';
import { css } from 'linaria';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const shadowWrapper = css`
    width: 100%;
    height: 112px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
`;

const shadowClassName = css`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
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
        <TagsCloud
            tagsGroup={props.group}
            selectedTags={props.selected}
            onPress={props.onPress}
            marginTop={24}
        />
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
    onSkip?: ((event: React.MouseEvent) => void);
    onBack?: ((event: React.MouseEvent) => void);
}) => {
    const [localSelected, setLocalSelected] = React.useState<string[]>(() => selected);

    React.useLayoutEffect(
        () => {
            setLocalSelected(selected);
        },
        [selected],
    );

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

    const onMyContinueClick = React.useCallback(
        () => {
            onContinueClick(localSelected);
        },
        [localSelected],
    );

    if (!group) {
        return null;
    }

    const [isScrollable, setIsScrollable] = React.useState(false);
    React.useLayoutEffect(() => {
        if (document.body.scrollHeight > document.body.clientHeight) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, [group]);
    const isMobile = useIsMobile();

    const { title, subtitle } = group;
    return (
        <Wrapper fullHeight={fullHeight}>
            <XDocumentHead title={title!!} />
            {!noBackSkipLogo && (
                <BackSkipLogo onBack={onBack} onSkip={onSkip} />
            )}
            <FormLayout marginTop={isMobile ? 56 : 72} marginBottom={130}>
                <Title text={subtitle!!} />
                <TagsGroupPage group={group} selected={localSelected} onPress={onTagPress} />
                {isScrollable ? (
                    <div className={shadowWrapper}>
                        <AuthActionButton
                            marginTop={0}
                            zIndex={2}
                            text="Continue"
                            onClick={onMyContinueClick}
                        />
                        <div className={shadowClassName} />
                    </div>
                ) : (
                        <AuthActionButton
                            marginTop={24}
                            zIndex={2}
                            text="Continue"
                            onClick={onMyContinueClick}
                        />
                    )}
            </FormLayout>
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
    onSkip?: (a: { currentPageId: string; exclude: string[] }) => void;
    onBack?: (event: React.MouseEvent) => void;
    onChatsForYouSkip?: (event: React.MouseEvent) => void;
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

    React.useLayoutEffect(
        () => {
            client.refetchSuggestedRooms().then(() => {
                client.refetchDiscoverIsDone();
            });
        },
        [currentPage.betaNextDiscoverPage!!.tagGroup],
    );

    if (!currentPage.betaNextDiscoverPage!!.tagGroup!! || discoverDone.betaIsDiscoverDone) {
        if (!discoverDone.betaIsDiscoverDone) {
            return <XLoader loading={true} />;
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
            onSkip={onSkip && onLocalSkip}
            onBack={onBack && onBack}
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

    const mergeAllSelected = React.useCallback(
        () => {
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
        },
        [rootState],
    );

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

    const onBack = React.useCallback(
        async () => {
            if (rootState.length !== 0) {
                const cloneRootState = [...rootState];

                cloneRootState.pop();

                setRootState(cloneRootState);
            }
        },
        [rootState],
    );

    const getLastStateOrEmpty = React.useCallback(
        () => {
            if (rootState.length === 0) {
                return { selected: [], exclude: [] };
            }
            return rootState[rootState.length - 1];
        },
        [rootState],
    );

    const onChatsForYouBack = React.useCallback(
        async () => {
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
        },
        [rootState],
    );

    const lastStateOrEmpty = getLastStateOrEmpty();

    const allowContinue = rootState.length !== 0 && fullHeight;

    return (
        <Discover
            onJoinChats={onJoinChats}
            noLogo={noLogo}
            noTopBar={noTopBar}
            noBackSkipLogo={noBackSkipLogo}
            onChatsForYouSkip={noSkipOnChatsForYou ? undefined : onChatsForYouSkip}
            onChatsForYouBack={onChatsForYouBack}
            onSkip={noSkipOnFirstScreen && rootState.length === 0 ? undefined : onSkip}
            onBack={noBackOnFirstScreen && rootState.length === 0 ? undefined : onBack}
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

import * as React from 'react';
import { css } from 'linaria';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useClient } from 'openland-api/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { BackSkipLogo } from 'openland-web/pages/components/BackSkipLogo';
import { TagsCloud } from 'openland-web/pages//components/TagsCloud';
import { TagGroup, Tag } from 'openland-web/pages//components/TagButton';
import { ChatsForYou } from './DiscoverChatsForYou';
import { XLoader } from 'openland-x/XLoader';
import {
    Wrapper,
    Title,
    AuthActionButton,
    FormLayout,
    useShake,
} from 'openland-web/pages/auth/components/authComponents';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

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
    background-image: linear-gradient(to bottom, var(--transparent), var(--backgroundPrimary));
`;

const TagsGroupPage = (props: {
    group?: TagGroup | null;
    selected: string[];
    className?: string;
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
            className={props.className}
        />
    );
};

const LocalDiscoverComponent = ({
    noBackSkipLogo,
    group,
    onContinueClick,
    selected,
    onSkip,
    onBack,
}: {
    noBackSkipLogo?: boolean;
    group?: TagGroup | null;
    onContinueClick: (data: any) => void;
    selected: string[];
    onSkip?: (event: React.MouseEvent) => void;
    onBack?: (event: React.MouseEvent) => void;
}) => {
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

    const [shakeClassName, shake] = useShake();

    const onMyContinueClick = React.useCallback(() => {
        if (localSelected.length === 0) {
            shake();
            return;
        }
        onContinueClick(localSelected);
    }, [localSelected]);

    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const [isScrollable, setIsScrollable] = React.useState(false);
    React.useLayoutEffect(() => {
        if (!wrapperRef.current) {
            return;
        }
        if (wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, [group]);
    const isMobile = useIsMobile();

    useShortcuts({ keys: ['Enter'], callback: onMyContinueClick });

    if (!group) {
        return null;
    }

    const { title, subtitle } = group;

    return (
        <Wrapper ref={wrapperRef}>
            <XDocumentHead title={title!!} />
            {!noBackSkipLogo && <BackSkipLogo onBack={onBack} onSkip={onSkip} />}
            <FormLayout paddingTop={isMobile ? 56 : 72} paddingBottom={130}>
                <Title text={subtitle!!} />
                <TagsGroupPage
                    group={group}
                    selected={localSelected}
                    className={shakeClassName}
                    onPress={onTagPress}
                />
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

const Discover = ({
    noBackSkipLogo,
    previousChoisesMap,
    rootSelected,
    rootExclude,
    onContinueClick,
    onSkip,
    onBack,
    onChatsForYouSkip,
    onChatsForYouBack,
    onJoinChats,
}: {
    noBackSkipLogo?: boolean;
    previousChoisesMap: any;
    rootSelected: string[];
    rootExclude: string[];
    onContinueClick: (newSelected: any) => void;
    onSkip?: (a: { currentPageId: string; exclude: string[] }) => void;
    onBack?: (event: React.MouseEvent) => void;
    onChatsForYouSkip?: (event: React.MouseEvent) => void;
    onChatsForYouBack: (event: React.MouseEvent) => void;
    onJoinChats?: Function;
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
            return <XLoader loading={true} />;
        }
        return (
            <ChatsForYou
                onJoinChats={onJoinChats}
                onSkip={onChatsForYouSkip}
                onBack={onChatsForYouBack}
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
            noBackSkipLogo={noBackSkipLogo}
            onSkip={onSkip && onLocalSkip}
            onBack={onBack && onBack}
            group={currentPage.betaNextDiscoverPage!!.tagGroup!!}
            onContinueClick={localOnContinueClick}
            selected={finalSelected}
        />
    );
};
export const DiscoverStart = ({
    noSkipOnChatsForYou,
    noBackOnFirstScreen,
    noSkipOnFirstScreen,
    noBackSkipLogo,
    onJoinChats,
}: {
    noSkipOnChatsForYou?: boolean;
    noBackOnFirstScreen?: boolean;
    noSkipOnFirstScreen?: boolean;
    noBackSkipLogo?: boolean;
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

    return (
        <Discover
            onJoinChats={onJoinChats}
            noBackSkipLogo={noBackSkipLogo}
            onChatsForYouSkip={noSkipOnChatsForYou ? undefined : onChatsForYouSkip}
            onChatsForYouBack={onChatsForYouBack}
            onSkip={noSkipOnFirstScreen && rootState.length === 0 ? undefined : onSkip}
            onBack={noBackOnFirstScreen && rootState.length === 0 ? undefined : onBack}
            previousChoisesMap={previousChoisesMap}
            rootSelected={lastStateOrEmpty.selected}
            rootExclude={lastStateOrEmpty.exclude}
            onContinueClick={onContinueClick}
        />
    );
};

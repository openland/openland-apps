import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import * as qs from 'query-string';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XButton } from 'openland-x/XButton';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { TopBar } from '../components/TopBar';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { TagsCloud } from '../components/TagsCloud';
import { TagGroup, Tag } from '../components/TagButton';
import { ChatsForYou } from './chats-for-you.page';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

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
            flexGrow={0}
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

const wrapperClassName = css`
    width: 100%;
`;

const LocalDiscoverComponent = ({
    group,
    onContinueClick,
    selected,
    exclude,
    progressInPercents,
    onSkip,
    onBack,
}: {
    group?: TagGroup | null;
    onContinueClick: (data: any) => void;
    selected: string[];
    exclude: string[];
    progressInPercents: number;
    onSkip: (event: React.MouseEvent) => void;
    onBack: (event: React.MouseEvent) => void;
}) => {
    const router = React.useContext(XRouterContext)!;
    const isMobile = useIsMobile();
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

    const { title, subtitle } = group;
    return (
        <div className={wrapperClassName}>
            <XView
                backgroundColor="white"
                flexGrow={1}
                flexShrink={0}
                flexBasis={0}
                width="100%"
                height="100%"
            >
                <XView flexShrink={1} flexGrow={1} flexBasis={0}>
                    <XDocumentHead title="Choose role" />
                    <TopBar progressInPercents={progressInPercents} />
                    <XView marginTop={isMobile ? 15 : 34}>
                        <BackSkipLogo onBack={onBack} onSkip={onSkip} noLogo={!!isMobile} />
                    </XView>

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

                            <TagsGroupPage
                                group={group}
                                selected={localSelected}
                                onPress={onTagPress}
                            />
                            <div
                                className={cx(shadowClassName, isMobile && mobileShadowClassName)}
                            />
                            <XButton
                                flexShrink={0}
                                zIndex={2}
                                text="Continue"
                                style="primary"
                                size="large"
                                onClick={onMyContinueClick}
                            />
                        </XView>
                    </XView>
                </XView>
            </XView>
        </div>
    );
};

const arrowify = (value: string | string[]) => {
    return typeof value === 'string' ? [value] : value || [];
};

export const Discover = ({
    previousChoisesMap,
    rootSelected,
    rootExclude,
    onContinueClick,
    onSkip,
    onBack,
    onChatsForYouSkip,
    onChatsForYouBack,
}: {
    previousChoisesMap: any;
    rootSelected: string[];
    rootExclude: string[];
    onContinueClick: (newSelected: any) => void;
    onSkip: (event: React.MouseEvent) => void;
    onBack: (event: React.MouseEvent) => void;
    onChatsForYouSkip: (event: React.MouseEvent) => void;
    onChatsForYouBack: (event: React.MouseEvent) => void;
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

    // Hack to reset discover on /onboarding/discover page
    if (
        rootExclude.length === 0 &&
        discoverDone.betaIsDiscoverDone &&
        currentPage.betaNextDiscoverPage!!.tagGroup!!
    ) {
        client.mutateBetaNextDiscoverReset().then(() => {
            client.refetchSuggestedRooms().then(() => {
                client.refetchDiscoverIsDone();
            });
        });
        return null;
    }

    if (!currentPage.betaNextDiscoverPage!!.tagGroup!! || discoverDone.betaIsDiscoverDone) {
        if (!discoverDone.betaIsDiscoverDone) {
            return <XLoader />;
        }
        return <ChatsForYou onSkip={onChatsForYouSkip} onBack={onChatsForYouBack} />;
    }

    const currentPageId = currentPage.betaNextDiscoverPage!!.tagGroup!!.id;

    const newExclude = [...new Set<string>([...rootExclude, currentPageId]).values()];

    let finalSelected = rootSelected;

    if (previousChoisesMap[currentPageId]) {
        finalSelected = [
            ...new Set<string>([...rootSelected, ...previousChoisesMap[currentPageId]]).values(),
        ];
    }

    const localOnContinueClick = async (newSelected: string[]) => {
        await onContinueClick({
            selected: newSelected,
            exclude: newExclude,
            currentPageId,
        });
    };

    return (
        <LocalDiscoverComponent
            onSkip={onSkip}
            onBack={onBack}
            group={currentPage.betaNextDiscoverPage!!.tagGroup!!}
            onContinueClick={localOnContinueClick}
            selected={finalSelected}
            exclude={rootExclude}
            progressInPercents={getPercentageOfOnboarding(7 + rootExclude.length)}
        />
    );
};

export const DiscoverOnLocalState = () => {
    const client = useClient();
    const [previousChoisesMap, setPreviousChoisesMap] = React.useState<any>({});

    const [rootState, setRootState] = React.useState<{ selected: string[]; exclude: string[] }[]>(
        [],
    );

    const onContinueClick = async (props: {
        selected: string[];
        exclude: string[];
        currentPageId: string;
    }) => {
        setPreviousChoisesMap({
            ...previousChoisesMap,
            [props.currentPageId]: props.selected,
        });

        const newRootState = [
            ...rootState,
            {
                selected: props.selected,
                exclude: props.exclude,
            },
        ];

        setRootState(newRootState);
    };

    const onSkip = () => {
        //
    };

    const onBack = () => {
        if (rootState.length !== 0) {
            const cloneRootState = [...rootState];
            cloneRootState.pop();
            setRootState(cloneRootState);
        }
    };

    const onChatsForYouSkip = () => {
        //
    };

    const onChatsForYouBack = async () => {
        await client.mutateBetaNextDiscoverReset();
        await client.refetchSuggestedRooms();
        await client.refetchDiscoverIsDone();

        onBack();
    };

    const getLastStateOrEmpty = () => {
        if (rootState.length === 0) {
            return { selected: [], exclude: [] };
        }
        return rootState[rootState.length - 1];
    };

    const lastStateOrEmpty = getLastStateOrEmpty();

    return (
        <Discover
            onChatsForYouSkip={onChatsForYouSkip}
            onChatsForYouBack={onChatsForYouBack}
            onSkip={onSkip}
            onBack={onBack}
            previousChoisesMap={previousChoisesMap}
            rootSelected={lastStateOrEmpty.selected}
            rootExclude={lastStateOrEmpty.exclude}
            onContinueClick={onContinueClick}
        />
    );
};

const DiscoverOnRouter = () => {
    const client = useClient();
    const router = React.useContext(XRouterContext)!;

    const { exclude, selected } = router.query;

    const [previousChoisesMap, setPreviousChoisesMap] = React.useState<any>({});
    const [rootSelected, setRootSelected] = React.useState<string[]>(() => arrowify(selected));
    const [rootExclude, setRootExclude] = React.useState<string[]>(() => arrowify(selected));

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    React.useEffect(
        () => {
            if (!discoverDone.betaIsDiscoverDone) {
                setRootSelected(arrowify(selected));
                setRootExclude(arrowify(exclude));
            }
        },
        [router.query.selected, router.query.exclude],
    );

    const onContinueClick = async (props: {
        selected: string[];
        exclude: string[];
        currentPageId: string;
    }) => {
        setPreviousChoisesMap({
            ...previousChoisesMap,
            [props.currentPageId]: props.selected,
        });

        router.push(
            `/onboarding/discover?${qs.stringify({
                selected: props.selected,
                exclude: props.exclude,
            })}`,
        );
    };

    const onSkip = () => {
        router.push('/');
    };

    const onBack = () => {
        if (exclude.length === 0) {
            router.replace('/onboarding/start');
        } else {
            if (canUseDOM) {
                window.history.back();
            }
        }
    };

    const onChatsForYouSkip = () => {
        router.push('/');
    };
    const onChatsForYouBack = async () => {
        await client.mutateBetaNextDiscoverReset();
        await client.refetchSuggestedRooms();
        await client.refetchDiscoverIsDone();

        if (canUseDOM) {
            window.history.back();
        }
    };

    return (
        <Discover
            onChatsForYouSkip={onChatsForYouSkip}
            onChatsForYouBack={onChatsForYouBack}
            onSkip={onSkip}
            onBack={onBack}
            previousChoisesMap={previousChoisesMap}
            rootSelected={rootSelected}
            rootExclude={rootExclude}
            onContinueClick={onContinueClick}
        />
    );
};

export default withApp('Home', 'viewer', () => <DiscoverOnLocalState />);

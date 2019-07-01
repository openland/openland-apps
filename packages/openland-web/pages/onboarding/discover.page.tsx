import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
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

const shadowClassName = css`
    width: 350px;
    height: 200px;
    position: absolute;
    bottom: -70px;
    margin: auto;
    pointer-events: none;
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
        <XScrollView3 marginBottom={-110} flexGrow={0} flexShrink={1}>
            <XView paddingHorizontal={18} paddingBottom={100}>
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
    group,
    onContinueClick,
    selected,
    exclude,
    progressInPercents,
}: {
    group?: TagGroup | null;
    onContinueClick: (data: any) => void;
    selected: string[];
    exclude: string[];
    progressInPercents: number;
}) => {
    const router = React.useContext(XRouterContext)!;

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
        <XView backgroundColor="white" flexGrow={1} flexShrink={1} maxHeight="100vh">
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={progressInPercents} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        if (exclude.length === 0) {
                            router.replace('/onboarding/start');
                        }
                        if (canUseDOM) {
                            window.history.back();
                        }
                    }}
                    onSkip={() => {
                        router.push('/');
                    }}
                />
            </XView>

            <XView
                alignItems="center"
                flexGrow={1}
                flexShrink={1}
                justifyContent="center"
                marginTop={100}
                marginBottom={70}
            >
                <XView
                    flexDirection="column"
                    alignSelf="center"
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
                    <div className={shadowClassName} />
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
    );
};

export const Discover = () => {
    const router = React.useContext(XRouterContext)!;
    const client = useClient();
    const modalBox = React.useContext(XModalBoxContext);

    const { exclude, selected } = router.query;

    const arrowify = (value: string | string[]) => {
        return typeof value === 'string' ? [value] : value || [];
    };

    const [rootSelected, setRootSelected] = React.useState<string[]>(() => arrowify(selected));
    const [rootExclude, setRootExclude] = React.useState<string[]>(() => arrowify(selected));

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    React.useEffect(() => {
        if (!discoverDone.betaIsDiscoverDone) {
            setRootSelected(arrowify(selected));
            setRootExclude(arrowify(exclude));
        }
    }, [router.query.selected, router.query.exclude]);

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
        return <ChatsForYou />;
    }

    const newExclude = [
        ...new Set<string>([
            ...rootExclude,
            currentPage.betaNextDiscoverPage!!.tagGroup!!.id,
        ]).values(),
    ];

    const onContinueClick = async (newSelected: any) => {
        if (!modalBox) {
            router.push(
                `/onboarding/discover?${qs.stringify({
                    selected: newSelected,
                    exclude: newExclude,
                })}`,
            );
        }
    };

    return (
        <LocalDiscoverComponent
            group={currentPage.betaNextDiscoverPage!!.tagGroup!!}
            onContinueClick={onContinueClick}
            selected={rootSelected}
            exclude={rootExclude}
            progressInPercents={getPercentageOfOnboarding(7 + rootExclude.length)}
        />
    );
};
export default withApp('Home', 'viewer', () => <Discover />);

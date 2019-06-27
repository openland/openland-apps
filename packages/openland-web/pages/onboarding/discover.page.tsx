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
import { TagGroup } from '../components/TagButton';
import { ChatsForYou } from './chats-for-you.page';

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
    selected: Set<string>;
    exclude: Set<string>;
    setSelectedTagsIds: (a: Set<string>) => void;
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
                    onSelectedChange={props.setSelectedTagsIds}
                />
            </XView>
        </XScrollView3>
    );
};

const arrowify = (value: string | string[]) => {
    return typeof value === 'string' ? [value] : value || [];
};

const LocalDiscoverComponent = ({
    group,
    onContinueClick,
    graphState,
    progressInPercents,
}: {
    group?: TagGroup | null;
    onContinueClick: (data: any) => void;
    graphState: { selected: any; exclude: any };
    progressInPercents: number;
}) => {
    const router = React.useContext(XRouterContext)!;
    const [localState, setLocalState] = React.useState(graphState);

    if (!group) {
        return null;
    }

    const onMyContinueClick = React.useCallback(
        () => {
            onContinueClick(localState);
        },
        [localState],
    );

    const { title, subtitle } = group;
    return (
        <XView backgroundColor="white" flexGrow={1} flexShrink={1} maxHeight="100vh">
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={progressInPercents} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        // TODO back
                        // remove external node
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

                    <TagsGroupPage
                        group={group}
                        exclude={localState.exclude}
                        selected={localState.selected}
                        setSelectedTagsIds={value => {
                            setLocalState({
                                ...localState,
                                selected: new Set<string>(value.values()),
                            });
                        }}
                    />
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

export default withApp('Home', 'viewer', () => {
    const router = React.useContext(XRouterContext)!;
    const client = useClient();

    const { exclude, selected } = router.query;

    const [rootState, setRootState] = React.useState({
        selected: new Set<string>(arrowify(selected)),
        exclude: new Set<string>(arrowify(exclude)),
    });

    let discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    let currentPage = client.useDiscoverNextPage(
        {
            selectedTagsIds: [...rootState.selected.values()],
            excudedGroupsIds: [...rootState.exclude.values()],
        },
        { fetchPolicy: 'network-only' },
    );

    if (!currentPage.betaNextDiscoverPage!!.tagGroup!! || discoverDone.betaIsDiscoverDone) {
        return <ChatsForYou />;
    }

    const nextLocalState = {
        selected: rootState.selected,
        exclude: new Set<string>([
            ...rootState.exclude.values(),
            currentPage.betaNextDiscoverPage!!.tagGroup!!.id,
        ]),
    };

    let onContinueClick = async (data: any) => {
        router.push(
            `/onboarding/discover?${qs.stringify({
                selected: [...rootState.selected.values(), ...data.selected.values()],
                exclude: [...rootState.exclude.values(), ...data.exclude.values()],
            })}`,
        );

        setRootState({
            ...nextLocalState,
            selected: new Set<string>([
                ...nextLocalState.selected.values(),
                ...data.selected.values(),
            ]),
        });
    };

    return (
        <LocalDiscoverComponent
            group={currentPage.betaNextDiscoverPage!!.tagGroup!!}
            onContinueClick={onContinueClick}
            graphState={nextLocalState}
            progressInPercents={getPercentageOfOnboarding(7 + rootState.exclude.size)}
        />
    );
});

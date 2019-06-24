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
import { TagsCloud } from './components/TagsCloud';
import { TagGroup } from './components/TagButton';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

const TagsGroupPage = (props: {
    group?: TagGroup | null;
    selected: Set<string>;
    exclude: Set<string>;
}) => {
    let [selected, setCurretnSelected] = React.useState(props.selected);
    let onSelectedChange = React.useCallback((s: Set<string>) => {
        setCurretnSelected(new Set(s));
    }, []);

    if (!props.group) {
        return null;
    }

    // let { title, subtitle } = props.group;

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

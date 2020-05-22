import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import Lorem from 'react-lorem-component';
import { TextStyles } from 'openland-web/utils/TextStyles';
// import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
// import { useClient } from 'openland-api/useClient';

type DiscussionDef = {
    hub: string;
    title: string;
    text: any;
};

const discussions: DiscussionDef[] = [{
    hub: 'Openland news',
    title: 'Openland: a year in review',
    text: <Lorem count={5} />
}, {
    hub: 'Immigration',
    title: 'Any immigration attorney recomendation?',
    text: 'I am trying to find a good attorney to move to bay area can someone recommend someone?'
}];

const DiscussionComponent = React.memo((props: { data: DiscussionDef }) => {
    // let client = useClient();
    // let account = client.useAccount();
    return (
        <XView flexDirection="column" paddingBottom={48}>
            <XView {...TextStyles.Subhead} opacity={0.7} paddingBottom={4}>
                {props.data.hub.toUpperCase()}
            </XView>
            <XView flexDirection="row">
                <XView {...TextStyles.Title1} paddingBottom={16} fontSize={38} fontWeight="400">
                    {props.data.title}
                </XView>
            </XView>
            {/* <XView flexDirection="row" paddingTop={16} alignItems="center">
                <UAvatar
                    title={account.me!.name}
                    photo={account.me!.photo}
                    id={account.me!.id}
                    size="small"
                />
                <XView flexDirection="column">
                    <XView {...TextStyles.Body} paddingLeft={6}>
                        Steve Kite
                    </XView>
                    <XView {...TextStyles.Subhead} paddingLeft={6}>
                        22 May
                    </XView>
                </XView>
            </XView> */}
            <XView {...TextStyles.Body}>
                {props.data.text}
            </XView>
        </XView>
    );
});

export const DiscussionsFragment = React.memo(() => {
    return (
        <>
            <UHeader title="All discussions" appearance="wide" />
            <XScrollView3 flexGrow={1} flexShrink={1} alignSelf="stretch" alignItems="stretch">
                <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
                    <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                        {discussions.map((d, i) => (
                            <DiscussionComponent
                                key={'d' + i}
                                data={d}
                            />
                        ))}
                    </XView>
                </XView>
            </XScrollView3>
        </>
    );
});
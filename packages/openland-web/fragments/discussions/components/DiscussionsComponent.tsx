import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-api/useClient';
import { DiscussionSimple } from 'openland-api/spacex.types';
import { ParagraphComponent } from './ParagraphComponent';

const DiscussionComponent = React.memo((props: { data: DiscussionSimple }) => {
    // let client = useClient();
    // let account = client.useAccount();
    return (
        <XView flexDirection="column" paddingBottom={48}>
            <XView {...TextStyles.Subhead} opacity={0.7} paddingBottom={4}>
                {props.data.hub!.title.toUpperCase()}
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
                {props.data.content.map((v, i) => <ParagraphComponent data={v} key={'span-' + i} />)}
            </XView>
        </XView>
    );
});

export const DiscussionsComponent = React.memo((props: { hubs: string[] | null }) => {
    const client = useClient();
    const discussions = client.useDiscussions({ hubs: props.hubs || [] }, { fetchPolicy: 'network-only' }).discussions;
    return (
        <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
            {discussions.items.map((d, i) => (
                <DiscussionComponent
                    key={d.id}
                    data={d}
                />
            ))}
        </XView>
    );
});
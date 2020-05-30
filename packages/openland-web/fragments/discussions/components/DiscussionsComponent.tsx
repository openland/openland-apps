import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { DiscussionComponent } from './DiscussionComponent';
import DetectiveIC from 'openland-icons/emoji/detective.svg';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';

const scaleSVG = css`
    > svg {
        width: 100%;
        height: 100%;
    }
`;

export const DiscussionsComponent = React.memo((props: { hubs: string[] | null }) => {
    const client = useClient();
    const discussions = client.useDiscussions({ hubs: props.hubs || [] }, { fetchPolicy: 'network-only' }).discussions;
    if (discussions.items.length === 0) {
        return (
            <XView flexGrow={1} flexShrink={1} maxWidth={824} alignItems="stretch" justifyContent="center" flexDirection="column">
                <XView maxHeight={256} flexGrow={1} flexDirection="row" alignItems="stretch" justifyContent="center">
                    <XView maxWidth={256} flexGrow={1}>
                        <div className={scaleSVG}>
                            <DetectiveIC />
                        </div>
                    </XView>
                </XView>
            </XView>
        );
    }
    return (
        <XScrollView3 flexGrow={1} flexShrink={1} alignSelf="stretch" alignItems="stretch">
            <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56} flexGrow={1}>
                <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                    <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                        {discussions.items.map((d, i) => (
                            <DiscussionComponent
                                key={d.id}
                                data={d}
                            />
                        ))}
                    </XView>
                </XView>
            </XView>
        </XScrollView3>
    );
});
import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
const textClassName = css`
    white-space: pre;
`;

export const FeedListComponent = () => {
    const client = useClient();
    const feed = client.useFeedHome({ fetchPolicy: 'cache-and-network' }).homeFeed;
    return (
        <XView flexGrow={1} flexShrink={0} minHeight={0} alignSelf="stretch" minWidth={0}>
            <XScrollView>
                {feed.map(v => (
                    <XView
                        key={v.id}
                        borderRadius={12}
                        borderWidth={1}
                        borderColor="#ececec"
                        marginHorizontal={16}
                        marginBottom={16}
                        padding={16}
                        alignItems="stretch"
                    >
                        <XView flexDirection="row">
                            <XAvatar2 title={v.by.name} id={v.by.id} src={v.by.photo} size={40} />
                            <XView paddingLeft={16}>
                                <XView>{v.by.name}</XView>
                                <XView>
                                    <XDate value={v.date} format="humanize_cute" />
                                </XView>
                            </XView>
                        </XView>
                        <XView>
                            <div className={textClassName}>{v.text}</div>
                        </XView>
                    </XView>
                ))}
            </XScrollView>
        </XView>
    );
};

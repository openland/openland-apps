import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { FeedChannelsSearch } from '../main/components/FeedChannelsSearch';
// import { ZListGroup } from 'openland-mobile/components/ZListGroup';
// import { useClient } from 'openland-mobile/utils/useClient';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
// import { ChannelView } from '../main/components/ChannelView';
import { SScrollView } from 'react-native-s/SScrollView';

const FeedChannelsComponent = React.memo((props: PageProps) => {
    // const client = useClient();
    // const following = client.useFeedSubscriptions({ fetchPolicy: 'network-only' }).channels;
    // const suggested = client.useFeedRecommendedChannels({ first: 10 }, { fetchPolicy: 'cache-and-network' }).search.edges;

    return (
        <>
            <SHeader title="Channels" />
            <SHeaderButton title="Create" icon={require('assets/ic-add-24.png')} onPress={() => props.router.push('FeedChannelCreate')} />

            <SSearchControler
                searchRender={(p) => (
                    <FeedChannelsSearch
                        query={p.query}
                        router={props.router}
                    />
                )}
            >
                <SScrollView>
                    {/*<ZListGroup header="Following" headerMarginTop={0}>*/}
                    {/*    {following.map(channel => <ChannelView key={channel.id} channel={channel} />)}*/}
                    {/*</ZListGroup>*/}
                    {/*<ZListGroup header="Suggested" headerMarginTop={following.length <= 0 ? 0 : undefined}>*/}
                    {/*    {suggested.map(s => <ChannelView key={s.node.id} channel={s.node} />)}*/}
                    {/*</ZListGroup>*/}
                </SScrollView>
            </SSearchControler>
        </>
    );
});

export const FeedChannels = withApp(FeedChannelsComponent, { navigationAppearance: 'large' });

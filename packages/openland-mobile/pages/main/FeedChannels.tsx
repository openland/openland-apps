import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { FeedChannelsSearch } from './components/FeedChannelsSearch';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useClient } from 'openland-mobile/utils/useClient';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { plural } from 'openland-y-utils/plural';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

const FeedChannelsComponent = React.memo((props: PageProps) => {
    const client = useClient();
    const followingChannels = client.useFeedMyChannels({ first: 15 }, { fetchPolicy: 'cache-and-network' }).channels.items;

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
                    <ZListGroup header="Following" headerMarginTop={0}>
                        {followingChannels.map(channel => (
                            <ZListItem
                                key={channel.id}
                                text={channel.title}
                                leftAvatar={{
                                    photo: channel.photo,
                                    key: channel.id,
                                    title: channel.title,
                                }}
                                subTitle={plural(channel.subscribersCount, ['follower', 'followers'])}
                                path="FeedChannel"
                                pathParams={{ id: channel.id }}
                            />
                        ))}
                    </ZListGroup>
                    <ZListGroup header="Suggested" />
                </SScrollView>
            </SSearchControler>
        </>
    );
});

export const FeedChannels = withApp(FeedChannelsComponent, { navigationAppearance: 'large' });

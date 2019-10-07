import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { EntityHeader } from './components/EntityHeader';
import { plural } from 'openland-y-utils/plural';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { FeedChannelAdminRole } from 'openland-api/Types';

const FeedChannelComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const { title, photo, subscribersCount, subscribed, myRole } = channel;
    const canPost = myRole === FeedChannelAdminRole.Creator || myRole === FeedChannelAdminRole.Editor;

    return (
        <>
            <SHeaderView>
                <EntityHeader
                    avatar={{ photo, title, id }}
                    title={title}
                    subtitle={plural(subscribersCount, ['follower', 'followers'])}
                    onPress={() => router.push('FeedChannelProfile', { id })}
                />
            </SHeaderView>

            {!subscribed && <SHeaderButton key="btn-follow" title="Follow" onPress={() => FeedHandlers.ChannelSubscribe(id)} />}
            {subscribed && canPost && <SHeaderButton key="btn-create" title="Create" icon={require('assets/ic-add-24.png')} onPress={() => router.push('FeedCreate')} />}
            {subscribed && !canPost && <SHeaderButton key="btn-empty" />}
        </>
    );
});

export const FeedChannel = withApp(FeedChannelComponent, { navigationAppearance: 'small' });

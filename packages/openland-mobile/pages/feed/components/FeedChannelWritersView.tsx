import * as React from 'react';
import { useClient } from 'openland-mobile/utils/useClient';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { UserView } from '../../main/components/UserView';
import { FeedChannelSubscriberRole, FeedChannelFull } from 'openland-api/Types';
import { SRouter } from 'react-native-s/SRouter';

interface FeedChannelWritersViewProps {
    channel: FeedChannelFull;
    router: SRouter;
}

export const FeedChannelWritersView = React.memo((props: FeedChannelWritersViewProps) => {
    const client = useClient();
    const { channel, router } = props;
    const { id, myRole } = channel;
    const writers = client.useFeedChannelWriters({ id, first: 3 }, { fetchPolicy: 'network-only' }).writers;

    return (
        <ZListGroup
            header="Writers"
            counter={writers.items.length}
            actionRight={writers.cursor ? { title: 'See all', onPress: () => router.push('FeedChannelWriters', { id }) } : undefined}
        >
            {myRole === FeedChannelSubscriberRole.Creator && (
                <ZListItem
                    leftIcon={require('assets/ic-add-glyph-24.png')}
                    text="Add writer"
                    onPress={() => router.present('FeedChannelAddWriter', { id })}
                />
            )}
            {writers.items.map(writer => (
                <UserView
                    user={writer.user}
                    channelRole={writer.role}
                    onPress={() => router.push('ProfileUser', { id: writer.user.id })}
                />
            ))}
        </ZListGroup>
    );
});
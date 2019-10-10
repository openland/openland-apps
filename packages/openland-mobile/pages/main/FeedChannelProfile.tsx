import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { ZListHero } from 'openland-mobile/components/ZListHero';
import { plural } from 'openland-y-utils/plural';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SHeader } from 'react-native-s/SHeader';
import { Platform } from 'react-native';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { SScrollView } from 'react-native-s/SScrollView';
import { UserView } from './components/UserView';
import { FeedChannelSubscriberRole } from 'openland-api/Types';

const FeedChannelProfileComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const { title, about, photo, subscribersCount, subscribed, myRole } = channel;

    const writers = client.useFeedChannelAdmins({ id, first: 3 }, { fetchPolicy: 'cache-and-network' }).admins;

    const handleAddWriter = React.useCallback(() => {
        router.present('FeedChannelAddWriter', { id });
    }, [id]);

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : title} />
            <ZManageButton onPress={() => FeedHandlers.ChannelManage(channel)} />

            <SScrollView>
                <ZListHero
                    photo={photo}
                    id={id}
                    title={title}
                    subtitle={plural(subscribersCount, ['follower', 'followers'])}
                    action={!subscribed ? {
                        title: 'Follow',
                        onPress: () => FeedHandlers.ChannelSubscribe(id)
                    } : undefined}
                />

                <ZListGroup header="About" headerMarginTop={0}>
                    {about && (
                        <ZListItem multiline={true} text={about} copy={true} />
                    )}
                </ZListGroup>

                <ZListGroup
                    header="Writers"
                    counter={writers.items.length}
                    actionRight={writers.cursor ? { title: 'See all', onPress: () => props.router.push('FeedChannelWriters', { id }) } : undefined}
                >
                    {myRole === FeedChannelSubscriberRole.Creator && (
                        <ZListItem
                            leftIcon={require('assets/ic-add-glyph-24.png')}
                            text="Add writer"
                            onPress={handleAddWriter}
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
            </SScrollView>
        </>
    );
});

export const FeedChannelProfile = withApp(FeedChannelProfileComponent, { navigationAppearance: 'small-hidden' });

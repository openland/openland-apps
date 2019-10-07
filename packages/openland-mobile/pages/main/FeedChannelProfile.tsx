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

const FeedChannelProfileComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const { title, about, photo, subscribersCount, subscribed } = channel;

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
            </SScrollView>
        </>
    );
});

export const FeedChannelProfile = withApp(FeedChannelProfileComponent, { navigationAppearance: 'small-hidden' });

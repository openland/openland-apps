import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { FeedAuthorHeader } from 'openland-mobile/feed/components/FeedAuthorHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { FeedPostContent } from 'openland-mobile/feed/content/FeedPostContent';
import { convertSlides } from 'openland-engines/feed/convert';
import { Dimensions, View } from 'react-native';

const FeedItemComponent = React.memo((props: PageProps) => {
    const id = props.router.params.id;
    const client = getClient();
    const item = client.useFeedItem({ id }, { fetchPolicy: 'cache-and-network' }).item;

    if (!item || item.__typename !== 'FeedPost') {
        return null;
    }

    const { canEdit, author, date, slides } = item;
    const slidesProcessed = React.useMemo(() => convertSlides(slides), [slides]);
    const width = Dimensions.get('screen').width;

    return (
        <>
            <SHeaderView>
                <FeedAuthorHeader author={author} date={parseInt(date, 10)} />
            </SHeaderView>

            <ZManageButton onPress={() => FeedHandlers.Manage(id, canEdit)} />

            <SScrollView>
                <View height={8} />
                <FeedPostContent
                    slides={slidesProcessed}
                    width={width}
                />
            </SScrollView>
        </>
    );
});

export const FeedItem = withApp(FeedItemComponent, { navigationAppearance: 'small' });

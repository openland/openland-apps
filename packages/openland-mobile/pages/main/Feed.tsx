import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Post } from './components/feed/Post';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SFlatList } from 'react-native-s/SFlatList';

const FeedPage = (props: PageProps) => {
    const feed = getClient().useGlobalFeedHome({ fetchPolicy: 'cache-and-network' });

    return (
        <>
            <SHeader title="Feed" />
            <SHeaderButton title="New" icon={require('assets/ic-add-24.png')} onPress={() => props.router.present('CreatePost')} />
            <SFlatList
                data={feed.homeFeed}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    if (!item.content || !item.content.message) {
                        return null;
                    }

                    return (
                        <Post post={item.content.message} />
                    );
                }}

            />
        </>
    );
};

export const Feed = withApp(FeedPage, { navigationAppearance: 'large' });

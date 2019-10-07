import * as React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SRouter } from 'react-native-s/SRouter';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { useClient } from 'openland-mobile/utils/useClient';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { plural } from 'openland-y-utils/plural';

interface FeedChannelsSearchProps {
    query: string;
    router: SRouter;
}

const FeedChannelsSearchInner = (props: FeedChannelsSearchProps) => {
    const client = useClient();
    const theme = React.useContext(ThemeContext);
    const items = client.useFeedChannelsSearch({ query: props.query, first: 30 }).search.edges;

    return (
        <>
            {items.length === 0 && (
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: theme.foregroundPrimary }}>
                        Nothing found {randomEmptyPlaceholderEmoji()}
                    </Text>
                </View>
            )}
            {items.map((item, index) => {
                const { id, title, photo, subscribersCount } = item.node;

                return (
                    <ZListItem
                        key={`search-item-${index}-${id}`}
                        text={title}
                        leftAvatar={{
                            photo: photo,
                            key: id,
                            title: title,
                        }}
                        subTitle={plural(subscribersCount, ['follower', 'followers'])}
                        path="FeedChannel"
                        pathParams={{ id: id }}
                    />
                );
            })}
        </>
    );
};

export const FeedChannelsSearch = XMemo<FeedChannelsSearchProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const query = props.query.trim();

    return (
        <SScrollView>
            <ASSafeAreaContext.Consumer>
                {area => (
                    <View minHeight={Dimensions.get('screen').height - area.top - area.bottom} backgroundColor={theme.backgroundPrimary}>
                        <React.Suspense fallback={SNativeConfig.loader}>
                            {query.length > 0 && <FeedChannelsSearchInner {...props} />}
                        </React.Suspense>
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </SScrollView>
    );
});
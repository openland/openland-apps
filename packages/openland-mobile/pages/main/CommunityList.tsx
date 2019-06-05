import * as React from 'react';
import * as Types from '../../../openland-api/Types'
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Text } from 'react-native';

const CommunityListComponent = React.memo<PageProps>((props) => {
    let initial = props.router.params.initial as Types.ExploreCommunity_items_edges_node[];

    let [communities, setCommunities] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [needMore, setNeedMore] = React.useState(true);
    const [cursor, setCursor] = React.useState(undefined as string | undefined);
    let handleLoadMore = React.useCallback(async () => {
        if (!loading && needMore) {
            setLoading(true);
            let res = (await getClient().queryExploreCommunity({ after: cursor, featuredIfEmptyQuery: false }, { fetchPolicy: 'network-only' }));
            let needMo = false;
            if (res.items.edges.length === 25) {
                let last = res.items.edges[res.items.edges.length - 1];
                if (last) {
                    setCursor(last.cursor);
                    needMo = true;
                }
            }

            setNeedMore(needMo)

            setCommunities([...communities, ...res.items.edges.filter(c => !initial.find(i => i.id === c.node.id)).map(n => n.node)])
            setLoading(false);
        }

    }, [communities, loading]);

    return (
        <>
            <SHeader title={props.router.params.title} />
            <SDeferred>
                <SFlatList
                    data={communities}
                    renderItem={({ item }) => (
                        <ZListItem
                            key={item.id}
                            text={item.name}
                            leftAvatar={{
                                photo: item.photo,
                                key: item.id,
                                title: item.name,
                            }}
                            subTitle={<>{item.betaPublicRooms.length + (item.betaPublicRooms.length === 1 ? 'group' : ' groups')}<Text style={{ opacity: 0.5 }}> ∙</Text> {item.membersCount + (item.membersCount === 1 ? 'member' : ' members')}</>}
                            navigationIcon={false}
                            path="ProfileOrganization"
                            pathParams={{ id: item.id }}
                        />
                    )}
                    keyExtractor={(item, index) => index + '-' + item.id}
                    onEndReached={handleLoadMore}
                    refreshing={loading}
                />
            </SDeferred>
        </>
    );
});

export const CommunityList = withApp(CommunityListComponent);
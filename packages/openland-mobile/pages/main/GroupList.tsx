import * as React from 'react';
import * as Types from '../../../openland-api/Types';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';

const GroupListComponent = React.memo<PageProps>((props) => {
    let initial = props.router.params.initial as Types.AvailableRooms_availableChats_edges_node[];
    let {query} = props.router.params;

    let [rooms, setRooms] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState(props.router.params.after as string);
    let handleLoadMore = React.useCallback(async () => {
        if (!loading && !!after) {
            setLoading(true);
            let res = (await getClient().queryUserAvailableRooms({ after, first: 10, query }, { fetchPolicy: 'network-only' })).alphaUserAvailableRooms;
            let newAfter = res.edges[res.edges.length - 1].cursor;
            if (res.pageInfo.hasNextPage) {
                setAfter(newAfter);
            } else {
                setAfter('');
            }
            setRooms([...rooms, ...res.edges.map(x => x.node)]);
            setLoading(false);
        }

    }, [rooms, loading]);

    return (
        <>
            <SHeader title={props.router.params.title} />
            <SDeferred>
                <SFlatList
                    data={rooms}
                    renderItem={({ item }) => (
                        <ZListItem
                            key={item.id}
                            text={item.title}
                            leftAvatar={{
                                photo: item.photo,
                                key: item.id,
                                title: item.title,
                            }}
                            subTitle={item.membersCount + (item.membersCount === 1 ? ' member' : ' members')}
                            path="Conversation"
                            pathParams={{ flexibleId: item.id }}
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

export const GroupList = withApp(GroupListComponent);
import * as React from 'react';
import * as Types from '../../../openland-api/Types'
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { getClient } from 'openland-mobile/utils/graphqlClient';

const GroupListComponent = React.memo<PageProps>((props) => {
    let initial = props.router.params.initial as Types.AvailableRooms_availableChats[];
    let isChannel = props.router.params.isChannel;

    let [rooms, setRooms] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [needMore, setNeedMore] = React.useState(!!props.router.params.query);
    let handleLoadMore = React.useCallback(async () => {
        if (!loading && needMore) {
            setLoading(true);
            let res;
            res = (await getClient().queryUserAvailableRooms({ after: rooms[rooms.length - 1].id, limit: 10, isChannel: isChannel }, { fetchPolicy: 'network-only' })).betaUserAvailableRooms;

            if (!res.length) {
                setNeedMore(false);
            }
            setRooms([...rooms, ...res])
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
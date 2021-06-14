import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useText } from 'openland-mobile/text/useText';

const UserMutualGroupsComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const { t } = useText();
    const { userId } = props.router.params;
    const mutualGroups = client.useCommonChatsWithUser({ uid: userId, first: 3 }, { fetchPolicy: 'cache-and-network' }).commonChatsWithUser;

    const [groups, setGroups] = React.useState(mutualGroups.items);
    const [after, setAfter] = React.useState(mutualGroups.cursor);
    const [loading, setLoading] = React.useState(false);

    const handleLoadMore = async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const { items, cursor } = (await client.queryCommonChatsWithUser({ uid: userId, first: 10, after })).commonChatsWithUser;
        setAfter(cursor);
        setGroups(prev => prev.concat(items));
        setLoading(false);
    };

    return (
        <>
            <SHeader title={t('mutualGroups', 'Mutual groups')} />
            <SFlatList
                data={groups}
                renderItem={({ item }) => (
                    <ZListItem
                        leftAvatar={{ photo: item.photo, id: item.id, title: item.title }}
                        text={item.title}
                        subTitle={`${item.membersCount} ${t('member', { count: item.membersCount })}`}
                        path="Conversation"
                        pathParams={{ id: item.id }}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.id}
                onEndReached={() => handleLoadMore()}
                refreshing={loading}
            />
        </>
    );
});

export const UserMutualGroups = withApp(UserMutualGroupsComponent, { navigationAppearance: 'small-hidden' });

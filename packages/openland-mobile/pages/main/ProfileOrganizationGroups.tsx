import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { GroupView } from './components/GroupView';
import { SFlatList } from 'react-native-s/SFlatList';

const ProfileOrganizationGroupsComponent = XMemo<PageProps>((props) => {
    const client = getClient();
    const { organizationId } = props.router.params;
    const organizationRooms = client.useOrganizationPublicRooms({ organizationId, first: 3 }, { fetchPolicy: 'cache-and-network' }).organizationPublicRooms;

    const [rooms, setRooms] = React.useState(organizationRooms.items);
    const [after, setAfter] = React.useState(organizationRooms.cursor);
    const [loading, setLoading] = React.useState(false);

    const handleLoadMore = async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const loaded = await client.queryOrganizationPublicRooms({ organizationId, first: 10, after });
        const { items, cursor } = loaded.organizationPublicRooms;
        setAfter(cursor);
        setRooms(prev => prev.concat(items));
        setLoading(false);
    };

    return (
        <>
            <SHeader title={props.router.params.title || 'Groups'} />
            <SFlatList
                data={rooms}
                renderItem={({ item }) => (
                    <GroupView
                        key={item.id}
                        item={item}
                        photo={item.photo}
                        onPress={() => props.router.push('Conversation', { flexibleId: item.id })}
                    />
                )}
                keyExtractor={(item, index) => index + '-' + item.id}
                onEndReached={() => handleLoadMore()}
                refreshing={loading}
            />
        </>
    );
});

export const ProfileOrganizationGroups = withApp(ProfileOrganizationGroupsComponent, { navigationAppearance: 'small-hidden' });

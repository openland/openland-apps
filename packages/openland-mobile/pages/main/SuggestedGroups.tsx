import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SDeferred } from 'react-native-s/SDeferred';
import { SScrollView } from 'react-native-s/SScrollView';
import { Tag, getPreprocessedTags1, getPreprocessedTags2, resolveSuggestedChats } from 'openland-mobile/pages/main/discoverData';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { RoomShort } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const SuggestedGroupsPage = (props: PageProps) => {
    let [chats, setChats] = React.useState([] as RoomShort[]);
    let [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            let suggested = resolveSuggestedChats(props.router.params.selected);
            let res = await getClient().queryRooms({ ids: suggested.map(r => r.id) });
            setLoading(false);
            setChats(res.rooms);

        })()
    }, [])

    return (
        <>
            {loading && <ZLoader />}
            <SScrollView padding={18} justifyContent="flex-start" alignContent="center">
                {chats.map((item) => (
                    item.__typename === 'SharedRoom' && <ZListItem
                        key={item.id}
                        text={item.title}
                        leftAvatar={{
                            photo: item.photo,
                            key: item.id,
                            title: item.title,
                        }}
                        title={item.organization ? item.organization!.name : undefined}
                        description={item.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: item.id }}
                    />
                ))}
            </SScrollView>
        </>
    );
};

export const SuggestedGroups = withApp(SuggestedGroupsPage, { navigationAppearance: 'small-hidden' });

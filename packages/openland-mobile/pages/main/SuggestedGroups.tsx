import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SScrollView } from 'react-native-s/SScrollView';
import { resolveSuggestedChats } from 'openland-mobile/pages/main/discoverData';
import { RoomShort } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, TextStyle } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const SuggestedGroupsPage = (props: PageProps) => {
    let [chats, setChats] = React.useState([] as RoomShort[]);
    let [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            let suggested = resolveSuggestedChats(props.router.params.selected);
            let ids = suggested.map(r => r.id);
            let res = await getClient().queryRooms({ ids });
            setLoading(false);
            setChats(res.rooms);

        })()
    }, [])

    return (
        <>
            {loading && <ZLoader />}
            <SScrollView justifyContent="flex-start" alignContent="center">
                {chats.map((item) => (
                    item.__typename === 'SharedRoom' &&

                    <ZListItemBase
                        height={60}
                        path="Conversation"
                        pathParams={{ flexibleId: item.id }}
                        separator={false}
                        navigationIcon={true}
                    >
                        <View width={74} height={60} alignItems="center" justifyContent="center">
                            <ZAvatar
                                src={item.photo}
                                size={42}
                                placeholderKey={item.id}
                                placeholderTitle={item.title}
                            />
                        </View>
                        <View marginRight={10} marginTop={10} marginBottom={10} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    lineHeight: 19,
                                    height: 19,
                                    color: '#000',
                                    fontWeight: TextStyles.weight.medium
                                } as TextStyle}
                            >{item.title}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    marginTop: 5,
                                    fontSize: 13,
                                    lineHeight: 15,
                                    height: 15,
                                    color: '#99a2b0',
                                }}
                            >{item.membersCount + (item.membersCount === 1 ? ' members' : ' members')}
                            </Text>
                        </View>
                    </ZListItemBase>
                ))}
            </SScrollView>
        </>
    );
};

export const SuggestedGroups = withApp(SuggestedGroupsPage, { navigationAppearance: 'small-hidden' });

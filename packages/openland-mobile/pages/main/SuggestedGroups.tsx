import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SScrollView } from 'react-native-s/SScrollView';
import { resolveSuggestedChats } from 'openland-mobile/pages/main/discoverData';
import { RoomShort, RoomShort_SharedRoom } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, TextStyle, AsyncStorage } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { storeKeyNameFromField } from 'apollo-utilities';
import { Image } from 'react-native';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { select } from 'glamor';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { setDiscoverDone } from './Discover';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

const Chat = (props: { item: RoomShort_SharedRoom, selected: boolean, onPress: (chat: RoomShort) => void }) => {
    let onPress = React.useCallback(() => {
        props.onPress(props.item);
    }, [props.onPress]);
    return <ZListItemBase
        height={60}
        onPress={onPress}
        separator={false}
    >
        <View width={74} height={60} alignItems="center" justifyContent="center">
            <ZAvatar
                src={props.item.photo}
                size={42}
                placeholderKey={props.item.id}
                placeholderTitle={props.item.title}
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
            >{props.item.title}
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
            >{props.item.membersCount + (props.item.membersCount === 1 ? ' members' : ' members')}
            </Text>
        </View>

        <View style={{ width: 30, height: 30, marginRight: 16, borderRadius: 8, backgroundColor: props.selected ? '#e5f2fe' : '#0084fe', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            {props.selected && <Image source={require('assets/ic-checkmark.png')} style={{ tintColor: "#0084fe" }} />}
            {!props.selected && <Image source={require('assets/ic-add-24.png')} style={{ tintColor: "#fff" }} />}
        </View>
    </ZListItemBase>
}

const SuggestedGroupsPage = (props: PageProps) => {
    let [chats, setChats] = React.useState([] as RoomShort[]);
    let [selected, setSelected] = React.useState(new Set<string>());
    let [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            let suggested = resolveSuggestedChats(props.router.params.selected);
            let ids = suggested.map(r => r.id);
            let res = await getClient().queryRooms({ ids });
            setLoading(false);
            setSelected(new Set(res.rooms.map(r => r.id)));
            setChats(res.rooms);

        })()
    }, []);

    let onSelect = React.useCallback((room: RoomShort) => {
        let res = new Set(selected);
        if (res.has(room.id)) {
            res.delete(room.id);
        } else {
            res.add(room.id);
        }
        setSelected(res);

    }, [selected]);

    let onAdd = React.useCallback(() => {
        (async () => {
            startLoader();
            await getClient().mutateRoomsJoin({ roomsIds: [...selected.values()] })
            stopLoader();
            await setDiscoverDone(true);
            props.router.pushAndResetRoot('Home');
        })()
    }, [selected]);

    return (
        <>
            {loading && <ZLoader />}
            {<SHeaderButton title={'Done'} onPress={onAdd} />}
            <SScrollView justifyContent="flex-start" alignContent="center">
                {chats.map((item) => (
                    item.__typename === 'SharedRoom' &&
                    <Chat key={item.id} item={item} selected={selected.has(item.id)} onPress={onSelect} />
                ))}
            </SScrollView>
        </>
    );
};

export const SuggestedGroups = withApp(SuggestedGroupsPage, { navigationAppearance: 'small-hidden' });

import * as React from 'react';
import { SScrollView } from 'react-native-s/SScrollView';
import { RoomShort, RoomShort_SharedRoom } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { View, Text, TextStyle, Platform } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { CenteredHeader } from './components/CenteredHeader';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SRouter } from 'react-native-s/SRouter';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import LinearGradient from 'react-native-linear-gradient';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const Chat = (props: { item: RoomShort_SharedRoom, selected: boolean, onPress: (chat: RoomShort) => void }) => {
    let onPress = React.useCallback(() => {
        props.onPress(props.item);
    }, [props.onPress]);
    let theme = React.useContext(ThemeContext);
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
                    color: theme.textColor,
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
                    color: theme.textSecondaryColor,
                }}
            >{props.item.membersCount + (props.item.membersCount === 1 ? ' members' : ' members')}
            </Text>
        </View>

        <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={props.selected ? theme.accentColor : theme.backgroundColor} opacity={props.selected ? 1 : 0.8} borderColor={props.selected ? theme.accentColor : theme.accentDisabledColor} borderWidth={2} borderRadius={12} width={24} height={24} >
            {props.selected && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.textInverseColor }} />}
        </View>
    </ZListItemBase>
}

export const SuggestedChats = (props: { chats: RoomShort[], router: SRouter, selectedTagIds: string[] }) => {
    let [selected, setSelected] = React.useState(new Set<string>(props.chats.map(c => c.id)));
    let theme = React.useContext(ThemeContext);

    let onSelect = React.useCallback((room: RoomShort) => {
        let res = new Set(selected);
        if (res.has(room.id)) {
            res.delete(room.id);
        } else {
            res.add(room.id);
        }
        setSelected(res);

    }, [selected]);

    let toHome = React.useCallback(() => {
        props.router.pushAndResetRoot('Home');
    }, []);

    let skip = React.useCallback(() => {
        (async () => {
            toHome()
        })()
    }, []);

    let join = React.useCallback((selectedIds: string[]) => {
        (async () => {
            startLoader();
            await getClient().mutateRoomsJoin({ roomsIds: selectedIds })
            stopLoader();
            toHome()
        })()
    }, [])

    let onAdd = React.useCallback(() => {
        if (selected.size) {
            join([...selected.values()]);
        } else {
            toHome()
        }

    }, [selected]);

    let selectAll = React.useCallback(() => {
        setSelected(new Set<string>(props.chats.map(c => c.id)));
    }, [])

    return (
        <>
            <SHeader title={"Chats for you"} />
            <SHeaderButton title="Skip" onPress={skip} />
            <SScrollView justifyContent="flex-start" alignContent="center">
                <Text style={{ fontSize: 18, marginBottom: 20, marginHorizontal: 16, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{"Recommendations based on your answers"}</Text>
                <View flexDirection="row" style={{ height: 25, marginHorizontal: 16, marginVertical: 12, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            flexGrow: 1,
                            fontSize: 16,
                            color: theme.textSecondaryColor,
                            fontWeight: TextStyles.weight.medium
                        }}
                    >
                        {props.chats.length + (props.chats.length === 1 ? ' CHAT' : ' CHATS')}
                    </Text>
                    {selected.size !== props.chats.length && <ZRoundedButton style="secondary" title="select all" onPress={selectAll} />}
                </View>
                {props.chats.map((item) => (
                    item.__typename === 'SharedRoom' &&
                    <Chat key={item.id} item={item} selected={selected.has(item.id)} onPress={onSelect} />
                ))}
                <View height={120} />
            </SScrollView>
            <LinearGradient colors={[theme.transparent, theme.backgroundColor, theme.backgroundColor]} height={160} position="absolute" bottom={0} width="100%" justifyContent="center" alignItems="center" pointerEvents="none" />
            <ASSafeAreaContext.Consumer>
                {sa => (
                    <View alignContent="center" justifyContent="center" alignSelf="center" bottom={sa.bottom + 48}>
                        <ZRoundedButton size="large" title={`   ${selected.size === 0 ? 'Skip' : ('Join' + (selected.size === props.chats.length ? ' all' : ''))}   `} style="default" onPress={onAdd} />
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
};

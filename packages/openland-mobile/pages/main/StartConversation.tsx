import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Share, Text, TextStyle, AsyncStorage } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';

const Chat = (props: { item: DialogDataSourceItem, onPress: (key: string) => void }) => {
    let onPress = React.useCallback(() => {
        props.onPress(props.item.key);
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
                placeholderKey={props.item.key}
                placeholderTitle={props.item.title}
            />
        </View>
        <View marginRight={10} marginTop={10} marginBottom={10} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch" justifyContent="center">
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
        </View>

        {/* <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={props.selected ? theme.accentColor : theme.backgroundColor} opacity={props.selected ? 1 : 0.8} borderColor={props.selected ? theme.accentColor : theme.accentDisabledColor} borderWidth={2} borderRadius={12} width={24} height={24} >
            {props.selected && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.textInverseColor }} />}
        </View> */}
    </ZListItemBase>
}

const StartConversationComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const [items, setItems] = React.useState([] as DialogDataSourceItem[]);
    const [selected, setSelected] = React.useState<DialogDataSourceItem>();
    let messenger = getMessenger();
    let dataSource = React.useMemo(() => messenger.engine.dialogList.dataSource, [messenger]);

    React.useEffect(() => {
        dataSource.needMore();
        dataSource.dumbWatch(() => {
            let itms = dataSource
                .getItems()
                .filter(d => (d.kind === 'GROUP' || d.kind === 'PUBLIC') && !d.isChannel);
            setItems(itms);
            if (itms.length) {
                setSelected(itms[0]);
            }
        });
    }, []);

    let goToChat = React.useCallback(
        async (key) => {
            await AsyncStorage.setItem('compose_draft_' + key, 'blah blah');
            props.router.pushAndReset('Conversation', { id: key });
        }, []
    );

    return (
        <>
            <SHeader title="Start a conversation" hairline="hidden" />
            <SScrollView justifyContent="flex-start" alignContent="center">
                <Text style={{ fontSize: 18, marginBottom: 20, marginHorizontal: 16, color: theme.textColor, marginTop: theme.blurType === 'dark' ? 8 : 0 }}>{"Share what you do and ask for help\nhere will be more text"}</Text>
                {items.map((item) => (
                    <Chat key={item.key} item={item} onPress={goToChat} />
                ))}
                <View height={120} />
            </SScrollView>
        </>
    );
});

export const StartConversation = withApp(StartConversationComponent, { navigationAppearance: 'large', hideHairline: true });
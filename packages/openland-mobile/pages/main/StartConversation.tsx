import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SScrollView } from 'react-native-s/SScrollView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useText } from 'openland-mobile/text/useText';

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
        <View style={{ width: 72, height: 56, alignItems: 'center', justifyContent: 'center' }}>
            <ZAvatar
                photo={props.item.photo}
                size="medium"
                id={props.item.key}
            />
        </View>
        <View style={{ marginRight: 10, marginTop: 10, marginBottom: 10, flexDirection: 'column', flexGrow: 1, flexBasis: 0, alignItems: 'stretch', justifyContent: 'center' }}>
            <Text
                numberOfLines={1}
                style={{
                    fontSize: 16,
                    lineHeight: 19,
                    height: 19,
                    color: theme.foregroundPrimary,
                    fontWeight: FontStyles.Weight.Medium
                }}
            >{props.item.title}
            </Text>
        </View>

        {/* <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={props.selected ? theme.accentPrimary : theme.backgroundPrimary} opacity={props.selected ? 1 : 0.8} borderColor={props.selected ? theme.accentPrimary : theme.foregroundTertiary} borderWidth={2} borderRadius={12} width={24} height={24} >
            {props.selected && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.foregroundContrast }} />}
        </View> */}
    </ZListItemBase>;
};

const StartConversationComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const [items, setItems] = React.useState([] as DialogDataSourceItem[]);
    // const [selected, setSelected] = React.useState<DialogDataSourceItem>();
    let messenger = getMessenger();
    let dataSource = React.useMemo(() => messenger.engine.dialogList.dataSource, [messenger]);

    React.useEffect(() => {
        dataSource.needMore();
        dataSource.dumbWatch(() => {
            let itms = dataSource
                .getItems()
                .filter(d => (d.kind === 'GROUP' || d.kind === 'PUBLIC') && !d.isChannel);
            setItems(itms);
            // if (itms.length) {
            //     setSelected(itms[0]);
            // }
        });
    }, []);

    let goToChat = React.useCallback(
        async (key) => {
            await AsyncStorage.multiSet([
                ['compose_draft_' + key, 'Hi @All! I am ~role~ at ~organization~. We do ~this and that~. Our top priority at the moment is ~achieve something~. Does anyone has any advice or connections for us?'],
                ['compose_draft_mentions_v2_' + key, JSON.stringify([{ __typename: "AllMention" }])],
            ]);
            props.router.pushAndReset('Conversation', { id: key });

        }, []
    );

    return (
        <>
            <SScrollView style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                <Text style={{ fontSize: 34, marginHorizontal: 16, fontWeight: FontStyles.Weight.Bold, color: theme.foregroundPrimary, marginBottom: 8 }} >
                    {t('getHelp', 'Get help')}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 20, marginHorizontal: 16, color: theme.foregroundPrimary, marginTop: theme.type === 'Light' ? 0 : 8 }}>
                    {t('shareChallenges', 'Choose a chat and share your challenges')}
                </Text>
                {items.map((item) => (
                    <Chat key={item.key} item={item} onPress={goToChat} />
                ))}
                <View style={{ height: 120 }} />
            </SScrollView>
        </>
    );
});

export const StartConversation = withApp(StartConversationComponent, { navigationAppearance: 'small', hideHairline: true });
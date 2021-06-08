import * as React from 'react';
import { View, Text, Platform, Keyboard } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ASListView } from 'react-native-async-view/ASListView';

import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';
import { debounce } from 'openland-y-utils/timer';
import { ZLoader } from 'openland-mobile/components/ZLoader';

import { androidMessageInputListOverlap } from './ConversationView';
import { useText } from 'openland-mobile/text/useText';

interface ChatMessagesSearchProps {
    query: string;
    router: SRouter;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal, children: string }) => (
    <View
        style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            padding: 32,
        }}
    >
        <Text
            style={{
                ...TextStyles.Body,
                textAlign: 'center',
                color: props.theme.foregroundSecondary,
                marginBottom: 16,
                paddingHorizontal: 40,
            }}
            allowFontScaling={false}
        >
            {props.children}
        </Text>
    </View>
));

const ChatSearchDataList = React.memo(({ engine, chatId }: { engine: ChatSearchEngine, chatId: string }) => {
    const theme = React.useContext(ThemeContext);
    const safeArea = React.useContext(ASSafeAreaContext);
    const onScroll = React.useCallback((e) => {
        if (e.nativeEvent.contentOffset.y > 0) {
            Keyboard.dismiss();
        }
    }, []);
    const [dataView] = React.useState(() => getMessenger().getSearchView(engine.dataSource, chatId));

    return (
        <View
            style={{
                marginTop: Platform.OS === 'ios' ? -1000 : 0,
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                flexGrow: 1
            }}
        >
            <ASListView
                dataView={dataView}
                inverted={false}
                onScroll={onScroll}
                contentPaddingTop={safeArea.top + (Platform.OS === 'ios' ? 1000 : 0)}
                style={{ flexGrow: 1 }}
                headerPadding={
                    Platform.select({ default: 0, android: androidMessageInputListOverlap }) + 6
                }
                overflowColor={theme.backgroundPrimary}
            />
        </View>
    );
});

export const ChatSearchView = React.memo((props: ChatMessagesSearchProps) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();

    if (props.query.length < 3) {
        return <EmptyView theme={theme}>{t('searchEmpty', 'Start typing message text you’re looking for')}</EmptyView>;
    }

    const { chatId } = props.router.params;
    const [engine] = React.useState(() => new ChatSearchEngine(getMessenger().engine, chatId, false));
    const [queryInProgress, setQueryInProgress] = React.useState(true);

    const loadQuery = React.useCallback(debounce(async (query: string) => {
        if (props.query.length > 2) {
            await engine.loadQuery(query);

            setQueryInProgress(false);
        }
    }, 500, true, true), []);

    React.useEffect(() => {
        setQueryInProgress(true);

        (async () => await loadQuery(props.query))();
    }, [props.query]);

    if (queryInProgress) {
        return <ZLoader />;
    }

    if (!queryInProgress && engine.dataSource.getSize() === 0) {
        return <EmptyView theme={theme}>{t('nothingFound', 'Nothing found')}</EmptyView>;
    }

    return <ChatSearchDataList engine={engine} chatId={chatId} />;
});
